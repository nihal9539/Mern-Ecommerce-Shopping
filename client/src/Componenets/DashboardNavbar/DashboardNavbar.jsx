import React from 'react'
import { FiAlignJustify } from "react-icons/fi";
import { setButtonFalse, setButtonTrue } from '../../Action/SidebarReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AlignJustify } from 'lucide-react';


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
    <div className='w-full flex items-center   p-3.5 px-10'>
      <AlignJustify size={20} className='stroke-main-blue' onClick={handleClick}/>
    </div>
  )
}

export default DashboardNavbar
