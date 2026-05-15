<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pendaftaran Film Diterima</title>
</head>
<body style="margin: 0; padding: 0; background: #090909; color: #f5f5f0; font-family: Inter, Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width: 100%; background: #090909;">
        <tr>
            <td align="center" style="padding: 0;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width: 100%; max-width: 760px;">
                    <tr>
                        <td style="padding: 42px 28px 26px; border-bottom: 1px solid rgba(245,245,240,0.08);">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="left" style="font-family: Georgia, 'Times New Roman', serif; font-size: 28px; letter-spacing: 7px; color: #f5f5f0; line-height: 1;">
                                        WIGRA.
                                    </td>
                                    <td align="right" style="font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #c9544d; white-space: nowrap;">
                                        Film Application
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 70px 28px 76px;">
                            <div style="font-size: 11px; letter-spacing: 5px; text-transform: uppercase; color: #d4a853; margin-bottom: 24px;">
                                Status Update
                            </div>

                            <h1 style="margin: 0; max-width: 620px; font-family: Georgia, 'Times New Roman', serif; font-size: 56px; line-height: 1.03; font-weight: 400; color: #f5f5f0;">
                                Halo {{ $application->name }},
                            </h1>

                            <p style="margin: 30px 0 0; max-width: 620px; font-size: 18px; line-height: 1.85; color: #b7b7b2;">
                                Selamat, pendaftaran Anda telah diterima oleh tim Wigra. Terima kasih sudah mengambil bagian dalam proses seleksi film kami.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="background: #f5f5f0; color: #101010; padding: 54px 28px 58px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="padding-bottom: 28px;">
                                        <div style="width: 52px; height: 2px; background: #c9544d; line-height: 2px; font-size: 0;">&nbsp;</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                                            <tr>
                                                <td style="padding: 0 0 28px; border-bottom: 1px solid rgba(16,16,16,0.12);">
                                                    <div style="font-size: 11px; letter-spacing: 5px; text-transform: uppercase; color: #9b9b94; margin-bottom: 12px;">
                                                        Project
                                                    </div>
                                                    <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 27px; line-height: 1.25; color: #111111;">
                                                        {{ $filmName ?: 'Film #' . $application->film_id }}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 28px 0; border-bottom: 1px solid rgba(16,16,16,0.12);">
                                                    <div style="font-size: 11px; letter-spacing: 5px; text-transform: uppercase; color: #9b9b94; margin-bottom: 12px;">
                                                        Role
                                                    </div>
                                                    <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 27px; line-height: 1.25; color: #111111;">
                                                        {{ $application->role }}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 28px 0 0;">
                                                    <div style="font-size: 11px; letter-spacing: 5px; text-transform: uppercase; color: #c9544d; margin-bottom: 12px;">
                                                        Status
                                                    </div>
                                                    <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 30px; line-height: 1.2; color: #111111;">
                                                        Accepted
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>

                                        <p style="margin: 44px 0 0; max-width: 620px; font-size: 16px; line-height: 1.8; color: #5f5f5a;">
                                            Tim kami akan menghubungi Anda kembali jika ada informasi lanjutan mengenai jadwal, kebutuhan produksi, atau tahap berikutnya.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 34px 28px 44px; background: #090909;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="left" style="font-size: 12px; line-height: 1.8; color: #7d7d78;">
                                        Email ini dikirim otomatis oleh Wigra Admin.
                                    </td>
                                    <td align="right" style="font-family: Georgia, 'Times New Roman', serif; font-size: 18px; letter-spacing: 5px; color: #f5f5f0;">
                                        WIGRA.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
