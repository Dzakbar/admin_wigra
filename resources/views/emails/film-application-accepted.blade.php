<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pendaftaran Film Diterima</title>
</head>
<body style="margin: 0; padding: 0; background: #0a0a0a; color: #ffffff; font-family: Inter, Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width: 100%; background: #0a0a0a; padding: 36px 16px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width: 100%; max-width: 640px;">
                    <tr>
                        <td style="padding: 0 0 22px; text-align: center;">
                            <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 34px; letter-spacing: 7px; color: #fafaf8; line-height: 1;">
                                WIGRA.
                            </div>
                            <div style="margin-top: 10px; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #c9544d;">
                                Film Application
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="background: #111111; border: 1px solid rgba(255,255,255,0.10); border-radius: 8px; overflow: hidden;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="height: 5px; background: #c9544d; line-height: 5px; font-size: 0;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding: 42px 40px 36px;">
                                        <div style="font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #d4a853; margin-bottom: 16px;">
                                            Status Update
                                        </div>

                                        <h1 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 38px; line-height: 1.12; font-weight: 400; color: #fafaf8;">
                                            Halo {{ $application->name }},
                                        </h1>

                                        <p style="margin: 22px 0 0; font-size: 17px; line-height: 1.75; color: #d8d8d8;">
                                            Selamat, pendaftaran Anda telah diterima oleh tim Wigra. Terima kasih sudah mengambil bagian dalam proses seleksi film kami.
                                        </p>

                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 30px; border-collapse: separate; border-spacing: 0 10px;">
                                            <tr>
                                                <td style="width: 120px; padding: 12px 14px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-right: 0; border-radius: 8px 0 0 8px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #999999;">
                                                    Project
                                                </td>
                                                <td style="padding: 12px 14px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-left: 0; border-radius: 0 8px 8px 0; font-size: 15px; color: #ffffff;">
                                                    {{ $filmName ?: 'Film #' . $application->film_id }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 120px; padding: 12px 14px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-right: 0; border-radius: 8px 0 0 8px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #999999;">
                                                    Role
                                                </td>
                                                <td style="padding: 12px 14px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-left: 0; border-radius: 0 8px 8px 0; font-size: 15px; color: #ffffff;">
                                                    {{ $application->role }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 120px; padding: 12px 14px; background: rgba(201,84,77,0.12); border: 1px solid rgba(201,84,77,0.28); border-right: 0; border-radius: 8px 0 0 8px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #d4a853;">
                                                    Status
                                                </td>
                                                <td style="padding: 12px 14px; background: rgba(201,84,77,0.12); border: 1px solid rgba(201,84,77,0.28); border-left: 0; border-radius: 0 8px 8px 0; font-size: 15px; color: #ffffff;">
                                                    Accepted
                                                </td>
                                            </tr>
                                        </table>

                                        <p style="margin: 30px 0 0; font-size: 15px; line-height: 1.7; color: #bdbdbd;">
                                            Tim kami akan menghubungi Anda kembali jika ada informasi lanjutan mengenai jadwal, kebutuhan produksi, atau tahap berikutnya.
                                        </p>

                                        <div style="margin-top: 34px; padding-top: 22px; border-top: 1px solid rgba(255,255,255,0.10);">
                                            <div style="font-size: 13px; color: #999999;">Regards,</div>
                                            <div style="margin-top: 6px; font-family: Georgia, 'Times New Roman', serif; font-size: 22px; letter-spacing: 4px; color: #fafaf8;">
                                                WIGRA.
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 18px 8px 0; text-align: center; font-size: 11px; line-height: 1.6; color: #777777;">
                            Email ini dikirim otomatis oleh Wigra Admin. Mohon tidak membalas langsung ke email ini.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
