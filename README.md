# Admin Wigra

Custom admin dashboard untuk project Wigra Production House. Project ini memakai Laravel 12 sebagai backend dan React SPA sebagai admin UI di path `/admin`.

## Scope Phase 1

Fase awal project ini mencakup:

- custom admin dashboard berbasis React
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
- React
- Vite
- Tailwind CSS
- Laravel Tinker
- SQLite untuk setup lokal saat ini
- MySQL direncanakan untuk environment utama/shared

## Current Status

Yang sudah siap saat ini:

- project Laravel berhasil di-bootstrap
- route admin tersedia di `/admin`
- React SPA admin sudah terhubung lewat Vite
- layout dashboard awal sudah ada
- styling awal mengikuti identitas visual Wigra:
  - font `Cormorant Garamond`
  - font `Inter`
  - warna aksen `#c9544d`

Yang belum dikerjakan penuh:

- autentikasi backend untuk admin
- resource CRUD untuk films, events, company info, gallery
- role `superadmin` dan `editor`
- policy/authorization detail per role
- API publik read-only
- seeder data bisnis fase 1

## Struktur Dasar Project

Beberapa file penting:

- `routes/web.php`
  Route Laravel untuk halaman utama dan fallback `/admin/*` ke React SPA.

- `resources/views/welcome.blade.php`
  Blade shell yang memuat asset Vite dan root React.

- `resources/js/app.jsx`
  Entry point React dan routing admin.

- `resources/js/components/`
  Komponen layout admin.

- `resources/js/pages/`
  Halaman admin.

- `resources/css/app.css`
  CSS utama project dan token visual Wigra.

- `app/Models/User.php`
  Model user Laravel untuk auth backend.

- `database/migrations/`
  Migration Laravel default. Migration konten bisnis fase 1 akan ditambahkan di sini.

- `database/seeders/DatabaseSeeder.php`
  Titik masuk utama untuk seeding.

## Requirement Lokal

Pastikan environment lokal memiliki:

- PHP `8.2+`
- Composer `2+`
- Node.js `20+`
- NPM

Catatan: toolchain frontend saat ini dipin agar cocok dengan Node `20.14+`.

## Instalasi Project

Jika project baru saja di-clone:

```bash
composer install
npm install
copy .env.example .env
php artisan key:generate
```

Jika file `.env` sudah ada, pastikan konfigurasi lokal mengikuti bagian environment di bawah.

## Konfigurasi Environment Lokal

Setup lokal default bisa memakai SQLite:

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

## Menjalankan Project Lokal

Jalankan migration:

```bash
php artisan migrate
```

Jalankan server Laravel:

```bash
php artisan serve
```

Jalankan Vite:

```bash
npm run dev
```

URL lokal default:

- App: `http://127.0.0.1:8000`
- Admin: `http://127.0.0.1:8000/admin`

## Menjalankan Test

Untuk test backend:

```bash
php artisan test
```

Atau via Composer:

```bash
composer test
```

Jika test render Blade yang memuat Vite, jalankan build frontend dulu:

```bash
npm run build
```

## Command yang Sering Dipakai

```bash
php artisan serve
php artisan migrate
php artisan migrate:fresh --seed
php artisan db:seed
php artisan make:model
php artisan make:migration
php artisan tinker
npm run dev
npm run build
```

## Styling Admin

Arah styling admin mengikuti website referensi Wigra:

- website referensi: [Wigra Production House](https://wigra-production.vercel.app/)
- font heading website: `Cormorant Garamond`
- font body website: `Inter`
- warna gelap utama: `#0a0a0a`
- warna aksen: `#c9544d`

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
- Saat ini belum ada role management, jadi akses admin masih perlu dibuat lewat auth backend.
- Pastikan migration dan seeder konten fase 1 dibuat sebelum tim frontend mulai integrasi API.

## Rencana Berikutnya

Urutan kerja yang disarankan:

1. rapikan user seeder dan admin default
2. tambahkan auth backend untuk admin React
3. tambahkan role dasar `superadmin` dan `editor`
4. buat migration konten inti phase 1
5. buat halaman CRUD React untuk semua entitas
6. tambahkan authorization/policy per role
7. bangun API publik read-only
8. tambah sample seed data untuk frontend/testing

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

### Vite manifest tidak ditemukan

Penyebab:

- frontend belum di-build
- Vite dev server belum berjalan

Solusi:

```bash
npm run build
```

atau jalankan Vite dev server:

```bash
npm run dev
```

### Perubahan `.env` tidak terbaca

Jalankan:

```bash
php artisan config:clear
php artisan cache:clear
```

## Referensi

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [Wigra Production House](https://wigra-production.vercel.app/)
