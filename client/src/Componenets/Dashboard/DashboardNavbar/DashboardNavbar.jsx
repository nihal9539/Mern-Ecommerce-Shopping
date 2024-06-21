import React from 'react'
import { FiAlignJustify } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { AlignJustify } from 'lucide-react';
import { setButtonFalse, setButtonTrue } from '../../../Action/SidebarReducer';


const DashboardNavbar = () => {
    const sidebarMenu = useSelector(state => state.sidebarReducer.sidebarAction);
    const dispatch = useDispatch();
    const handleClick = () => {
        // Dispatching appropriate action based on current button state
        if (sidebarMenu) {
          dispatch(setButtonFalse());
        } else {
          dispatch(setButtonTrue());
        }
      };
  return (
    <div className='w-full  fixed z-50 bg-white items-center   p-3.5 px-10'>
      <AlignJustify size={20} className='stroke-main-blue' onClick={handleClick}/>
    </div>
  )
}

export default DashboardNavbar
