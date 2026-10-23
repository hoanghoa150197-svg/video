# Video A–B Loop — PWA

## Thành phần
- `index.html`: giữ nguyên giao diện và chức năng gốc, bổ sung đăng ký PWA và thông báo cập nhật.
- `manifest.webmanifest`: thông tin cài đặt.
- `sw.js`: cache giao diện để mở ứng dụng khi ngoại tuyến.
- `icon.svg`, `icon-192.png`, `icon-512.png`: biểu tượng ứng dụng.

## Đưa lên GitHub Pages
1. Tạo repository GitHub, giải nén ZIP và tải **các file bên trong thư mục** lên gốc repository.
2. Vào **Settings → Pages → Build and deployment → Deploy from a branch**, chọn `main` và `/(root)`, rồi **Save**.
3. Mở đường dẫn HTTPS GitHub Pages sau khi triển khai hoàn tất. Các đường dẫn PWA đều tương đối nên chạy được cả với repository con.

## Cài đặt
- **iPhone**: mở trang trong Safari → Share → Add to Home Screen.
- **Android**: mở trang trong Chrome → menu ⋮ → Install app / Add to Home screen.
- **Máy tính**: mở Chrome/Edge → biểu tượng cài đặt trên thanh địa chỉ hoặc menu → Install.

## Lưu trữ và ngoại tuyến
- Các đoạn A–B được lưu theo URL video trong `localStorage` với khóa `abloop-v1`, giữ nguyên cách lưu của bản gốc. Không xóa dữ liệu website nếu muốn giữ các đoạn đã lưu.
- Sau khi mở trang thành công ít nhất một lần qua HTTPS, giao diện và các file ứng dụng có thể mở ngoại tuyến.
- **YouTube cần Internet**, YouTube IFrame API và luồng video không được lưu cache ngoại tuyến. Video URL bên ngoài cũng cần mạng, trừ khi trình duyệt hoặc nguồn video có cơ chế riêng. Không hỗ trợ chọn video cục bộ từ máy trong bản gốc.
- Một số video chặn nhúng, CORS hoặc hotlink; PWA không loại bỏ được giới hạn này.

## Cập nhật
1. Thay `index.html` và các file thay đổi trên GitHub.
2. Đổi `VERSION` trong `sw.js` (ví dụ `abloop-pwa-v2`) mỗi khi phát hành bản mới.
3. Mở ứng dụng có mạng; khi có thông báo, bấm **Cập nhật** để kích hoạt bản mới. Không xóa `localStorage` trong quá trình cập nhật.

## Kiểm tra
- Kiểm tra URL YouTube, MP4 trực tiếp, phát/tạm dừng, tua ±1/±5 giây, tốc độ, đánh dấu A/B, lặp, lưu/xóa và khôi phục đoạn sau tải lại.
- Kiểm tra ứng dụng cài đặt và mở offline sau lần tải đầu tiên; offline chỉ đảm bảo giao diện, **không đảm bảo phát video**.
- Chưa kiểm thử trực tiếp trên thiết bị iOS/Android hoặc website GitHub Pages thực tế; cần thử sau khi triển khai.
