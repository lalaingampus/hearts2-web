import { z } from 'zod';
import { OtpData } from '@/features/otp-home/types/otp-form.type'; // Mengimpor tipe data OTP

// Skema validasi OTP
export const otpSchema = z.object({
  otp: z
    .array(z.string().min(1, 'Kode OTP harus diisi')) // Validasi tiap input harus diisi
    .length(4, 'Kode OTP harus terdiri dari 4 digit'), // Validasi panjang OTP
});

export type OtpSchema = OtpData; // Menghubungkan Zod schema dengan tipe data
