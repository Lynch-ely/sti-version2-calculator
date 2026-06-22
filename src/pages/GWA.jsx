import React from 'react'
import { MdDelete } from "react-icons/md";

function GWA() {
    const deleteInput = () => {
    setPrelim('');
    setMidterm('');
    setPrefinal('');
    setFinals('');
    };

  return (
    <div className={` bg-[#FEFEFE] rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-5 space-y-3`}>
        <div className="flex justify-between">
            <h1 className="text-xs font-inter font-medium uppercase tracking-wide">Calculate your gwa:</h1>
            <MdDelete onClick={deleteInput} className="hover:cursor-pointer hover:scale-110 transition-gpu duration-200 text-[#6B7280] hover:text-[#0072bc]"/> 
        </div>
    </div>
  )
}

export default GWA
