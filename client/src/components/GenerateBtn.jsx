import React from 'react'
import { useNavigate } from 'react-router-dom';
import { delay, motion } from 'motion/react'
import { assets } from '../assets/assets';

const GenerateBtn = () => {

  const navigate = useNavigate();

  return (
    <motion.div
    initial={{opacity:0.2,y:100}}
    whileInView={{opacity:1,y:0}}
    transition={{duration:1}}
    viewport={{once:true}}
    className ='pb-16 text-center'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 py- 6 md:py-16'>Generate your own AI-powered content. Try it now!</h1>
      <button onClick={()=>navigate('/buy')} className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors duration-200'>Subscription 
        <img src={assets.star_group} alt="" className='h-6'/></button>


      
    </motion.div>
  )
}

export default GenerateBtn