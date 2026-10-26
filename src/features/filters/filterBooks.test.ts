import { BOOKS_SEED } from '@/data/books'

import { filterBooks } from './filterBooks'

const books = [...BOOKS_SEED]

describe('filterBooks', () => {
  it('tìm theo tên sách, không phân biệt hoa thường', () => {
    const result = filterBooks(books, 'UNG DUNG web', 'all')
    expect(result.map((book) => book.id)).toEqual(['b01'])
  })

  it('tìm theo tác giả và bỏ qua dấu tiếng Việt', () => {
    expect(filterBooks(books, 'duong ky chau', 'all').map((book) => book.id)).toEqual(['b16'])
  })

  it('kết hợp từ khoá với thể loại', () => {
    const result = filterBooks(books, 'an ninh', 'CNTT')
    expect(result.map((book) => book.id)).toEqual(['b05'])
    expect(filterBooks(books, 'an ninh', 'Kinh tế')).toEqual([])
  })
})
