import { useState, useEffect } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

export default function GWACalculator() {
  const [activeNav, setActiveNav] = useState('Course GWA');
  const [activeSwitch, setActiveSwitch] = useState(false);

  const toggleSwitch = () => {
    setActiveSwitch(!activeSwitch);
  }

  return (
    <div className={`min-h-screen flex justify-center font-inter ${activeSwitch ? 'bg-[#0F1117]' : 'bg-[#f7f6f6]'}`}>
        <div className="max-w-2xl w-full justify-center space-y-6">
          {/* HEADER */}
          <div className="mt-10 flex justify-center items-center w-full relative">
            <h1 className="text-[#6960F8] text-3xl font-bold">STI GWA CALCULATOR</h1>

            {/* TOGGLE SWITCH */}
            <div className={`absolute right-0 text-xl ${activeSwitch ? 'text-[#f5f5f5]' : 'text-black'}`}>
              <button onClick={toggleSwitch}>
                {activeSwitch ? <MdOutlineLightMode/> : <MdOutlineDarkMode/>}
              </button>
            </div>
          </div>

          {/* A.Y
          <div className="bg-[#FEFEFE] rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-3 space-y-2">
              <h1 className="text-xs font-inter font-medium uppercase tracking-wide">Select Admitted Academic Year</h1>
              <select className="w-full border-2 border-[#ECE9FB] rounded-lg outline-none h-10 space-y-2">
                <option>A.Y. 2022-2023 to 2023-2024</option>
                <option>A.Y. 2024-2025</option>
                <option>A.Y. 2025-2026 onwards</option>
              </select>
          </div> */}

          {/* NAV */}
          <div className="w-full h-auto bg-[#F8F6FE] border border-[#ECE9FB] rounded-lg grid grid-cols-3  text-sm font-medium p-1 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
            <button className= {` h-10 rounded-lg flex justify-center items-center  
            ${activeNav==='Course GWA' ? 'text-[#F5F5F5] bg-[#694EF1]' : 'bg-transparent text-[#6B7280]'}`} 
            onClick={() => setActiveNav('Course GWA')}>COURSE GWA</button>
            <button className= {` h-10 rounded-lg flex justify-center items-center  
            ${activeNav==='GWA' ? 'text-[#F5F5F5] bg-[#694EF1]' : 'bg-transparent text-[#6B7280]'}`} 
            onClick={() => setActiveNav('GWA')}>GWA</button>
            <button className= {` h-10 rounded-lg flex justify-center items-center  
            ${activeNav==='Cumulative GWA' ? 'text-[#F5F5F5] bg-[#694EF1]' : 'bg-transparent text-[#6B7280]'}`} 
            onClick={() => setActiveNav('Cumulative GWA')}>CUMULATIVE GWA</button>
          </div>

          {/* COURSE GRADE */}
          <section className={`${activeNav === 'Course GWA' ? 'block' : 'hidden'}`}>
            <div className={` bg-[#FEFEFE] rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-5 space-y-3`}>
            <h1 className="text-xs font-inter font-medium uppercase tracking-wide">Enter Your Grade:</h1>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col bg-[#fefefe] rounded-lg p-3 border border-[#ECEDF1] gap-1">
                  <h5 className="text-[#242F49] font-medium text-sm ">Prelim (20%)</h5>
                  <input
                  type="number"
                  placeholder="--"
                  className="border-none outline-none text-2xl font-bold text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  ></input>
                </div>
                <div className="flex flex-col bg-[#fefefe] rounded-lg p-3 border border-[#ECEDF1] gap-1">
                  <h5 className="text-[#242F49] font-medium text-sm ">Midterm (20%)</h5>
                  <input
                  type="number"
                  placeholder="--"
                  className="border-none outline-none text-2xl font-bold text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  ></input>
                </div>
                <div className="flex flex-col bg-[#fefefe] rounded-lg p-3 border border-[#ECEDF1] gap-1">
                  <h5 className="text-[#242F49] font-medium text-sm ">Prefinals (20%)</h5>
                  <input
                  type="number"
                  placeholder="--"
                  className="border-none outline-none text-2xl font-bold text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  ></input>
                </div>
                <div className="flex flex-col bg-[#fefefe] rounded-lg p-3 border border-[#ECEDF1] gap-1">
                  <h5 className="text-[#242F49] font-medium text-sm ">Finals (40%)</h5>
                  <input
                  type="number"
                  placeholder="--"
                  className="border-none outline-none text-2xl font-bold text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  ></input>
                </div>
              </div>

              <div className="flex flex-col justify-between bg-[#fefefe] rounded-lg p-3 border border-[#ECEDF1] gap-1 h-22">
                <h5 className="text-[#242F49] font-medium text-sm ">GWA:</h5>
                <input
                  type="number"
                  placeholder="--"
                  className="border-none outline-none text-2xl font-bold text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  ></input>
              </div>
            </div>
          </section>
          
          {/* GWA */}
          <section className={`${activeNav === 'GWA' ? 'block' : 'hidden'}`}>
            <div className={` bg-[#FEFEFE] rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-5 space-y-3`}>
              THIS IS GWA CALCULATOR
            </div>
          </section>
          
          {/* CUMULATIVE GWA */}
          <section className={`${activeNav === 'Cumulative GWA' ? 'block' : 'hidden'}`}>
            <div className={` bg-[#FEFEFE] rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-5 space-y-3`}>
              THIS IS CUMULATIVE GWA CALCULATOR
            </div>
          </section>

          {/* GRADES EQUIVALENT */}
          <div className="bg-[#FEFEFE] rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-5 space-y-3">
              <h1 className="text-xs font-inter font-medium uppercase tracking-wide">GRADES EQUIVALENT</h1>
              <div className="overflow-x-auto rounded-lg  w-full">
                <table className="w-full border-collapse border-none">
                  <tr className="border-2 border-blue-500">
                      <th className="text-sm font-semibold">Range</th>
                      <th className="text-sm font-semibold">Grade</th>
                      <th className="text-sm font-semibold">Remark</th>
                  </tr>
                  <tr className="">
                      <td className="p-8 text-left text-sm ">97.50 - 100</td>
                      <td className="p-8 text-left text-sm ">1.00</td>
                      <td className="p-8 text-left text-sm ">Excellent</td>
                  </tr>
                  <tr>
                      <td className="p-8 text-left text-sm ">94.50 - 97.49</td>
                      <td className="p-8 text-left text-sm ">1.25</td>
                      <td className="p-8 text-left text-sm " >Very Good</td>
                  </tr>
                  <tr>
                      <td className="p-8 text-left text-sm ">91.50 - 94.49</td>
                      <td className="p-8 text-left text-sm ">1.50</td>
                      <td className="p-8 text-lp-8 text-left text-sm " >Very Good</td>
                  </tr>
                  <tr>
                      <td className="p-8 text-left text-sm ">86.50 - 91.49</td>
                      <td className="p-8 text-left text-sm ">1.75</td>
                      <td className="p-8 text-left text-sm " >Very Good</td>
                  </tr>
                  <tr>
                      <td className="p-8 text-left text-sm "> 81.50 - 86.49</td>
                      <td className="p-8 text-left text-sm ">2.00</td>
                      <td className="p-8 text-left text-sm " >Satisfactory</td>
                  </tr>
                  <tr>
                      <td className="p-8 text-left text-sm ">76.00 - 81.49</td>
                      <td className="p-8 text-left text-sm ">2.25</td>
                      <td className="p-8 text-left text-sm " >Satisfactory</td>
                  </tr>
                  <tr>
                      <td className="p-8 text-left text-sm ">70.50 - 75.99</td>
                      <td className="p-8 text-left text-sm ">2.50</td>
                      <td className="p-8 text-left text-sm " >Satisfactory</td>
                  </tr>
                  <tr>
                      <td className="p-8 text-left text-sm ">65.00 - 70.49</td>
                      <td className="p-8 text-left text-sm ">2.75</td>
                      <td className="p-8 text-left text-sm " >Fair</td>
                  </tr>
                  <tr>
                      <td className="p-8 text-left text-sm ">59.50 - 64.99</td>
                      <td className="p-8 text-left text-sm ">3.00</td>
                      <td className="p-8 text-left text-sm " >Fair</td>
                  </tr>
                  <tr>
                      <td className="p-8 text-left text-sm ">Below 59.49</td>
                      <td className="p-8 text-left text-sm ">5.00</td>
                      <td  className="p-8 text-left text-sm ">Failed </td>
                  </tr>
              </table>
              </div>
          </div>
        </div>
    </div>
  )
}

