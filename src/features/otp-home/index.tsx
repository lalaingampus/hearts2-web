import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Untuk navigasi antar halaman
import HinoLogo from '@/assets/image.png'; // Gambar logo Hino
import FooterLogo from '@/assets/footer.png'; // Gambar logo footer

const SplashScreen = () => {
  const [progress, setProgress] = useState(0); // State untuk menyimpan progress
  const [fade, setFade] = useState(false); // State untuk animasi fade
  const navigate = useNavigate(); // Hook untuk navigasi halaman

  useEffect(() => {
    const totalDuration = 7000; // Total durasi sebelum fade (7 detik)
    const fadeDuration = 1000; // Durasi animasi fade (1 detik)
    const totalWithFade = totalDuration + fadeDuration; // Total durasi termasuk fade
    const intervalDuration = 50; // Interval untuk update progress bar (ms)
    const maxProgress = 100; // Persentase maksimal progress

    const startTime = Date.now(); // Mengambil waktu mulai

    // Menghitung progress berdasarkan waktu yang telah berlalu
    const calculateProgress = () => {
      const elapsedTime = Date.now() - startTime; // Hitung waktu yang telah berlalu
      const newProgress = Math.min((elapsedTime / totalDuration) * maxProgress, maxProgress);
      setProgress(newProgress);

      if (elapsedTime >= totalDuration) {
        clearInterval(intervalId); // Hentikan interval jika waktu selesai
      }
    };

    // Mulai interval untuk update progress bar
    const intervalId = setInterval(calculateProgress, intervalDuration); // intervalId dideklarasikan sebagai const

    // Mengaktifkan animasi fade setelah 7 detik
    const fadeTimer = setTimeout(() => {
      setFade(true); // Mengaktifkan fade setelah 7 detik
    }, totalDuration);

    // Navigasi setelah 8 detik (7 detik untuk fade + 1 detik animasi fade out)
    const navigateTimer = setTimeout(() => {
      navigate('/form-otp'); // Ganti dengan path halaman utama Anda
    }, totalWithFade);

    // Membersihkan interval dan timeout ketika komponen di-unmount
    return () => {
      clearInterval(intervalId); // Pastikan interval dibersihkan
      clearTimeout(fadeTimer); // Membersihkan timeout untuk fade
      clearTimeout(navigateTimer); // Membersihkan timeout untuk navigasi
    };
  }, [navigate]);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen w-full bg-white sm:p-6 p-6 ${
        fade ? 'opacity-0' : 'opacity-100'
      } transition-opacity duration-1000`}
    >
      {/* Logo Hino */}
      <img src={HinoLogo} alt="Hino Logo" className="w-[115px] h-auto sm:w-[150px] sm:h-auto mb-8 mt-5" />
      
      {/* Teks Splash Screen */}
      <h2 className="text-[18px] sm:text-[22px] font-bold mb-4">Selamat Datang di Aplikasi Kami</h2>
      <p className="text-center text-sm sm:text-base mb-6">Tunggu sebentar, kami sedang mempersiapkan halaman utama untuk Anda...</p>

      {/* Progress Bar */}
      <div className="w-1/2 h-2 bg-gray-200 rounded-full mb-4">
        <div
          className="h-full bg-red-600 rounded-full"
          style={{ width: `${progress}%` }} // Progress bar mengikuti nilai dari progress state
        />
      </div>

      {/* Text untuk menunjukkan progress */}
      <div className="text-center font-semibold text-sm">{Math.round(progress)}%</div>

      {/* Logo Footer */}
      <div className="absolute bottom-2 left-0 w-full text-center text-xs text-gray-500">
        <img src={FooterLogo} alt="Footer Logo" className="w-8 mx-auto mb-2" />
        <p className="text-[10px]">&copy; Copyright 2020 HINO HEART. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default SplashScreen;
