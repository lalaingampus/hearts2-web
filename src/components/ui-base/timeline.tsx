import React from 'react';

interface TimelineItem {
  title: string;
  person: string;
  time: string;
  date: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
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
                  {/* Circle (Timeline Dot) */}
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  {/* Vertical Line */}
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
                      <span className="ml-2 text-xs text-gray-500">
                        {item.date} {item.time}{' '}
                      </span>
                    )}
                    <span className="text-xs text-gray-600 font-bold">{item.person}</span>
                  </div>
                  <div className="flex mt-2 mb-2">
                    {index === 0 && (
                      <span className="text-xs text-gray-600 font-bold">
                        Lihat Detail
                      </span>
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
    </div>
  );
};

export default Timeline;
