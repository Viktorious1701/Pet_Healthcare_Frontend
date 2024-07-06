import React from 'react'

interface CategorySectionProps {
  children: React.ReactNode
  imgSrc: string
}

const ImageCard = ({ children, imgSrc, ...props }: CategorySectionProps) => {
  return (
    <div
      {...props}
      className='relative max-w-lg h-auto overflow-hidden rounded-2xl shadow-lg group flex 
      justify-center items-center cursor-pointer 
      transition-transform duration-200 hover:scale-105'
    >
      <img src={imgSrc} alt='' className='transition-transform group-hover:scale-110 duration-200' />
      <div className='absolute inset-0 flex justify-center items-center bg-gradient-to-t from-black/60 to-transparent '>
        <div className='p-4 text-white'>{children}</div>
      </div>
    </div>
  )
}

export default ImageCard
