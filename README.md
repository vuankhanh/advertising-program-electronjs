## Hướng dẫn cấu hình dịch vụ Advertising Program

### Khởi động dịch vụ cùng với hệ điều hành Ubuntu

Đảm bảo rằng dịch vụ Advertising Program được cài đặt và cấu hình để khởi động sau khi môi trường đồ họa đã sẵn sàng. Để làm điều này, sử dụng các chỉ thị sau trong file systemd service của bạn:

[Unit]
Description=My Advertising Program Service
After=multi-user.target systemd-sysusers.service
Requires=systemd-sysusers.service

[Service]
ExecStart=/home/your_username/Desktop/Advertising_Program-linux-x64/Advertising_Program
Restart=always
User=your_username
Environment=DISPLAY=:0
Environment=XAUTHORITY=/home/your_username/.Xauthority

[Install]
WantedBy=multi-user.target