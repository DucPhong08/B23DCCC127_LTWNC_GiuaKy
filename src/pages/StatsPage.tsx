import { useCallback } from 'react'

import { MAX_BORROWED_BOOKS } from '@/app/config'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import {
  selectAvailableCopies,
  selectBooks,
  selectBooksError,
  selectBooksStatus,
  selectBorrowedBooks,
  selectCategoryStats,
} from '@/features/books/booksSelectors'
import { fetchBooks } from '@/features/books/booksSlice'
import { categoryToneClass } from '@/features/books/categoryTone'
import { BOOK_CATEGORIES } from '@/types/book'

import styles from './StatsPage.module.css'

/** Trang Thống kê — được lazy load từ App */
export default function StatsPage() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectBooksStatus)
  const error = useAppSelector(selectBooksError)
  const totalTitles = useAppSelector(selectBooks).length
  const availableCopies = useAppSelector(selectAvailableCopies)
  const categoryStats = useAppSelector(selectCategoryStats)
  const borrowedBooks = useAppSelector(selectBorrowedBooks)

  const handleRetry = useCallback(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  const maxTitles = Math.max(1, ...BOOK_CATEGORIES.map((category) => categoryStats[category].titles))

  return (
    <>
      <section className={styles.intro}>
        <h1 className={styles.title}>Thống kê</h1>
        <p className={styles.subtitle}>Tình trạng kho sách và các cuốn bạn đang mượn.</p>
      </section>

      {status === 'failed' && <ErrorState message={error ?? 'Đã có lỗi xảy ra.'} onRetry={handleRetry} />}
      {(status === 'idle' || status === 'loading') && <LoadingState />}

      {status === 'succeeded' && (
        <>
          <dl className={styles.summary}>
            <div className={styles.figure}>
              <dt className={styles.figureLabel}>Tổng đầu sách</dt>
              <dd className={styles.figureValue}>{totalTitles}</dd>
            </div>
            <div className={styles.figure}>
              <dt className={styles.figureLabel}>Bản còn trên kệ</dt>
              <dd className={styles.figureValue}>{availableCopies}</dd>
            </div>
            <div className={styles.figure}>
              <dt className={styles.figureLabel}>Sách đang mượn</dt>
              <dd className={styles.figureValue}>
                {borrowedBooks.length}
                <span className={styles.figureUnit}>/{MAX_BORROWED_BOOKS}</span>
              </dd>
            </div>
          </dl>

          <section className={styles.section} aria-labelledby="by-category">
            <h2 id="by-category" className={styles.sectionTitle}>
              Đầu sách theo thể loại
            </h2>
            <ul className={styles.chart}>
              {BOOK_CATEGORIES.map((category) => {
                const stat = categoryStats[category]
                return (
                  <li key={category} className={`${styles.row} ${categoryToneClass(category)}`}>
                    <span className={styles.label}>{category}</span>
                    <span className={styles.track} aria-hidden="true">
                      <span className={styles.bar} style={{ width: `${(stat.titles / maxTitles) * 100}%` }} />
                    </span>
                    <span className={styles.value}>
                      <strong>{stat.titles} đầu sách</strong>
                      <span className={styles.valueSub}>{stat.availableCopies} bản còn</span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </section>

          <section className={styles.section} aria-labelledby="borrowed-list">
            <h2 id="borrowed-list" className={styles.sectionTitle}>
              Sách bạn đang mượn
            </h2>
            {borrowedBooks.length === 0 ? (
              <p className={styles.empty}>Bạn chưa mượn cuốn nào.</p>
            ) : (
              <ul className={styles.borrowed}>
                {borrowedBooks.map((book) => (
                  <li key={book.id} className={`${styles.borrowedItem} ${categoryToneClass(book.category)}`}>
                    <span className={styles.borrowedTitle}>{book.title}</span>
                    <span className={styles.borrowedMeta}>
                      {book.author} · {book.category}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </>
  )
}
