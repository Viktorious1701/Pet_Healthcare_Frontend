import React from 'react';
import CardAnhKiet from '@/components/team_cards/AnhKietCard/CardAnhKiet'; // Ensure the path is correct

const CardAnhKietAvatar: React.FC = () => {
  return (
    <div className='flex justify-left items-left w-full h-[100%]'>
      {/* Image aligned to the left */}
      {/* <img src={peepsDuong} alt='PeepsDuong' className='w-[21%] h-[55%] ml-[2rem]' /> */}
      {/* CardMinhAnh centered in the middle of the screen */}
      {/* Adjust the width as necessary to keep the design responsive */}
      <div className='w-[280px] h-[400px] overflow-hidden'>
        <CardAnhKiet />
      </div>
    </div>
  );
};

export default CardAnhKietAvatar;
