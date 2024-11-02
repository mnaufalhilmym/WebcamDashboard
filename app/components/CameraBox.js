"use client";

import React, { useEffect, useState } from 'react';

const CameraBox = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/counter`);
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };

    const intervalId = setInterval(fetchCounter, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='w-[54.167vw] h-[47.604vw] flex flex-col justify-between items-start'>
      <h1 className='font-bold text-white text-left text-[1.5vw]'>1. Camera 1</h1>
      <div className='w-full h-[29.635vw] bg-white rounded-[0.521vw] overflow-hidden'>
        <img
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/video_feed`}
          alt="webcam feed"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div className='w-[13.854vw] h-[13.385vw] bg-white rounded-[0.521vw] flex flex-col items-center justify-center'>
        <h1 className='font-bold text-center'>Counter</h1>
        <p className='text-center text-[1.2vw]'>{count}</p>
      </div>
    </div>
  );
};

export default CameraBox;
