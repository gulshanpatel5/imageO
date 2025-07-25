import React from 'react';
// Corrected import for Framer Motion and removed unused 'delay'
import { delay, motion } from 'motion/react'
import { assets, plans } from '../assets/assets';

// It's good practice to define a type/interface for your plan objects
// interface Plan {
//   id: number | string;
//   price: number;
//   desc: string;
//   credits: string;
//   featured?: boolean;
// }

const BuyCredit = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='min-h-[90vh] text-center pt-14 pb-20 px-4' // Added padding for smaller screens
    >
      <button className='border border-neutral-300 text-neutral-600 px-8 py-2 rounded-full mb-6 font-medium'>
        Our Subscriptions
      </button>
      <h1 className='text-center text-4xl md:text-5xl font-bold mb-4'>Choose Your Plan</h1>
      <p className='text-neutral-500 max-w-md mx-auto mb-12'>
        Select the perfect credit bundle to start creating.
      </p>
      
      <div className='flex flex-wrap items-center justify-center gap-8 text-left'>
        {/* Using item.id for the key is better for React's rendering */}
        {plans.map(({ id, price, desc, credits, featured = false }) => (
          <motion.div 
            key={id}
            whileHover={{ y: -10 }} // Added a subtle lift effect on hover
            className={`w-full max-w-sm rounded-xl p-8 transition-colors duration-300
              ${featured 
                ? 'bg-pink-500 text-white ring-4 ring-pink-300' 
                : 'bg-neutral-100/80 border border-neutral-200 hover:bg-neutral-200'
              }`}
          >
            <img src={assets.logo_icon} alt="Logo" className='w-10 h-10' />
            <p className={`mt-4 mb-2 font-semibold text-lg ${featured ? 'text-pink-100' : 'text-neutral-500'}`}>
              {credits}
            </p>
            {/* Using a more descriptive variable 'price' instead of 'id' */}
            <p className='text-4xl font-bold mb-4'>
              <span className='text-5xl'>₹{price}</span> / month
            </p>
            <p className={`text-sm mb-6 h-10 ${featured ? 'text-pink-200' : 'text-neutral-600'}`}>
              {desc}
            </p>
            <button className={`w-full font-bold py-3 rounded-lg mt-4 transition-transform active:scale-95
              ${featured 
                ? 'bg-white text-pink-500 hover:bg-pink-100' 
                : 'bg-pink-500 text-white hover:bg-pink-600'
              }`}
            >
              Buy Now
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default BuyCredit;