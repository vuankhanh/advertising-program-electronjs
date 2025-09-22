## Hướng Dẫn Cấu Hình Dịch Vụ Marketing4than

### Khởi Động Dịch Vụ Cùng Với Hệ Điều Hành Ubuntu

Để đảm bảo rằng dịch vụ Marketing4than được cài đặt và cấu hình để tự động khởi động sau khi môi trường đồ họa đã sẵn sàng, hãy thực hiện các bước sau:

Sử dụng script với vòng lặp

Cách này sẽ tạo một script đơn giản để chạy ứng dụng của bạn trong một vòng lặp vô hạn, đảm bảo rằng nó sẽ tự động khởi động lại ngay lập tức sau khi bị đóng.

**1. Tạo file script:**

*Mở terminal và nhập lệnh sau để tạo một file kịch bản mới, ví dụ: restart_app.sh*
  ```bash
  sudo nano ~/bin/bash/restart_app.sh
  ```
*Nếu chưa có đường dẫn ~/bin/bash thì hãy tạo thêm thư mục*

**2. Thêm Nội Dung Vào File kịch bản:** 
  ```
  #!/bin/bash

  # Thay thế đường dẫn và tên ứng dụng của bạn ở đây
  APP_PATH="/home/vuankhanh/Desktop/advertising-program-electronjs/out/Marketing4than-linux-x64/Marketing4than"

  while true; do
    $APP_PATH
  done
  ```

**3. Cấp quyền truy cập vào file script 

**4. Kích Hoạt Và Khởi Động Dịch Vụ:**

  *Mở Startup Applications trong Ubuntu và thêm*
  ```bash
    Name: Marketing Service
    # Thay thế đường dẫn và file kịch bản
    Command: /home/vuankhanh/bin/bash/restart_app.sh
  ```