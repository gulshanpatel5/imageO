import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    
    <div>
        <Link to= '/'> 
        <img src = {assets.logo} alt="" className='w-28 sm:w-32 lg:w-40' />
        </Link>
        <div>
            <div>
                <button>
                    <img src={assets.credit_star} alt="" />
                    <p>Credit Left : 5 </p>
                </button>

                <p>Hi, My dear Friend</p>

            </div>
            <img src={assets.profile_icon} className='w-10 drop-shadow' alt="" />
        </div>
    </div>
  )
}

export default Navbar