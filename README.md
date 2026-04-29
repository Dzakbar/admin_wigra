# Admin Wigra Backend

Backend admin panel untuk project Wigra Production House. Project ini dibangun dengan `Laravel 12` dan `Filament 5`, dan saat ini difokuskan untuk menjadi fondasi dashboard admin company profile serta API publik untuk frontend.

## Scope Phase 1

Fase awal project ini mencakup:

- admin dashboard berbasis Filament
- autentikasi admin
- manajemen konten utama company profile
- endpoint API publik read-only untuk frontend

Target entitas konten fase 1:

- `films`
- `events`
- `company_infos`
- `galleries`

## Tech Stack

- PHP `^8.2`
- Laravel `^12.0`
- Filament `^5.6`
- Laravel Tinker
- SQLite untuk setup lokal saat ini
- MySQL direncanakan untuk environment utama/shared

## Current Status

Yang sudah siap saat ini:

- project Laravel berhasil di-bootstrap
- Filament panel admin sudah terpasang
- route panel admin tersedia di `/admin`
- user model sudah bisa mengakses panel Filament
- styling panel awal sudah menyesuaikan identitas visual website Wigra:
  - font `Inter`
  - primary color `#c9544d`
  - neutral palette `Zinc`

Yang belum dikerjakan penuh:

- resource CRUD untuk films, events, company info, gallery
- role `superadmin` dan `editor`
- policy/authorization detail per role
- API publik read-only
- seeder data bisnis fase 1

## Struktur Dasar Project

Beberapa file penting yang perlu diketahui backend developer:

- `app/Providers/Filament/AdminPanelProvider.php`
  Konfigurasi panel Filament admin.

- `app/Models/User.php`
  Model user admin/login untuk panel Filament.

- `database/migrations/`
  Migration Laravel default. Migration konten bisnis fase 1 akan ditambahkan di sini.

- `database/seeders/DatabaseSeeder.php`
  Titik masuk utama untuk seeding.

- `resources/css/app.css`
  Asset CSS utama project.

- `bootstrap/providers.php`
  Registrasi service provider, termasuk provider panel Filament.

## Requirement Lokal

Pastikan environment lokal memiliki:

- PHP `8.2+`
- Composer `2+`
- Node.js `20+`
- NPM

Catatan:

- Saat ini local setup tidak wajib Laragon jika hanya ingin menjalankan app dengan SQLite.
- Laragon baru diperlukan jika ingin pakai MySQL/MariaDB lokal.

## Instalasi Project

Jika project baru saja di-clone:

```bash
composer install
npm install
copy .env.example .env
php artisan key:generate
```

Jika file `.env` sudah ada, pastikan konfigurasi lokal mengikuti bagian "Konfigurasi Environment" di bawah.

## Konfigurasi Environment Lokal

Saat ini project dikonfigurasi agar mudah dijalankan secara lokal tanpa MySQL:

```env
DB_CONNECTION=sqlite
SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync
```

Database SQLite lokal berada di:

```text
database/database.sqlite
```

Konfigurasi ini dipakai supaya backend developer bisa fokus melihat panel admin dan styling tanpa tergantung service database eksternal.

## Menjalankan Project Lokal

Jalankan migration:

```bash
php artisan migrate
```

Jalankan server Laravel:

```bash
php artisan serve
```

Jika juga ingin menjalankan Vite:

```bash
npm run dev
```

URL lokal default:

- App: `http://127.0.0.1:8000`
- Admin panel: `http://127.0.0.1:8000/admin`

## Login Admin Lokal

Untuk testing lokal, saat ini sudah dibuat akun admin sementara:

- Email: `ikbaarrizky@gmail.com`
- Password: `admin12345`

Catatan penting:

- password disimpan dalam bentuk hash di tabel `users`
- akun ini dibuat untuk local development
- ganti password atau seed ulang jika akan dipakai tim yang lebih luas

## Seeder dan User Lokal

Saat ini ada 2 jalur pembuatan user lokal:

1. User manual yang sudah dibuat langsung ke database SQLite untuk login admin lokal.
2. Seeder default di `database/seeders/DatabaseSeeder.php` yang masih membuat:
   - `test@example.com`

Disarankan ke depan:

- rapikan `DatabaseSeeder` agar membuat admin default yang benar-benar dipakai tim
- hindari duplikasi user dummy yang tidak diperlukan

## Menjalankan Test

Menjalankan test bawaan Laravel:

```bash
php artisan test
```

Atau via Composer:

```bash
composer test
```

## Command yang Sering Dipakai

Beberapa command yang umum dipakai selama development:

```bash
php artisan serve
php artisan migrate
php artisan migrate:fresh --seed
php artisan db:seed
php artisan make:model
php artisan make:migration
php artisan make:filament-resource
php artisan make:filament-page
php artisan tinker
npm run dev
```

## Filament Panel

Konfigurasi panel admin saat ini:

- panel id: `admin`
- path: `/admin`
- auth: login bawaan Filament
- font: `Inter`
- warna utama: `#c9544d`

Catatan akses:

- `User` sudah mengimplementasikan `FilamentUser`
- method `canAccessPanel()` saat ini me-return `true`

Artinya:

- semua user pada tabel `users` masih bisa mengakses panel
- ini aman untuk tahap bootstrap lokal, tapi harus diperketat saat role system dibuat

## Styling Admin

Arah styling admin mengikuti website referensi Wigra:

- website referensi: [Wigra Production House](https://wigra-production.vercel.app/)
- font heading website: `Cormorant Garamond`
- font body website: `Inter`
- warna gelap utama: `#0a0a0a`
- warna aksen: `#c9544d`

Saat ini baru sebagian yang diterapkan ke Filament panel. Pengembangan selanjutnya yang disarankan:

- custom Filament theme CSS
- background panel yang lebih dark
- heading typography yang lebih branded
- polish login page agar lebih dekat ke visual website utama

## Berpindah dari SQLite ke MySQL

Saat project siap masuk workflow backend utama, `.env` bisa dikembalikan ke MySQL.

Contoh:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=admin_wigra
DB_USERNAME=root
DB_PASSWORD=
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

Langkah setelah pindah:

```bash
php artisan config:clear
php artisan migrate
```

Jika memakai Laragon:

- pastikan MySQL aktif
- pastikan database sudah dibuat
- sesuaikan nama DB, username, dan password di `.env`

## Catatan Penting Development

- Jangan commit credential real production.
- Jangan gunakan user dummy lokal untuk environment production/staging.
- Saat ini belum ada role management, jadi akses panel masih sangat longgar.
- Pastikan migrasi dan seeder konten fase 1 dibuat sebelum tim frontend mulai integrasi API.

## Rencana Backend Berikutnya

Urutan kerja yang disarankan setelah bootstrap ini:

1. rapikan user seeder dan admin default
2. tambahkan role dasar `superadmin` dan `editor`
3. buat migration konten inti phase 1
4. buat Filament Resources untuk semua entitas
5. tambahkan authorization/policy per role
6. bangun API publik read-only
7. tambah sample seed data untuk frontend/testing

## Troubleshooting

### Error koneksi MySQL saat buka `/admin`

Penyebab:

- app masih mengarah ke MySQL
- MySQL belum aktif

Solusi cepat untuk local view-only:

- gunakan SQLite
- set `SESSION_DRIVER=file`
- set `CACHE_STORE=file`
- set `QUEUE_CONNECTION=sync`

Lalu jalankan:

```bash
php artisan config:clear
php artisan migrate
```

### Login Filament gagal walau halaman `/admin` terbuka

Kemungkinan:

- tabel `users` belum ada
- belum ada user admin
- `canAccessPanel()` menolak akses

Cek:

- migrasi sudah jalan
- user tersedia di tabel `users`
- model `User` mengimplementasikan `FilamentUser`

### Perubahan `.env` tidak terbaca

Jalankan:

```bash
php artisan config:clear
php artisan cache:clear
```

## Referensi

- [Laravel Documentation](https://laravel.com/docs)
- [Filament Documentation](https://filamentphp.com/docs)
- [Wigra Production House](https://wigra-production.vercel.app/)
