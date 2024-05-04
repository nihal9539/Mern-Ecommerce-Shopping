import React from 'react'
import { FiAlignJustify } from "react-icons/fi";
import { setButtonFalse, setButtonTrue } from '../../Action/SidebarReducer';
import { useDispatch, useSelector } from 'react-redux';


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
    <div className='w-full flex items-center shadow-sm p-3'>
      <FiAlignJustify size={30} onClick={handleClick}/>
    </div>
  )
}

export default DashboardNavbar
