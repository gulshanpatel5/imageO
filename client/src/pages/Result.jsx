import React, { useState } from 'react'
import { assets } from '../assets/assets';
import { delay, motion } from 'motion/react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Result = () => {

  const [image, setImage] = useState(assets.sample_img_2)
  const[isImageLoaded, setIsImageLoaded] = useState(false)
  const[loading, setLoading] = useState(false)
  const[input, setInput] = useState('')

  const {generateImage} = useContext(AppContext)

  const onSubmitHandler =  async (e) => {
    e.preventDefault();
    setLoading(true);

    if(input){
      const image = await generateImage(input);
      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }

  return (
    <motion.form
    
    initial={{opacity:0.2,y:100}}
    animate={{opacity:1,y:0}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] items-center justify-center'>
      <div >
        <div className='relative'>
        <img src={image} alt=""className='max-w-sm rounded' />
    <span className={`absolute bottom-0 left-0 h-1 bg-red-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`}/>
    </div>
    <p className={!loading ? 'hidden' : ''} >Generating...</p> 
    </div>
    {!isImageLoaded && 
      <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
        <input onChange={e=>setInput(e.target.value)} value={input} placeholder='Enter your prompt' className='w-full bg-transparent outline-none px-4 py-2' />
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-full'>Generate</button>
      </div>
    }
    {isImageLoaded && 
      <div className='flex gap-2 flex-wrap text-white text-sm p-0.5 bg-neutral-500 rounded-full items-center justify-center mt-10'>
        <p onClick={()=>setIsImageLoaded(false)} className='bg-transparent  text-black px-8 py-2 rounded-full cursor-pointer'>Generate another</p>
        <a href={image} download className='bg-blue-500 text-white px-8 py-2 rounded-full cursor-pointer'>Download</a>
      </div> }

    

    </motion.form>
    
  )
}

export default Result;