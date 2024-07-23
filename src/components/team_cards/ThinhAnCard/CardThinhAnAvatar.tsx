import React from 'react';
import CardThinhAn from '@/components/team_cards/ThinhAnCard/CardThinhAn'; // Ensure the path is correct

const CardThinhAnAvatar: React.FC = () => {
  return (
    <div className='flex justify-left items-left w-full h-[100%]'>
      <div className="w-[280px] h-[400px] overflow-hidden">
        <CardThinhAn />
      </div>
      {/* Image aligned to the right */}
      {/* <img src={peepsThinhAn} alt='peepsThinhAn' className='w-[21%] h-[55%] mr-[2rem]' /> */}
      {/* CardMinhAnh aligned to the right of the screen */}
      {/* Adjust the width as necessary to keep the design responsive */}
    </div>
  );
};

export default CardThinhAnAvatar;
