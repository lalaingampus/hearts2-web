import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FooterLogo from '@/assets/footer.png';
import Timeline from '@/components/ui-base/timeline';
import historyItems from '@/features/otp-home/data/default';
import StickyWhatsAppButton from '@/components/ui-base/whatsapp-button';
import PackListCard from '@/components/ui-base/form-copy';
import { formatDateID } from '@/lib/utility/formatDate';
import { FaClipboard } from 'react-icons/fa';

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
  
      // Log DeliveryMethod ke konsol
      if (apiResponse.DeliveryMethod) {
        console.log('Delivery Method:', apiResponse.DeliveryMethod);
      }
    } else {
      setError('No data available');
      setLoading(false);
    }
  }, [apiResponse]);

  const copyToClipboard = () => {
    if (data && data.ResiNo) {
      navigator.clipboard.writeText(data.ResiNo)
        .catch((err) => {
          console.error('Gagal menyalin: ', err);
        });
    }
  };

  const handleCopyClick = (packListDocNo: string) => {
    if (typeof packListDocNo === 'string') {
      navigator.clipboard.writeText(packListDocNo)
        .catch((err) => {
          console.error('Failed to copy:', err);
        });
    } else {
      console.error('Invalid value passed to handleCopyClick, expected string.');
    }
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen w-full md:w-1/4 bg-white sm:p-6 p-6">
  <div className="text-bold text-xs text-red-500 mb-8">
    <p>Details Informasi Penting</p>
  </div>
  <div>
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

      <div className="flex w-full justify-between px-0 mt-3">
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">Tanggal Packing</span>
          <span className="text-sm text-gray-600 font-bold pt-2">
            {data.PackListDate ? formatDateID(data.PackListDate) : 'Tanggal tidak tersedia'}
          </span>
        </div>
      </div>

      <div className="flex flex-col w-full px-0 mt-3 ">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Metode Pengiriman</span>
            <span className="text-sm text-gray-600 font-bold">{data.DeliverystatusDesc}</span>
          </div>
          {data?.DeliveryMethod === 'DLV' && (
            <div className="flex flex-col ml-5">
              <span className="text-sm text-gray-600">Expedition</span>
              <span className="text-sm text-gray-600 font-bold">{data.DeliveryExpedition}</span>
            </div>
          )}
        </div>
      </div>



      {data && data.DeliveryMethod === 'DLV' && (
        <div className="flex flex-col w-full px-0 mt-3">
          <span className="text-sm text-gray-600">No Resi</span>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 font-bold pt-2">{data.ResiNo}</span>
            <button onClick={copyToClipboard} className="ml-2">
              <FaClipboard className="text-gray-600 cursor-pointer hover:text-gray-800" />
            </button>
          </div>
        </div>
      )}


      <div className="flex flex-col w-full px-0 mt-3 ">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Nama Kontak</span>
            <span className="text-sm text-gray-600 font-bold pt-2">{data.CustomerName}</span>
          </div>
          {data?.DeliveryMethod === 'DLV' && (
            <div className="flex flex-col ml-5">
              <span className="text-sm text-gray-600">Nomor Kontak</span>
              <span className="text-sm text-gray-600 font-bold pt-2">{data.DlvrPhoneNo}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full px-0 mt-3">
        <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">Tanggal Pengiriman</span>
          <span className="text-sm text-gray-600 font-bold pt-2">
            {data.DlvrDate ? formatDateID(data.DlvrDate) : 'Tanggal tidak tersedia'}
          </span>
          </div>
        

        {data && data.DeliveryMethod === 'DLV' && (
          <div className="flex flex-col mr-5">
            <span className="text-sm text-gray-600">PWT</span>
            <span className="text-sm text-gray-600 font-bold pt-2">{data.DeliveryETA}</span>
          </div>
        )}
        </div>
      </div>

      

      <div className="flex flex-col w-full px-0 mt-3">
        <span className="text-sm text-gray-600">Alamat Pengiriman</span>
        <span className="text-sm text-gray-600 font-bold pt-2">{data.DlvrAddr}</span>
      </div>

      {data && data.DeliveryMethod === 'DLV' && (
        <div className="flex flex-col w-full px-0 mt-3">
          <span className="text-sm text-gray-600">Alamat Pengirim</span>
          <span className="text-sm text-gray-600 font-bold pt-2">{data.DeliverySenderAddress}</span>
        </div>
      )}

      <div className="flex flex-col w-full px-0 mt-3">
        <span className="text-sm text-gray-600">Berat</span>
        <span className="text-sm text-gray-600 font-bold pt-2">{data.DeliveryWeight}</span>
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
