import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui-base/button';
import HinoLogo from '@/assets/image.png';
import FooterLogo from '@/assets/footer.png';
import { otpSchema } from './data/schema';
import { OtpError, OtpData } from './types/otp-form.type';

const OtpForm: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [otp, setOtp] = useState<OtpData['otp']>(['', '', '', '']);
    const [seconds, setSeconds] = useState<number>(120);
    const [error, setError] = useState<OtpError>({});
    const [soDocNo, setSoDocNo] = useState<string>('');

    const inputRefs = useRef<HTMLInputElement[]>([]);

    // Ambil data dari URL path setelah '/form-code-document/'
    useEffect(() => {
        const pathParts = location.pathname.replace('/form-code-document/', '').split('/');
        if (pathParts.length >= 3) {
            console.log("✅ Data dari URL:");
            console.log("Packlist Doc No:", decodeURIComponent(pathParts[0]));
            console.log("Company Code:", pathParts[1]);
            console.log("Dealer Code:", pathParts[2]);
        }
    }, [location]);

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
            inputRefs.current[index + 1]?.focus();
        }

        if (!value && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyClick = async () => {
        const result = otpSchema.safeParse({ otp });
        if (result.success) {
            setError({});
    
            const pathParts = location.pathname.replace('/form-code-document/', '').split('/');
            const packListDocNo = decodeURIComponent(pathParts[0]);
            const companyCode = pathParts[1];
            const dealerRepCode = pathParts[2];
    
            // Format query params
            const queryParams = new URLSearchParams({
                otp: otp.join(''),
                pack_list_doc_no: packListDocNo,
                company_code: companyCode,
                dealer_rep_code: dealerRepCode,
            }).toString();
    
            const apiUrl = `/api/web-detail?${queryParams}`;
            console.log("📡 Fetching URL:", apiUrl);
    
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                console.log("📬 Response Status:", response.status, response.statusText);
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const responseText = await response.text();
                    console.log("📜 Raw Response Text:", responseText);
    
                    if (!response.ok) {
                        console.error('❌ Error Response:', response.statusText);
                        return;
                    }
    
                    try {
                        const data = JSON.parse(responseText);
                        console.log("✅ Parsed JSON Response:", data);
    
                        // Extract SoDocNo from the response (Assuming it's in data.detail[0])
                        const soDocNo = data.detail[0]?.SoDocNo || '';
                        const last4Digits = soDocNo.slice(-4); // Get last 4 digits
                        setSoDocNo(last4Digits); // Store last 4 digits in state
                        console.log('Last 4 digits of SoDocNo:', last4Digits);
    
                        // Validate if OTP matches last 4 digits of SoDocNo
                        const enteredOtp = otp.join('');
                        console.log('Entered OTP:', enteredOtp); // Log entered OTP
                        if (enteredOtp !== last4Digits) {
                            alert('❌ OTP tidak cocok dengan kode yang diharapkan.');
                            console.log('❌ OTP does not match SoDocNo.');
                            return;
                        }
    
                        // Proceed if OTP matches
                        const navigationData = {
                            otp: otp.join(''),
                            packListDocNo,
                            companyCode,
                            dealerRepCode,
                            apiResponse: data, // Simpan data respons untuk navigasi
                        };
    
                        console.log("📤 Navigating with data:", navigationData);
                        navigate('/detail', { 
                            state: { 
                                apiResponse: data.detail[0] // Mengirimkan objek pertama dalam array "detail"
                            } 
                        });
    
                    } catch (jsonError) {
                        console.error("❌ JSON Parsing Error:", jsonError);
                    }
                } else {
                    console.error('❌ Response is not JSON:', contentType);
                }
    
            } catch (error) {
                console.error('❌ Request failed:', error);
            }
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
                        className="w-12 h-12 sm:w-16 sm:h-16 text-center text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-[#F9F9F9]"
                    />
                ))}
            </div>

            {/* Error message for OTP */}
            {error.otp && (
                <div className="text-red-500 sm:text-xs text-sm mb-4">{error.otp || 'Error'}</div>
            )}
    
            {/* Verify Button */}
            <Button 
                variant="destructive" 
                size="default" 
                onClick={handleVerifyClick} 
                className="w-full mb-4"
                disabled={!isOtpFilled} // Disable button if form is not filled
            >
                Verifikasi
            </Button>
    
            {/* Footer Logo and Copyright */}
            <div className="absolute bottom-2 left-0 w-full text-center text-xs text-gray-500">
                <img src={FooterLogo} alt="Hino Logo" className="w-8 mx-auto mb-2" />
                <p className="text-[10px]">&copy; Copyright 2020 HINO HEART. All Rights Reserved</p>
            </div>
        </div>
    );
    
    
};

export default OtpForm;
