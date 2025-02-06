import { Routes, Route } from 'react-router-dom';
import FormCodeDocument from '@/features/otp-home/form-code-document';
import SplashScreen from '@/features/otp-home/index'; // Halaman utama
import DetailPage from '@/features/otp-home/detail'; // Halaman setelah OTP diverifikasi
import PageNotFound from '@/components/error/page-not-found';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      {/* Route tidak perlu diubah */}
      <Route path="/form-code-document/*" element={<FormCodeDocument />} />
      <Route path="/detail" element={<DetailPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRoutes;
