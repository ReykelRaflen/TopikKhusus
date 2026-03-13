# Aplikasi Pengelolaan Pengunjung

Aplikasi ini adalah sistem pengelolaan pengunjung sederhana yang dibangun dengan bahasa Go dan menggunakan Redis sebagai penyimpanan data. Aplikasi ini mengikuti pola arsitektur bersih (clean architecture) untuk memisahkan lapisan domain, repository, dan usecase.

## Fitur

- **Check-in Pengunjung**: Mendaftarkan pengunjung baru dengan nama, alamat, dan tujuan kunjungan.
- **Check-out Pengunjung**: Mencatat waktu keluar pengunjung.
- **Melihat Pengunjung**: Mengambil data pengunjung berdasarkan ID atau semua pengunjung.
- **Menghapus Pengunjung**: Menghapus data pengunjung dari sistem.

## Struktur Proyek

- `domain/`: Berisi model entitas (Visitor).
- `repository/redis/`: Implementasi akses data ke Redis.
- `usecase/`: Logika bisnis aplikasi.
- `documentation/`: Dokumentasi proyek.
- `main.go`: Titik masuk aplikasi dengan contoh penggunaan.

## Persyaratan

- Go 1.21 atau lebih baru
- Redis server berjalan di localhost:6379

## Instalasi dan Menjalankan

1. Clone atau download proyek ini.
2. Pastikan Redis server berjalan.
3. Jalankan `go mod tidy` untuk mengunduh dependencies.
4. Jalankan aplikasi dengan `go run main.go`.

## Contoh Output

```
Connected to Redis: PONG
Checked in visitor: {ID:uuid-123 Name:John Doe Address:123 Main St Purpose:Meeting CheckInTime:2023-... CheckOutTime:<nil>}
Retrieved visitor: {ID:uuid-123 Name:John Doe Address:123 Main St Purpose:Meeting CheckInTime:2023-... CheckOutTime:<nil>}
Checked out visitor successfully
All visitors: [{ID:uuid-123 Name:John Doe Address:123 Main St Purpose:Meeting CheckInTime:2023-... CheckOutTime:2023-...}]
```

## Lisensi

Proyek ini untuk tujuan edukasi.