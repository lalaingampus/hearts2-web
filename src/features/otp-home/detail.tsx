import React from 'react';
import FooterLogo from '@/assets/footer.png'; 
import Timeline from '@/components/ui-base/timeline';
import  historyItems  from '@/features/otp-home/data/default'; 
import StickyWhatsAppButton from '@/components/ui-base/whatsapp-button';
import usePackingDataDetail from '@/features/otp-home/hook/detail.hook';
import { formatDateID } from '@/lib/utility/formatDate';
import { formatNumber } from '@/lib/utility/formatNumber'; 
import PackListCard from '@/components/ui-base/form-copy';


const Detail: React.FC = () => {
    const { data } = usePackingDataDetail();


  // Contoh data pengguna (bisa berasal dari API atau state global)

  const handleCopyClick = (packListDocNo: string) => {
    console.log(typeof packListDocNo, packListDocNo);
    if (typeof packListDocNo === 'string') {
      navigator.clipboard.writeText(packListDocNo) // Menyalin teks ke clipboard
        .then(() => {
          console.log(`Copied: ${packListDocNo}`); // Log keberhasilan
        })
        .catch((err) => {
          console.error('Failed to copy:', err); // Tangani kesalahan
        });
    } else {
      console.error('Invalid value passed to handleCopyClick, expected string.');
    }
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen w-full md:w-1/4 bg-white sm:p-6 p-6" >
      {/* Header */}
      <div className='text-bold text-xs text-red-500 mb-8'>
        <p>Details Informasi Penting</p>
      </div>
      <div className=''>
        <img src={FooterLogo} alt="Hino Logo" className="sm:w-24 mb-5 w-14 mx-auto mb-2" />
      </div>
      {data && data.map((item: any, index: number) => (
        <div key={index} className="w-full"> {/* Wrap both divs in a parent div */}
            <PackListCard
            packListDocNo={item.PackListDocNo}
            onCopy={() => handleCopyClick(item.PackListDocNo)}
          />
            
            <div className='flex w-full justify-between px-0 mt-3'>
            {/* Left Column (Text) */}
            <div className='flex flex-col'>
                <span className="text-sm text-gray-600">Tanggal Packing</span>
                <span className="text-sm text-gray-600 font-bold pt-2">{item.PackListDate ? formatDateID(item.PackListDate) : 'Tanggal tidak tersedia'}</span>
            </div>
            </div>

            <div className='flex w-full justify-between px-0 mt-3'>
                    {/* Left Column (Text) */}
                    <div className='flex flex-col'>
                    <span className="text-sm text-gray-600">Metode Pengiriman</span>
                    <span className="text-sm text-gray-600 font-bold pt-2">{item.DeliveryMethod}</span>
                    </div>

                {/* Right Column (Icon) */}
                {item.DeliveryMethod === 'DLV' && (
                <div className='flex flex-col'>
                    <span className="text-sm text-gray-600">Ekspedisi</span>
                    <span className="text-sm text-gray-600 font-bold pt-2">{item.DeliveryExpedition}</span>
                    </div>
                )}
                
                
                </div>

                <div className='flex w-full justify-between px-0 mt-3'>
                    {/* Left Column (Text) */}
                    <div className='flex flex-col'>
                    <span className="text-sm text-gray-600">Nama Kontak</span>
                    <span className="text-sm text-gray-600 font-bold pt-2">{item.DlvrCp}</span>
                    </div>

                {/* Right Column (Icon) */}
                
                <div className='flex flex-col'>
                    <span className="text-sm text-gray-600">Nomor Kontak</span>
                    <span className="text-sm text-gray-600 font-bold pt-2">{item.DlvrPhoneNo}</span>
                    </div>
                
                </div>

                <div className='flex w-full justify-between px-0 mt-3'>
                    {/* Left Column (Text) */}
                    <div className='flex flex-col'>
                    <span className="text-sm text-gray-600">Tanggal Pengiriman</span>
                    <span className="text-sm text-gray-600 font-bold pt-1">{item.DlvrDate ? formatDateID(item.DlvrDate) : 'Tanggal tidak tersedia'}</span>
                    </div>

                {/* Right Column (Icon) */}
                {item.DeliveryMethod=== 'DLV' && (
                <div className='flex flex-col'>
                    <span className="text-sm text-gray-600">PWT</span>
                    <span className="text-sm text-gray-600 font-bold pt-2">{item.DeliveryETA} Hari</span>
                    </div>
                )}
                
                
                </div>


                <div className='flex w-full justify-between px-0 mt-3'>
                    {/* Left Column (Text) */}
                    <div className='flex flex-col'>
                    <span className="text-sm text-gray-600">Alamat Pengiriman</span>
                    <span className="text-sm text-gray-600 font-bold pt-1">{item.DlvrAddr}</span>
                    </div>

                
                </div>
                <div className='flex w-full justify-between px-0 mt-3'>
                    {/* Left Column (Text) */}
                    <div className='flex flex-col'>
                    <span className="text-sm text-gray-600">Berat</span>
                    <span className="text-sm text-gray-600 font-bold pt-1">{item.DeliveryWeight} Kg</span>
                    </div>

                
                </div>

                <div className='flex w-full justify-between px-0 mt-3'>
                    {/* Left Column (Text) */}
                    <div className='flex flex-col'>
                    <span className="text-sm text-gray-600">Keterangan</span>
                    <span className="text-sm text-gray-600 font-bold pt-1">-</span>
                    </div>

                
                </div>

                <div className="flex flex-col w-full px-0 mt-3">
                    {/* Keterangan Section */}
                    <div className="flex flex-col mb-3">
                        <span className="text-sm text-gray-600">Item Packing</span>
                    </div>

                    {/* Item Packing Section */}
                        <div className="flex w-full justify-between px-0 mt-3 border-b border-gray-300 pb-2">
                            <div className="flex flex-col w-full">
                                <span className="text-sm text-gray-600 font-bold">{item.ItemCode}</span>
                                <div className="flex justify-between w-full mt-1">
                                    <span className="text-sm text-gray-600">{item.ItemName}</span> {/* Replace with the actual item name */}
                                    <span className="text-sm text-gray-600">{formatNumber(item.QtyPack)} Qty</span> {/* Replace with actual qty */}
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
        </div>
        ))}
      {/* Body */}
      

      

      

      

      

      

      

 

        
      

        <div className="flex flex-col w-full px-0 mt-3">
        {/* Timeline Component */}
        <Timeline items={historyItems} />
      </div>




      

      {/* Button untuk kembali ke halaman OTP */}
      <StickyWhatsAppButton />
    </div>
  );
};

export default Detail;
