import React from 'react';
import { assets } from '../assets/assets';
import { delay, motion } from "motion/react"
// import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

const Header = () => {

  const { user, setShowLogin } = useContext(AppContext)
  
  const navigate = useNavigate()
  const onClickHandler =() => {
    if (user) {
      navigate('/result')
    }else{
      setShowLogin(true)
    }
  }




  return (
    <motion.div className="flex flex-col justify-center items-center my-20"
    initial= {{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}

    >
      <motion.div className="text-stone-500 inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full border border-neutral-400 shadow-md hover:scale-105 transition-transform duration-300"
      
      initial= {{opacity:0,y:-20}}
      animate={{opacity:1,y:0}}
      viewport={{delay:0.2,duration:0.8}}
      >
        <p className="font-medium text-sm">Create Your imagination..💡</p>
        <img src={assets.star_icon} alt="Star Icon" className="w-4 h-4" />
      </motion.div>

      <motion.h1 className='text-4xl max-w-[300px] sm:text-6xl sm:max-w-[590px] mx-auto mt-10 text-center'
      initial = {{opacity:0}}
      animate = {{opacity:1}}
      transition={{delay:0.4,duration:2}}
      >

        Transform Words into <span className='text-red-600 font-bold'>Art</span> in seconds.</motion.h1>

        <motion.p className='text-center max-w-xl mx-auto mt-5'
        initial ={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.6,duration:0.8}}



        >Transform your ideas into stunning visuals with our AI-powered text-to-image creation platform. Simply describe your imagination, and watch it come to life in seconds!</motion.p>


        <motion.button onClick={onClickHandler} className='sm:text-lg text-white bg-pink-700 w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{default: {duration:0.5},opacity:{delay:0.8,duration:1}}}
        

        > Generate Images
          <img src={assets.star_group} alt="" className='h-6' />
        </motion.button>

        <motion.div className='flex flex-wrap justify-center mt-16 gap-3'>
          {Array(6).fill('').map((item, index)=>(
            <motion.img 
            whileHover={{scale:1.05,duration:0.1}}
            className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={index % 2 ==0 ? assets.sample_img_2 : assets.sample_img_1 } alt="" width={70} />

          ))}
          
        </motion.div>
          <motion.p 
          initial= {{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:1.2,duration:0.8}}
          className='mt-2 text-neutral-600'>
            Generated images from imageO

          </motion.p>

    </motion.div>
    
  );
};

export default Header;