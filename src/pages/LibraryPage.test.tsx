import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'

import { setupStore } from '@/app/store'
import { BOOKS_SEED } from '@/data/books'
import { initialState } from '@/features/books/booksSlice'
import { BORROW_LIMIT_MESSAGE } from '@/features/books/borrowLimitMiddleware'

import { LibraryPage } from './LibraryPage'

function renderPage() {
  const store = setupStore({
    books: { ...initialState, status: 'succeeded', items: BOOKS_SEED.map((book) => ({ ...book })) },
  })
  render(
    <Provider store={store}>
      <LibraryPage />
    </Provider>,
  )
  return { store, user: userEvent.setup() }
}

describe('LibraryPage — luồng mượn/trả', () => {
  it('mượn tối đa 3 cuốn, cuốn thứ 4 bị chặn kèm cảnh báo, trả sách thì số bản tăng lại', async () => {
    const { store, user } = renderPage()

    await user.click(screen.getByRole('button', { name: 'Mượn Lập trình Ứng dụng Web Nâng cao' }))
    await user.click(screen.getByRole('button', { name: 'Mượn An toàn Thông tin và An ninh Mạng' }))
    await user.click(screen.getByRole('button', { name: 'Mượn Tài chính Doanh nghiệp và Ứng dụng Fintech' }))
    await user.click(screen.getByRole('button', { name: 'Mượn Tiếng Anh Chuyên ngành Khoa học Máy tính' }))

    expect(screen.getByRole('alert')).toHaveTextContent(BORROW_LIMIT_MESSAGE)
    expect(store.getState().books.borrowedIds).toEqual(['b01', 'b05', 'b10'])

    const webBook = screen.getByRole('article', { name: 'Lập trình Ứng dụng Web Nâng cao' })
    expect(within(webBook).getByText('2/5')).toBeInTheDocument()

    await user.click(within(webBook).getByRole('button', { name: 'Trả Lập trình Ứng dụng Web Nâng cao' }))
    expect(within(webBook).getByText('3/5')).toBeInTheDocument()
    expect(store.getState().books.borrowedIds).toEqual(['b05', 'b10'])
  })
})
