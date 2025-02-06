import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FooterLogo from '@/assets/footer.png';
import Timeline from '@/components/ui-base/timeline';
import historyItems from '@/features/otp-home/data/default';
import StickyWhatsAppButton from '@/components/ui-base/whatsapp-button';
import PackListCard from '@/components/ui-base/form-copy';
import { formatDateID } from '@/lib/utility/formatDate';

import { LuCopy } from 'react-icons/lu';

// Fungsi utilitas untuk format angka
const formatNumber = (num: number) => num.toLocaleString('id-ID');

const Detail: React.FC = () => {
  const location = useLocation();
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { apiResponse } = location.state || {};

  useEffect(() => {
    if (apiResponse) {
      setData(apiResponse);
      setLoading(false);
      
      if (apiResponse.DeliveryMethod) {
        console.log('Delivery Method:', apiResponse.DeliveryMethod);
      }
    } else {
      setError('No data available');
      setLoading(false);
    }
  }, [apiResponse]);

  const copyToClipboard = () => {
    if (data?.ResiNo) {
      navigator.clipboard.writeText(data.ResiNo).catch(console.error);
    }
  };

  const handleCopyClick = (packListDocNo: string) => {
    if (typeof packListDocNo === 'string') {
      navigator.clipboard.writeText(packListDocNo).catch(console.error);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen w-full md:w-1/4 bg-white sm:p-6 p-6">
      <div className="text-bold text-xs text-red-500 mb-8">
        <p>Details Informasi Penting</p>
      </div>
      <img src={FooterLogo} alt="Hino Logo" className="sm:w-24 mb-5 w-14 mx-auto mb-2" />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {data && (
        <div className="w-full">
          <PackListCard
            packListDocNo={data.PackListDocNo}
            onCopy={() => handleCopyClick(data.PackListDocNo)}
          />

          {/* Bagian informasi utama */}
          <div className="flex w-full justify-between px-0 mt-3">
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Tanggal Packing</span>
              <span className="text-sm text-gray-600 font-bold pt-2">
                {data.PackListDate ? formatDateID(data.PackListDate) : 'Tanggal tidak tersedia'}
              </span>
            </div>
          </div>

          {/* Metode Pengiriman */}
          <div className="flex flex-col w-full px-0 mt-3">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-600">Metode Pengiriman</span>
                <span className="text-sm text-gray-600 font-bold">{data.DeliverystatusDesc}</span>
              </div>
              {data.DeliveryMethod === 'DLV' && (
                <div className="flex flex-col ml-5">
                  <span className="text-sm text-gray-600">Expedition</span>
                  <span className="text-sm text-gray-600 font-bold">{data.DeliveryExpedition}</span>
                </div>
              )}
            </div>
          </div>

          {/* Nomor Resi */}
          {data.DeliveryMethod === 'DLV' && (
            <div className="flex flex-col w-full px-0 mt-3">
              <span className="text-sm text-gray-600">No Resi</span>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 font-bold pt-2">{data.ResiNo}</span>
                <button onClick={copyToClipboard} className="ml-2">
                  <LuCopy  className="text-gray-400 cursor-pointer hover:text-gray-800" />
                </button>
              </div>
            </div>
          )}

          {/* Informasi Kontak */}
          <div className="flex flex-col w-full px-0 mt-3">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-600">Nama Kontak</span>
                <span className="text-sm text-gray-600 font-bold pt-2">{data.CustomerName}</span>
              </div>
              {data.DeliveryMethod === 'DLV' && (
                <div className="flex flex-col ml-5">
                  <span className="text-sm text-gray-600">Nomor Kontak</span>
                  <span className="text-sm text-gray-600 font-bold pt-2">{data.DlvrPhoneNo}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tanggal Pengiriman */}
          <div className="flex flex-col w-full px-0 mt-3">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-600">Tanggal Pengiriman</span>
                <span className="text-sm text-gray-600 font-bold pt-2">
                  {data.DlvrDate ? formatDateID(data.DlvrDate) : 'Tanggal tidak tersedia'}
                </span>
              </div>
              {data.DeliveryMethod === 'DLV' && (
                <div className="flex flex-col mr-5">
                  <span className="text-sm text-gray-600">PWT</span>
                  <span className="text-sm text-gray-600 font-bold pt-2">{data.DeliveryETA}</span>
                </div>
              )}
            </div>
          </div>

          {/* Alamat */}
          <div className="flex flex-col w-full px-0 mt-3">
            <span className="text-sm text-gray-600">Alamat Pengiriman</span>
            <span className="text-sm text-gray-600 font-bold pt-2">{data.DlvrAddr}</span>
          </div>

          {data.DeliveryMethod === 'DLV' && (
            <div className="flex flex-col w-full px-0 mt-3">
              <span className="text-sm text-gray-600">Alamat Pengirim</span>
              <span className="text-sm text-gray-600 font-bold pt-2">{data.DeliverySenderAddress}</span>
            </div>
          )}

          {/* Berat */}
          <div className="flex flex-col w-full px-0 mt-3">
            <span className="text-sm text-gray-600">Berat</span>
            <span className="text-sm text-gray-600 font-bold pt-2">{data.DeliveryWeight}</span>
          </div>

          {/* Item Packing */}
          <div className="flex flex-col w-full px-0 mt-3">
            <div className="flex flex-col mb-3">
              <span className="text-sm text-gray-600">Item Packing</span>
            </div>
            

              <div  className="flex w-full justify-between px-0 mt-3 border-b border-gray-300 pb-2">
                <div className="flex flex-col w-full">
                  <span className="text-sm text-gray-600 font-bold">{data.ItemCode}</span>
                  <div className="flex justify-between w-full mt-1">
                    <span className="text-sm text-gray-600">{data.ItemName}</span>
                    <span className="text-sm text-gray-600">{formatNumber(data.QtyPack)} Qty</span>
                  </div>
                </div>
              </div>
           
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