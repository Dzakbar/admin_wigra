<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class PublicUpload
{
    public static function store(UploadedFile $file, string $directory): string
    {
        $disk = env('FILE_UPLOAD_DISK', 'public');
        $path = $file->store($directory, $disk);

        if ($disk === 's3' && env('PUBLIC_STORAGE_URL')) {
            return rtrim(env('PUBLIC_STORAGE_URL'), '/').'/'.$path;
        }

        return Storage::disk($disk)->url($path);
    }

    public static function publicUrl(?string $url): ?string
    {
        if (! $url) {
            return $url;
        }

        if (str_contains($url, '/storage/v1/s3/')) {
            return str_replace('/storage/v1/s3/', '/storage/v1/object/public/', $url);
        }

        if (! str_starts_with($url, 'http') && env('PUBLIC_STORAGE_URL')) {
            return rtrim(env('PUBLIC_STORAGE_URL'), '/').'/'.ltrim($url, '/');
        }

        return $url;
    }
}
