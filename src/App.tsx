// app/App.tsx
import React from 'react';
import MainRoutes from '@/main-routes';  // Mengimpor OtpForm dari fitur OTP

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <MainRoutes />;  {/* Menampilkan form OTP */}
    </div>
  );
};
export default App;

// export default App;
// // app/App.tsx
// import React from 'react';
// import MainRoutes from '@/main-routes';  // Mengimpor MainRoutes untuk routing

// function App() {
//   return <MainRoutes />; {/* MainRoutes akan menangani semua routing */}
// }

// export default App;
