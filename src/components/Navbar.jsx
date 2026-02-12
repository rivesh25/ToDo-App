import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center bg-violet-600 text-white py-4 px-6 shadow-lg'>
            <div className='logo flex items-center gap-2'>
                <span className='text-3xl'>✓</span>
                <span className='font-bold text-2xl'>TaskFlow</span>
            </div>
            <ul className='flex gap-6'>
                <li className='cursor-pointer hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105'>Home</li>
                <li className='cursor-pointer hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105'>Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar
