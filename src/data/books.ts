import type { Book } from '@/types/book'

/** Dữ liệu mẫu mà API giả lập trả về */
export const BOOKS_SEED: readonly Book[] = [
  { id: 'b01', title: 'Lập trình Ứng dụng Web Nâng cao', author: 'Trần Minh Thái', category: 'CNTT', publishedYear: 2024, totalCopies: 5, availableCopies: 3 },
  { id: 'b02', title: 'Cấu trúc Dữ liệu và Giải thuật Hiện đại', author: 'Nguyễn Đức Hoàng, Đặng Quốc Tuấn', category: 'CNTT', publishedYear: 2023, totalCopies: 4, availableCopies: 2 },
  { id: 'b03', title: 'Kiến trúc Vi dịch vụ và Điện toán Đám mây', author: 'Lê Tuấn Anh', category: 'CNTT', publishedYear: 2024, totalCopies: 3, availableCopies: 0 },
  { id: 'b04', title: 'Trí tuệ Nhân tạo và Ứng dụng Học máy', author: 'Phạm Hoàng Long', category: 'CNTT', publishedYear: 2023, totalCopies: 6, availableCopies: 4 },
  { id: 'b05', title: 'An toàn Thông tin và An ninh Mạng', author: 'Đỗ Văn Nam', category: 'CNTT', publishedYear: 2024, totalCopies: 3, availableCopies: 1 },
  { id: 'b06', title: 'Hệ thống Nhúng và Phát triển IoT', author: 'Vũ Quang Huy', category: 'CNTT', publishedYear: 2022, totalCopies: 4, availableCopies: 4 },
  { id: 'b07', title: 'Kinh tế Số và Thương mại Điện tử', author: 'Nguyễn Thị Bích Ngọc', category: 'Kinh tế', publishedYear: 2023, totalCopies: 5, availableCopies: 2 },
  { id: 'b08', title: 'Quản trị Dự án và Đổi mới Công nghệ', author: 'Trần Đình Hưng', category: 'Kinh tế', publishedYear: 2024, totalCopies: 4, availableCopies: 0 },
  { id: 'b09', title: 'Phân tích Dữ liệu Kinh doanh Thực chiến', author: 'Hoàng Minh Trí', category: 'Kinh tế', publishedYear: 2022, totalCopies: 2, availableCopies: 1 },
  { id: 'b10', title: 'Tài chính Doanh nghiệp và Ứng dụng Fintech', author: 'Lê Phương Thảo', category: 'Kinh tế', publishedYear: 2023, totalCopies: 3, availableCopies: 3 },
  { id: 'b11', title: 'Khởi nghiệp Công nghệ và Phát triển Sản phẩm', author: 'Phan Quốc Bảo', category: 'Kinh tế', publishedYear: 2021, totalCopies: 4, availableCopies: 2 },
  { id: 'b12', title: 'Chiến lược Marketing trong Kỷ nguyên Số', author: 'Vũ Thị Minh Thư', category: 'Kinh tế', publishedYear: 2024, totalCopies: 5, availableCopies: 3 },
  { id: 'b13', title: 'Tiếng Anh Chuyên ngành Khoa học Máy tính', author: 'Sarah Jenkins, Nguyễn Văn An', category: 'Ngoại ngữ', publishedYear: 2024, totalCopies: 6, availableCopies: 3 },
  { id: 'b14', title: 'Luyện thi IELTS Học thuật Cấp tốc', author: 'David Miller', category: 'Ngoại ngữ', publishedYear: 2023, totalCopies: 4, availableCopies: 0 },
  { id: 'b15', title: 'Tiếng Nhật Giao tiếp trong Doanh nghiệp CNTT', author: 'Yamamoto Kenji, Lê Thu Hà', category: 'Ngoại ngữ', publishedYear: 2022, totalCopies: 3, availableCopies: 2 },
  { id: 'b16', title: 'Tiếng Trung Thương mại và Giao dịch Quốc tế', author: 'Dương Ký Châu, Trần Thu Hương', category: 'Ngoại ngữ', publishedYear: 2023, totalCopies: 5, availableCopies: 4 },
  { id: 'b17', title: 'Kỹ năng Viết Báo cáo và Email Kỹ thuật bằng Tiếng Anh', author: 'Michael Brown', category: 'Ngoại ngữ', publishedYear: 2024, totalCopies: 4, availableCopies: 1 },
  { id: 'b18', title: 'Tiếng Hàn Giao tiếp Cơ bản cho Kỹ sư', author: 'Kim Ji-won, Bùi Mai Phương', category: 'Ngoại ngữ', publishedYear: 2023, totalCopies: 5, availableCopies: 3 },
]
