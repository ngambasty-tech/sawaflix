import React from 'react'

const footer = () => {
  
  return (
    <div className="bg-black text-gray-400 py-3 md:py-5">
      <div className="flex justify-center text-red-600 font-bold text-xl md:text-2xl">SawaFlix</div>
      <p className="flex justify-center text-xs md:text-sm text-gray-500 mt-4 ">
      © {new Date().getFullYear()} SawaFlix. All rights reserved.
      </p>
      
    </div>
  )
}

export default footer
