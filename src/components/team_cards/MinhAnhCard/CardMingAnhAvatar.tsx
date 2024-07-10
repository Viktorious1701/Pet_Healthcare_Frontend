import React from 'react';
import peepsDuong from '@/assets/PeepsDuong.svg'; // Ensure the path is correct
import CardMinhAnh from '@/components/team_cards/MinhAnhCard/CardMinhAnh'; // Ensure the path is correct

const CardMinhAnhAvatar: React.FC = () => {
  return (
    <div className='flex justify-left items-left w-full h-[70%]'>
      {/* Image aligned to the left */}
      <img src={peepsDuong} alt='PeepsDuong' className='w-[21%] h-[55%] ml-[2rem]' />
      {/* CardMinhAnh centered in the middle of the screen */}
      {/* Adjust the width as necessary to keep the design responsive */}
      <div className='w-[30%] h-auto'>
        <CardMinhAnh />
      </div>
    </div>
  );
};

export default CardMinhAnhAvatar;