// time.tsx
import React from 'react';

// Fungsi untuk format waktu countdown
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

// Jika Anda ingin menggunakan komponen untuk menampilkan waktu countdown
export const CountdownTimer: React.FC<{ seconds: number }> = ({ seconds }) => {
  const formattedTime = formatTime(seconds);

  return (
    <div className="text-center">
      <p className="text-[12px]  font-semibold">Resend in <span className='text-red-600'>({formattedTime})</span></p>
    </div>
  );
};
