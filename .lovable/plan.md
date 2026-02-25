

## Rencana Perbaikan

### 1. Form Data Penumpang Sesuai Jumlah Tiket

Saat ini, form hanya mengisi data 1 penumpang utama. Akan diubah agar menampilkan form untuk **setiap penumpang** sesuai jumlah tiket yang dibeli.

**Cara kerja:**
- PassengerForm menerima prop `passengerCount` dari jumlah tiket
- Menampilkan form per penumpang dengan tab/accordion: "Penumpang 1", "Penumpang 2", dst.
- Penumpang 1 wajib isi lengkap (nama, HP, email, gender, tanggal lahir, selfie)
- Penumpang 2+ isi nama, gender, tanggal lahir (data kontak cukup dari penumpang utama)
- Validasi semua penumpang sebelum bisa lanjut
- Index.tsx diedit untuk passing `booking.passengers` ke PassengerForm

### 2. Halaman Rute, Jadwal, dan Bantuan

Membuat 3 halaman baru dengan desain konsisten:

**Halaman Rute (`/rute`)**
- Daftar rute populer dalam card grid
- Info: kota asal - tujuan, estimasi waktu, harga mulai dari
- Tombol "Pesan" yang mengarah ke halaman utama

**Halaman Jadwal (`/jadwal`)**
- Tabel jadwal keberangkatan per rute
- Filter berdasarkan kota asal dan tujuan
- Menampilkan jam, tipe Hiace, dan ketersediaan

**Halaman Bantuan (`/bantuan`)**
- FAQ accordion (cara pesan, pembatalan, refund, dll)
- Info kontak customer service
- Form hubungi kami sederhana

**Perubahan routing:**
- Update App.tsx dengan 3 route baru
- Update navbar links di Index.tsx menjadi Link react-router
- Buat layout/header shared agar navbar konsisten di semua halaman

### Detail Teknis

**File yang diubah:**
- `src/components/PassengerForm.tsx` -- support multiple passengers dengan accordion UI
- `src/pages/Index.tsx` -- pass `passengerCount` ke PassengerForm, extract header ke komponen terpisah
- `src/App.tsx` -- tambah routes `/rute`, `/jadwal`, `/bantuan`

**File baru:**
- `src/components/Header.tsx` -- komponen header/navbar reusable
- `src/pages/Rute.tsx` -- halaman daftar rute
- `src/pages/Jadwal.tsx` -- halaman jadwal keberangkatan
- `src/pages/Bantuan.tsx` -- halaman FAQ dan bantuan

