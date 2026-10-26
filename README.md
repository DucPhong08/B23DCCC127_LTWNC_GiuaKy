# PTIT SmartLib — B23DCCC127

Ứng dụng tra cứu và mượn/trả sách cho thư viện khoa — bài kiểm tra giữa kỳ LTWNC (RIPT1411-20261-02).

**Sinh viên thực hiện:** B23DCCC127

## Chạy dự án

Yêu cầu Node.js 18 trở lên.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # chạy toàn bộ test (Jest + React Testing Library)
npm run build      # kiểm tra type + build production
npm run lint
```

Muốn xem trạng thái lỗi của API giả lập, mở app với `?fail=1`, ví dụ `http://localhost:5173/?fail=1`. Bấm **Thử lại** để gọi API thành công.

## Công nghệ

React 18 · TypeScript (strict) · Vite · Redux Toolkit · Zustand · React Router · CSS Modules · Jest · React Testing Library

## Cấu trúc thư mục

```
src/
├── api/booksApi.ts              API giả lập: Promise + setTimeout 500ms, tham số shouldFail
├── app/
│   ├── config.ts                hằng số: giới hạn mượn, debounce, độ trễ API
│   ├── rootReducer.ts           combineReducers + RootState
│   ├── store.ts                 configureStore + gắn middleware
│   └── hooks.ts                 useAppDispatch / useAppSelector
├── components/                  component dùng chung
│   ├── feedback/                LoadingState, ErrorState
│   ├── layout/AppLayout.tsx     header, điều hướng, gọi API khi khởi động
│   ├── ui/Button.tsx
│   └── icons.tsx
├── data/books.ts                dữ liệu mẫu
├── features/
│   ├── books/                   booksSlice, selectors, borrowLimitMiddleware, components/
│   ├── filters/                 filterStore (Zustand), filterBooks, SearchBar, CategoryTabs
│   └── theme/                   ThemeContext, ThemeProvider, useTheme, ThemeToggle
├── hooks/useDebounce.ts         custom hook generic useDebounce<T>
├── pages/                       LibraryPage (/), StatsPage (/stats, lazy load)
├── styles/                      biến màu sáng/tối, màu theo thể loại
└── types/                       Book, ApiResult<T> + type guard isApiSuccess
```

## Đối chiếu yêu cầu đề bài

| Yêu cầu | Vị trí trong code |
|---|---|
| API generic `{ ok: true, data } \| { ok: false, error }` + type guard | `types/api.ts` (`ApiResult<T>`, `isApiSuccess`) |
| Utility Types | `Partial` (booksApi, test), `Pick` + `Readonly` (`BookSummary`), `Record` (`CategoryStats`, `categoryTone`), `ReturnType` (store) |
| createSlice + createAsyncThunk xử lý 3 trạng thái | `features/books/booksSlice.ts` |
| Typed hooks | `app/hooks.ts` |
| Middleware giới hạn 3 cuốn | `features/books/borrowLimitMiddleware.ts` |
| Bộ lọc bằng Zustand | `features/filters/filterStore.ts` |
| Theme bằng Context, `useMemo` cho value, `useTheme` | `features/theme/` |
| `useDebounce<T>` 300ms | `hooks/useDebounce.ts`, dùng ở `pages/LibraryPage.tsx` |
| `useMemo` danh sách đã lọc, `useCallback` handler | `pages/LibraryPage.tsx` |
| `React.memo` cho 1 cuốn sách, key theo `book.id` | `features/books/components/BookCard.tsx`, `BookList.tsx` |
| Lazy load trang Thống kê | `App.tsx` (`React.lazy` + `Suspense`) |

## Test

| File | Nội dung |
|---|---|
| `features/books/booksSlice.test.ts` | 9 test reducer: state khởi tạo, 3 trạng thái fetch, mượn, hết bản, trả, cảnh báo |
| `features/books/components/BookCard.test.tsx` | 4 test RTL + userEvent: hiển thị, click Mượn đúng id, disabled khi hết bản, nút Trả |
| `hooks/useDebounce.test.ts` | useDebounce với fake timers |
| `features/books/borrowLimitMiddleware.test.ts` | middleware chặn cuốn thứ 4 |
| `features/filters/filterBooks.test.ts` | tìm không phân biệt hoa thường/dấu, kết hợp thể loại |
| `pages/LibraryPage.test.tsx` | luồng mượn → chặn khi quá 3 cuốn → trả |
