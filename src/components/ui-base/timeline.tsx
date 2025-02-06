import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui-base/button';
import { Move, Minimize2 } from 'lucide-react';

interface TimelineItem {
  title: string;
  person: string;
  time: string;
  date: string;
  imageUrl?: string;
  details?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [isFullImage, setIsFullImage] = useState(false); // State untuk modal full image

  return (
    <div className="flex flex-col w-full px-2 mt-3">
      {/* History Timeline Section */}
      <div className="flex flex-col mb-3">
        <span className="text-sm text-gray-600">Riwayat</span>
        <div className="flex flex-col space-y-0 mt-3">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={index} className="flex items-start">
                {/* Timeline Dot and Line Container */}
                <div className="flex flex-col items-center mr-4">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  {index !== items.length - 1 && (
                    <div className="w-0.5 h-16 bg-blue-600"></div>
                  )}
                </div>

                {/* Timeline Content */}
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-bold">{item.title}</span>
                  </div>
                  <div className="mt-1">
                    {item.date && (
                      <span className="ml-0 text-xs text-gray-500">
                        {item.date} {' '}
                      </span>
                    )}
                    <span className="text-xs text-gray-600 font-bold">{item.person}</span>
                  </div>
                  <div className="flex mt-2 mb-2">
                    {index === 0 && (
                      <button
                        className="text-xs text-black-400 underline hover:underline"
                        onClick={() => setSelectedItem(item)}
                      >
                        Lihat Detail
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-xs text-gray-500">No history items available</div>
          )}
        </div>
      </div>

      {/* Modal Detail */}
      <Dialog open={!!selectedItem && !isFullImage} onOpenChange={() => setSelectedItem(null)}>
  <DialogContent className="rounded-xl lg:rounded-xl w-[70%] lg:w-[50%]">
    <DialogHeader>
      <DialogTitle>{selectedItem?.title}</DialogTitle>
    </DialogHeader>

    
    {selectedItem?.imageUrl && (
      <div className="relative w-full">
        {/* Check if the image is a Base64 string and format it correctly */}
        <img
          src={`data:image/jpeg;base64,${selectedItem.imageUrl}`}  // Ensure MIME type is correct (jpeg, png, etc.)
          alt="Detail"
          className="w-full h-48 object-cover mt-3 rounded-md"
        />
        
        {/* Resize Icon */}
        <div 
          className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md cursor-pointer z-10"
          onClick={() => setIsFullImage(true)}
        >
          <Move className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    )}

    <p className="text-sm text-gray-600 mt-3">
      Diterima pada {selectedItem?.date} {selectedItem?.time} oleh {selectedItem?.person}
    </p>
    <Button variant="destructive" onClick={() => setSelectedItem(null)}>Tutup</Button>
  </DialogContent>
</Dialog>


      {/* Modal Full Image dengan Background Opacity */}
      <Dialog open={isFullImage} onOpenChange={() => setIsFullImage(false)}>
  <DialogContent className="rounded-xl lg:rounded-xl w-full max-w-4xl h-full flex items-center justify-center border-transparent bg-gray">
    {selectedItem?.imageUrl && (
      <div className="relative w-full flex justify-center">
       
        <img
          src={`data:image/jpeg;base64,${selectedItem.imageUrl}`}  // Ensure MIME type is correct
          alt="Full Image"
          className="max-w-full max-h-screen object-contain"
        />
        {/* Unresize Icon di pojok kanan bawah */}
        <div 
          className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md cursor-pointer z-20"
          onClick={() => setIsFullImage(false)}
        >
          <Minimize2 className="w-6 h-6 text-gray-500" />
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>

    </div>
  );
};

export default Timeline;
