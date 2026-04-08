import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'

const about = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis earum aut eaque quis veritatis, adipisci quas distinctio dolores consequatur? Incidunt consequatur quidem aut sunt eveniet, non suscipit autem assumenda aperiam, quibusdam eos fuga soluta cupiditate exercitationem sapiente dolores voluptate voluptatem accusamus rem deserunt quasi neque? Alias eius earum tenetur iste.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis corporis perspiciatis incidunt quibusdam quas odit exercitationem harum delectus! Ad reiciendis esse temporibus sed perferendis harum porro, sint maiores quo non corrupti expedita asperiores voluptatem ipsam veniam a, neque quae vero iusto perspiciatis, tempore rerum. Omnis eaque impedit recusandae et officia.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, deserunt. Facere architecto labore temporibus ad atque provident quisquam nostrum dolor veniam nihil obcaecati natus fugit placeat ea exercitationem ullam incidunt maxime numquam, voluptates quia similique excepturi! Quos assumenda sint iure, cupiditate ab dolorum sequi pariatur molestias id perferendis sapiente perspiciatis?</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}></Title>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, optio?</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, optio?</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, optio?</p>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default about