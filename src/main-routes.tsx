// main-routes.tsx
import { Routes, Route} from 'react-router-dom';
import OtpForm from '@/features/otp-home/form-otp';
import SplashScreen from '@/features/otp-home/index'; // OTP form page
import DetailPage from '@/features/otp-home/detail'; // Detail page after OTP is verified
import PageNotFound from '@/components/error/page-not-found';


const MainRoutes = () => {
  return (
    
        <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/form-otp" element={<OtpForm />} />
            <Route path="/detail" element={<DetailPage />} />
           
            <Route path="*" element={<PageNotFound />} />
        </Routes>
 
  );
};

export default MainRoutes;
