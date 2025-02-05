import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui-base/button';
import HinoLogo from '@/assets/image.png';
import FooterLogo from '@/assets/footer.png';
import { otpSchema } from './data/schema';
import { OtpError, OtpData } from './types/otp-form.type';
import { useNavigate } from 'react-router-dom';

const OtpForm: React.FC = () => {
    const [otp, setOtp] = useState<OtpData['otp']>(['', '', '', '']);
    const [seconds, setSeconds] = useState<number>(120);
    const [error, setError] = useState<OtpError>({});
    const inputRefs = useRef<HTMLInputElement[]>([]); // Refs untuk semua input OTP
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (seconds > 0) setSeconds(seconds - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [seconds]);

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // Hanya angka
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            // Fokus ke input berikutnya jika ada
            inputRefs.current[index + 1]?.focus();
        }

        if (!value && index > 0) {
            // Jika dihapus, pindah ke input sebelumnya
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyClick = () => {
        const result = otpSchema.safeParse({ otp });
        if (result.success) {
            console.log('OTP valid:', otp.join(''));
            setError({});
            navigate('/detail');
        } else {
            const errorMap: OtpError = {};
            result.error.errors.forEach((err) => {
                if (err.path[0] === 'otp') {
                    errorMap.otp = err.message;
                }
            });
            setError(errorMap);
        }
    };

    // Memeriksa apakah semua input OTP sudah diisi
    const isOtpFilled = otp.every(digit => digit !== '');

    return (
        <div className="flex flex-col items-center justify-start min-h-screen w-full md:w-1/4 bg-white sm:p-6 p-6">
            <img src={HinoLogo} alt="Hino Logo" className="w-[115px] h-auto sm:w-[150px] sm:h-auto mb-8 mt-5" />
            <h2 className="text-[12px] sm:text-[15px] sm:mb-24 mb-14">Masukkan Kode Dokumen</h2>

            {/* Input OTP */}
            <div className="grid grid-cols-4 sm:gap-10 gap-5 mb-24 sm:mb-30">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el!)} // Simpan referensi input
                        type="text"
                        maxLength={1}
                        value={digit}
                        inputMode="numeric" // Keyboard angka pada perangkat seluler
                        onChange={(e) => handleOtpChange(e, index)}
                        className="w-12 h-12 sm:w-16 sm:h-16 text-center text-xl  rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-[#F9F9F9]"
                    />
                ))}
            </div>
            {error.otp && (
                <div className="text-red-500 sm:text-xs text-sm mb-4">{error.otp}</div>
            )}

            {/* Tombol Verifikasi */}
            <Button 
                variant="destructive" 
                size="default" 
                onClick={handleVerifyClick} 
                className="w-full mb-4"
                disabled={!isOtpFilled} // Menonaktifkan tombol jika form belum terisi
            >
                Verifikasi
            </Button>

            {/* Logo Hino dan Copyright */}
            <div className="absolute bottom-2 left-0 w-full text-center text-xs text-gray-500">
                <img src={FooterLogo} alt="Hino Logo" className="w-8 mx-auto mb-2" />
                <p className="text-[10px]">&copy; Copyright 2020 HINO HEART. All Rights Reserved</p>
            </div>
        </div>
    );
};

export default OtpForm;
