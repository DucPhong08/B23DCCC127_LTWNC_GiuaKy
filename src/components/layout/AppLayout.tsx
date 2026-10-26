import { useEffect } from 'react'
import { NavLink, Outlet, useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { fetchBooks } from '@/features/books/booksSlice'
import { ThemeToggle } from '@/features/theme/ThemeToggle'

import styles from './AppLayout.module.css'

const NAV_ITEMS = [
  { to: '/', label: 'Tra cứu', end: true },
  { to: '/stats', label: 'Thống kê', end: false },
]

const navClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink

export function AppLayout() {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  // Mở app với ?fail=1 để xem trạng thái lỗi của API giả lập
  const shouldFail = searchParams.get('fail') === '1'

  useEffect(() => {
    dispatch(fetchBooks({ shouldFail }))
    // Chỉ tải một lần khi khởi động app
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <NavLink to="/" className={styles.brand} aria-label="PTIT SmartLib — trang chủ">
            <img src="/favicon.svg" alt="PTIT SmartLib" width={30} height={30} className={styles.logo} />
            <span className={styles.brandName}>PTIT SmartLib</span>
            <span className={styles.brandSub}>Khoa CNTT · B23DCCC127</span>
          </NavLink>

          <nav className={styles.nav} aria-label="Điều hướng chính">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navClassName}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <img src="/favicon.svg" alt="" width={20} height={20} />
            <span><strong>PTIT SmartLib</strong> — Thư viện số Khoa Công nghệ Thông tin 1</span>
          </div>
          <p className={styles.footerStudent}>
            Bài kiểm tra giữa kỳ LTWNC (RIPT1411-20261-02) · Sinh viên: <strong>B23DCCC127</strong>
          </p>
        </div>
      </footer>
    </>
  )
}
