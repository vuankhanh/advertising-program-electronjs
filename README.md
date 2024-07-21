## Hướng Dẫn Cấu Hình Dịch Vụ Marketing4than

### Khởi Động Dịch Vụ Cùng Với Hệ Điều Hành Ubuntu

Để đảm bảo rằng dịch vụ Marketing4than được cài đặt và cấu hình để tự động khởi động sau khi môi trường đồ họa đã sẵn sàng, hãy thực hiện các bước sau:

**1. Mở File Cấu Hình Dịch Vụ:**

*Mở terminal và nhập lệnh sau để chỉnh sửa file cấu hình dịch vụ của Marketing4than*

  ```bash
  sudo nano /etc/systemd/system/marketing4than.service
  ```
**2. Thêm Nội Dung Vào File Cấu Hình:** 
  ```
  [Unit]
  Description=My Marketing4than Service
  After=multi-user.target systemd-sysusers.service
  Requires=systemd-sysusers.service

  [Service]
  ExecStart=/home/your_username/Desktop/Marketing4than-linux-x64/Marketing4than
  Restart=always
  User=your_username
  Environment=DISPLAY=:0
  Environment=XAUTHORITY=/home/your_username/.Xauthority

  [Install]
  WantedBy=multi-user.target
  ```
  *Đảm bảo thay thế your_username bằng tên người dùng thực tế của bạn.*

**3. Kích Hoạt Và Khởi Động Dịch Vụ:**
  ```bash
  sudo systemctl daemon-reload
  sudo systemctl enable marketing4than.service
  ```