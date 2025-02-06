import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FooterLogo from '@/assets/footer.png';
import Timeline from '@/components/ui-base/timeline';
import historyItems from '@/features/otp-home/data/default';
import StickyWhatsAppButton from '@/components/ui-base/whatsapp-button';
import PackListCard from '@/components/ui-base/form-copy';
import { formatDateID } from '@/lib/utility/formatDate';

const Detail: React.FC = () => {
  const location = useLocation();
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Ambil data yang dikirim melalui state
  const { apiResponse } = location.state || {};

  useEffect(() => {
    if (apiResponse) {
      setData(apiResponse); // Menggunakan data yang sudah diterima
      setLoading(false);
    } else {
      setError('No data available');
      setLoading(false);
    }
  }, [apiResponse]);

  const handleCopyClick = (packListDocNo: string) => {
    if (typeof packListDocNo === 'string') {
      navigator.clipboard.writeText(packListDocNo)
        .then(() => {
          console.log(`Copied: ${packListDocNo}`);
        })
        .catch((err) => {
          console.error('Failed to copy:', err);
        });
    } else {
      console.error('Invalid value passed to handleCopyClick, expected string.');
    }
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen w-full md:w-1/4 bg-white sm:p-6 p-6">
      <div className='text-bold text-xs text-red-500 mb-8'>
        <p>Details Informasi Penting</p>
      </div>
      <div className=''>
        <img src={FooterLogo} alt="Hino Logo" className="sm:w-24 mb-5 w-14 mx-auto mb-2" />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div className="w-full">
          <PackListCard
            packListDocNo={data.PackListDocNo}
            onCopy={() => handleCopyClick(data.PackListDocNo)}
          />

          <div className='flex w-full justify-between px-0 mt-3'>
            <div className='flex flex-col'>
              <span className="text-sm text-gray-600">Tanggal Packing</span>
              <span className="text-sm text-gray-600 font-bold pt-2">
                {data.PackListDate ? formatDateID(data.PackListDate) : 'Tanggal tidak tersedia'}
              </span>
            </div>
          </div>

          <div className='flex flex-col w-full px-0 mt-3'>
            <span className="text-sm text-gray-600">Delivery Status</span>
            <span className="text-sm text-gray-600 font-bold pt-2">{data.DeliverystatusDesc}</span>
          </div>

          <div className='flex flex-col w-full px-0 mt-3'>
            <span className="text-sm text-gray-600">Expedition</span>
            <span className="text-sm text-gray-600 font-bold pt-2">{data.DeliveryExpedition}</span>
          </div>

          <div className='flex flex-col w-full px-0 mt-3'>
            <span className="text-sm text-gray-600">No Resi</span>
            <span className="text-sm text-gray-600 font-bold pt-2">{data.ResiNo}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col w-full px-0 mt-3">
        <Timeline items={historyItems} />
      </div>

      <StickyWhatsAppButton />
    </div>
  );
};

export default Detail;
