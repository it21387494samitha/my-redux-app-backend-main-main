import React from 'react'

function Service() {
  return (
    <div className=' min-h-screen  bg-zinc-200  items-center p-10'>
     <div className='  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 '>
    <div className=' bg-white shadow-xl rounded-lg  p-8'>
      <h1 className=' text-center text-3xl text-gray-700  mb-10 font-extrabold  animate-bounce'> This is our service page </h1>
    
    <div className='grid grid-cols-1 md:grid-cols-2  gap-5'>
    <div className="bg-cyan-100 p-6 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-semibold text-cyan-600 mb-4 ">
                Service One
              </h2>
              <p className="text-gray-600 mb-4">
               Samitha              </p>
              <button className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700">
                Learn More
              </button>
            </div>
            <div className="bg-cyan-100 p-6 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-semibold text-cyan-600 mb-4">
                Service One
              </h2>
              <p className="text-gray-600 mb-4">
               Dhananjaya            </p>
              <button className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transform hover:-scale-105  transition-transform duration-100">
                Learn More
              </button>
            </div>

</div>
    </div>
     </div>

     <div className='  flex justify-center items-center  mt-2  '>
        <img className='w-42 h-42' src='https://media.tenor.com/rEwLSLR9kpIAAAAM/mad-angry.gif'/>
     </div>
    </div>
  )
}

export default Service
