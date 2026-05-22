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
}
