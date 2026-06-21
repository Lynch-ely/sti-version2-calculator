import { useState, useEffect } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import Footer from "./Footer";

export default function GWACalculator() {
  const [activeNav, setActiveNav] = useState('Course GWA');
  const [activeSwitch, setActiveSwitch] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [activeArrow, setActiveArrow] = useState(false);

  const [prelim, setPrelim] = useState('');
  const [midterm, setMidterm] = useState('');
  const [prefinal, setPrefinal] = useState('');
  const [finals, setFinals] = useState('');

  const toggleSwitch = () => {
    setActiveSwitch(!activeSwitch);
  }

  const toggleArrow = () => {
    setActiveArrow(!activeArrow);
  }

  function courseGWA(){
    if(!prelim || !midterm || !prefinal || !finals){
      return {percentage: "--", scale: "0.0", remark: "REMARK", color: "border-[#ECEDF1]"}
    }

    let p = parseFloat(prelim)|| 0;
    let m = parseFloat(midterm)|| 0;
    let pf = parseFloat(prefinal)|| 0;
    let f = parseFloat(finals)|| 0;

    if (p > 100 || p < 0) p = 100;
    if (m > 100 || p < 0) m = 100;
    if (pf > 100 || p < 0) pf = 100;
    if (f > 100 || p < 0) f = 100;

    const finalPercentage = (p * 0.2) + (m * 0.2) + (pf * 0.2) + (f * 0.4);

    let scale = "5.00";
    let remark = "Failed";
    let color = "border-[#ECEDF1]";

    if(finalPercentage >= 97.50){
      scale = "1.00";
      remark = "Excellent";
      color = "border-[#00c853]";
    }else if(finalPercentage >= 94.50){
      scale = "1.25";
      remark = "Very Good";
      color = "border-[#2979ff]";
    }else if(finalPercentage >= 91.49){
      scale = "1.50";
      remark = "Very Good";
      color = "border-[#2979ff]";
    }else if(finalPercentage >= 86.50){
      scale = "1.75";
      remark = "Very Good";
      color = "border-[#2979ff]";
    }else if(finalPercentage >= 81.50){
      scale = "2.00";
      remark = "Satisfactory";
      color = "border-[#ffe600]";
    }else if(finalPercentage >= 76.00){
      scale = "2.25";
      remark = "Satisfactory";
      color = "border-[#ffe600]";
    }else if(finalPercentage >= 70.50){
      scale = "2.50";
      remark = "Satisfactory";
      color = "border-[#ffe600]";
    }else if(finalPercentage >= 65.00){
      scale = "2.75";
      remark = "Fair";
      color = "border-[#ff9100]";
    }else if(finalPercentage >= 59.50){
      scale = "3.00";
      remark = "Fair";
      color = "border-[#ff9100]";
    }else{
      scale = "5.00";
      remark = "Failed";
      color = "border-[#ff1744]";
    }

    return {
      percentage: finalPercentage.toFixed(2),
      scale: scale,
      remark: remark,
      color: color
    };
  };

  const gwaData = courseGWA();

  const handleGradeChange = (value, setter) => {
    if (value === '') {
      setter(''); 
      return;
    }

    const numericValue = parseFloat(value);

    if (numericValue > 100 || numericValue < 0) {
      setter('100');
    } else {
      setter(value);
    }
  };

  const deleteInput = () => {
    setPrelim('');
    setMidterm('');
    setPrefinal('');
    setFinals('');
  };

  return (
    <div className={`min-h-screen font-inter ${activeSwitch ? 'bg-[#0F1117]' : 'bg-[#f7f6f6]'} p-5 sm:p-0`}>
        <div className="max-w-2xl mx-auto space-y-6 pt-10">
          {/* HEADER */}
          <div className="flex justify-center items-center w-full relative shadow-[0_20px_50px_rgba(0,0,0,0.03)] ">
            <h1 className="text-[#0072bc] text-xl md:text-xl font-bold">STI GWA CALCULATOR</h1>

            {/* TOGGLE SWITCH */}
            <div className={`absolute right-0 text-xl ${activeSwitch ? 'text-[#f5f5f5]' : 'text-black'}`}>
              <button onClick={toggleSwitch} className="cursor-pointer">
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
          <div className="w-full h-auto bg-[#fefefe] border border-[#0072bc]/10 rounded-lg grid grid-cols-3 text-xs sm:text-sm font-medium p-0.5 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
            <button className= {`h-9 rounded-lg flex justify-center items-center text-xs md:text-sm
            ${activeNav==='Course GWA' ? 'text-[#F5F5F5] bg-[#0072bc]' : 'bg-transparent text-[#6B7280] cursor-pointer'}`} 
            onClick={() => setActiveNav('Course GWA')}>COURSE GWA</button>
            <button className= {`h-9 rounded-lg flex justify-center items-center text-xs md:text-sm
            ${activeNav==='GWA' ? 'text-[#F5F5F5] bg-[#0072bc]' : 'bg-transparent text-[#6B7280] cursor-pointer'}`} 
            onClick={() => setActiveNav('GWA')}>GWA</button>
            <button className= {`h-9 rounded-lg flex justify-center items-center text-xs md:text-sm
            ${activeNav==='Cumulative GWA' ? 'text-[#F5F5F5] bg-[#0072bc]' : 'bg-transparent text-[#6B7280] cursor-pointer'}`} 
            onClick={() => setActiveNav('Cumulative GWA')}>CUMULATIVE GWA</button>
          </div>

          {/* COURSE GRADE */}
          <section className={`${activeNav === 'Course GWA' ? 'block' : 'hidden'}`}>
            <div className={` bg-[#FEFEFE] rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-5 space-y-3`}>
              <div className="flex justify-between">
                <h1 className="text-xs font-inter font-medium uppercase tracking-wide">Enter Your Grade:</h1>
                <MdDelete onClick={deleteInput} className="hover:cursor-pointer hover:scale-110 transition-gpu duration-200 text-[#6B7280] hover:text-[#0072bc]"/> 
              </div>
              <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
                <div className="flex flex-col bg-[#fefefe] rounded-lg p-3 border border-[#ECEDF1] gap-1">
                  <h5 className="text-[#242F49] font-medium text-xs md:text-sm">Prelim (20%)</h5>
                  <input
                  type="number"
                  placeholder="--"
                  value={prelim}
                  onChange={(e) => handleGradeChange(e.target.value, setPrelim)}
                  className="border-none outline-none text-xl md:text-2xl font-bold text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  ></input>
                </div>
                <div className="flex flex-col bg-[#fefefe] rounded-lg p-3 border border-[#ECEDF1] gap-1">
                  <h5 className="text-[#242F49] font-medium text-xs md:text-sm">Midterm (20%)</h5>
                  <input
                  type="number"
                  value={midterm}
                  onChange={(e) => handleGradeChange(e.target.value, setMidterm)}
                  placeholder="--"
                  className="border-none outline-none text-2xl font-bold text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  ></input>
                </div>
                <div className="flex flex-col bg-[#fefefe] rounded-lg p-3 border border-[#ECEDF1] gap-1">
                  <h5 className="text-[#242F49] font-medium text-xs md:text-sm">Prefinals (20%)</h5>
                  <input
                  type="number"
                  placeholder="--"
                  value={prefinal}
                  onChange={(e) => handleGradeChange(e.target.value, setPrefinal)}
                  className="border-none outline-none text-2xl font-bold text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  ></input>
                </div>
                <div className="flex flex-col bg-[#fefefe] rounded-lg p-3 border border-[#ECEDF1] gap-1">
                  <h5 className="text-[#242F49] font-medium text-xs md:text-sm">Finals (40%)</h5>
                  <input
                  type="number"
                  placeholder="--"
                  value={finals}
                  onChange={(e) => handleGradeChange(e.target.value, setFinals)}
                  className="border-none outline-none text-2xl font-bold text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  ></input>
                </div>
              </div>

              <div className={`flex flex-col justify-between bg-[#fefefe] rounded-lg p-3 gap-1 h-22 border-2 ${gwaData.color} w-full overflow-hidden`}>
                <div className="flex justify-between w-full items-center">
                  <div className="flex items-center gap-1 max-w-0 md:gap-2">
                    <h5 className="text-[#242F49] font-medium text-xs md:text-sm ">GWA:</h5>
                    <input
                    type="number"
                    value={gwaData.scale}
                    placeholder="0.0"
                    readOnly
                    className="border-none outline-none text-shadow-mauve-900 font-semibold text-xs md:text-sm text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    ></input>
                  </div>
                  <div className="overflow-x-auto">
                    <h5 className={`text-[#242F49] font-medium text-xs md:text-sm`}>{gwaData.remark}</h5>
                  </div>
                </div>
                <input
                  type="number"
                  placeholder="--"
                  value={gwaData.percentage}
                  readOnly
                  className="border-none outline-none text-2xl font-bold text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  ></input>
              </div>
            </div>
          </section>
          
          {/* GWA */}
          <section className={`${activeNav === 'GWA' ? 'block' : 'hidden'}`}>
            <div className={` bg-[#FEFEFE] rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-5 space-y-3`}>
              <div className="flex justify-between">
                <h1 className="text-xs font-inter font-medium uppercase tracking-wide">Calculate your gwa:</h1>
                <MdDelete onClick={deleteInput} className="hover:cursor-pointer hover:scale-110 transition-gpu duration-200 text-[#6B7280] hover:text-[#0072bc]"/> 
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-[#fefefe] rounded-lg p-3 border border-[#ECEDF1]">
                  <h5 className="text-[#242F49] font-medium text-xs md:text-sm">Prelim (20%)</h5>
                  <input
                  type="number"
                  placeholder="--"
                  className="border-none outline-none text-xl md:text-2xl font-bold text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  ></input>
                </div>
              </div>
            </div>
          </section>
          
          {/* CUMULATIVE GWA */}
          <section className={`${activeNav === 'Cumulative GWA' ? 'block' : 'hidden'}`}>
            <div className={` bg-[#FEFEFE] rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-5 space-y-3`}>
              THIS IS CUMULATIVE GWA CALCULATOR
            </div>
          </section>

          {/* GRADES EQUIVALENT */}
          <div className={`bg-[#FEFEFE] rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-5 ${activeArrow ? 'space-y-0' : 'space-y-3'}`}>
              <div className="flex justify-between">
                <h1 className="text-xs font-inter font-medium uppercase tracking-wide">GRADES EQUIVALENT</h1>
                <div className="transition-all" onClick={toggleArrow}>{activeArrow ? <FaAngleDown /> : <FaAngleUp />}</div>
              </div>
              <div className={`grid transition-all duration-300 ease-in-out ${activeArrow ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"}`}>
                <div className={`overflow-x-auto w-full border-slate-200 rounded-lg min-h-0 scrollbar-none [&::-webkit-scrollbar]:hidden ${activeArrow ? 'hidden' : 'block'}`}>
                  <table className="w-full border-none">
                    <thead>
                      <tr className="bg-[#0072bc] text-[#f5f5f5]">
                        <th className="p-3 w-1/3 text-xs md:text-sm font-semibold text-left">Grade Range</th>
                        <th className="p-3 w-1/3 text-xs md:text-sm font-semibold text-center sm:text-left">GWA</th>
                        <th className="p-3 w-1/3 text-xs md:text-sm font-semibold text-left">Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-[#fffdf5">
                        <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l">97.50 - 100</td>
                        <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">1.00</td>
                        <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-r">Excellent</td>
                      </tr>
                      <tr className="hover:bg-[#fffdf5]">
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l">94.50 - 97.49</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">1.25</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-r" >Very Good</td>
                      </tr>
                      <tr className="hover:bg-[#fffdf5]">
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l">91.49 - 94.49</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">1.50</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-r" >Very Good</td>
                      </tr>
                      <tr className="hover:bg-[#fffdf5]">
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l">86.50 - 91.49</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">1.75</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-r" >Very Good</td>
                      </tr>
                      <tr className="hover:bg-[#fffdf5]">
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l"> 81.50 - 86.49</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">2.00</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-r" >Satisfactory</td>
                      </tr>
                      <tr className="hover:bg-[#fffdf5]">
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l">76.00 - 81.49</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">2.25</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-r" >Satisfactory</td>
                      </tr>
                      <tr className="hover:bg-[#fffdf5]">
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l">70.50 - 75.99</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">2.50</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-r" >Satisfactory</td>
                      </tr>
                      <tr className="hover:bg-[#fffdf5]">
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l">65.00 - 70.49</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">2.75</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-r" >Fair</td>
                      </tr>
                      <tr className="hover:bg-[#fffdf5]">
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l">59.50 - 64.99</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">3.00</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-r" >Fair</td>
                      </tr>
                      <tr className="hover:bg-[#fffdf5]">
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l">59.49 and below</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">5.00</td>
                          <td  className="p-3 border-slate-200 border-b text-xs md:text-sm border-r">Failed </td>
                      </tr>
                    </tbody>
                    {/* <thead>
                      <tr className="bg-[#0072bc] text-[#f5f5f5]">
                        <th className="p-3 w-1/3 text-sm font-semibold text-left h-12"></th>
                        <th className="p-3 w-1/3 text-sm font-semibold text-left h-12"></th>
                        <th className="p-3 w-1/3 text-sm font-semibold text-left h-12"></th>
                      </tr>
                    </thead> */}
                </table>
                </div>
              </div>
          </div>
          <Footer></Footer>
        </div>
    </div>
  )
}

