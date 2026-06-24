import { useState, useEffect } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";
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

  // COURSE GWA LOGIC
  function courseGWA(){
    if(!prelim || !midterm || !prefinal || !finals){
      return {percentage: "--", scale: "0.0", remark: "REMARK", color: "border-[#ECEDF1]"}
    }

    let p = parseFloat(prelim)|| 0;
    let m = parseFloat(midterm)|| 0;
    let pf = parseFloat(prefinal)|| 0;
    let f = parseFloat(finals)|| 0;

    if (p > 100 || p < 0) p = 100;
    if (m > 100 || m < 0) m = 100;
    if (pf > 100 || pf < 0) pf = 100;
    if (f > 100 || f < 0) f = 100;

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

  // OVERALL GWA LOGIC

  const initialCourses= [
    { id: 1, name: 'Course 1', finalGrade: '', units: '' },
    { id: 2, name: 'Course 2', finalGrade: '', units: '' },
    { id: 3, name: 'Course 3', finalGrade: '', units: '' },
  ];
  
  const [courses, setCourses] = useState(initialCourses);
  const [overallGWA, setOverallGWA] = useState(null);
  
  function updateCourseField(id, field, value) {
    setCourses((prev) => prev.map((course) => course.id === id ? { ...course, [field]: value } : course
    ));
  }

  const deleteCourse = (id) => {
    if (courses.length <= 1) return;
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  const addCourse = () => {
    setCourses((prev) => {
      const maxId = prev.length > 0 ? Math.max(...prev.map(c => c.id)) : 3;
      const nextId = maxId + 1;

      return [
        ...prev,
        { id: nextId, name: `Course ${nextId}`, finalGrade: '', units: '' },
      ]
    });
  };
  
  function calculateOverallGWA(){
    let totalGradePoints = 0;
    let totalUnits = 0;
    let allInputsValid = true;
    
    courses.forEach((course) => {
      const grade = parseFloat(course.finalGrade);
      const units = parseFloat(course.units);

      if(isNaN(grade) || isNaN(units) || units <= 0){
        return;
      }else{
        totalGradePoints += grade * units;
        totalUnits += units;
      };
    });

    if(!allInputsValid || totalUnits === 0){
      allInputsValid = false;
      return;
    }

    const finalGWA = totalGradePoints / totalUnits;
    setOverallGWA(finalGWA.toFixed(2));
    return grade;
  };

  function clearAllCourses(){
    setCourses(initialCourses);
    setOverallGWA(null);
  }

  // PLACEHOLDER
  const gradePlaceholder = ['1.00','1.25','1.50'];
  const unitPlaceholder = '3';

  //DARK THEME
  const bgDark = activeSwitch ? 'bg-[#0d141d]' : 'bg-[#f7f9fb]';
  const navDark = activeSwitch ? 'bg-[#151c26] text-[#c1c6d7]' : 'bg-[#f7f9fb] text-[#414751]';

  //OVERALL GWA RESULT FEEDBACK
  const [admittedYear, setAdmittedYear] = useState('');

  const overallGWAResult = () => {
    const gwa = parseFloat(overallGWA);
    if(!overallGWA || !admittedYear) return '';

    const hasQualifyingGrade = courses.some(course => {
      const grade = parseFloat(course.finalGrade);
      if(isNaN(grade)) return false;

      if (admittedYear === '2024'){
        return grade > 2.25 && grade < 81.49;
      }else{
        return grade > 2.00 && grade < 86.49;
      };
    });

    const qualifiesByGWA = gwa <= 1.50 || gwa >= 91.49;

    if(qualifiesByGWA && !hasQualifyingGrade){
      return `Congrats! You're on the Dean's / President's List!`;
    }else if(qualifiesByGWA && hasQualifyingGrade){
      return `You did well, but you are not qualify for DL or PL because you have a grade below 2.00. Bawi next sem!`;
    }else{
      return `You need at least 1.50 to qualify for the Dean's / President's List.`;
    }
    return '';
  };

  
  return (
    <div className={`min-h-screen font-inter p-5 sm:p-0 text-[#242F49] ${bgDark}`}>
        <div className="max-w-2xl mx-auto space-y-6 pt-5">
          {/* HEADER */}
          <div className="flex justify-center items-center w-full relative shadow-[0_20px_50px_rgba(0,0,0,0.03)] ">
            <h1 className="text-[#004481] text-xl md:text-xl font-bold">STI GWA CALCULATOR</h1>

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
          <div className={`w-full h-auto rounded-lg flex text-xs sm:text-sm font-medium p-0.5 shadow-sm gap-1 ${navDark}`}>
            <button className= {`h-9 rounded-lg flex justify-center items-center md:text-sm whitespace-nowrap px-1 flex-1 text-[11px]
            ${activeNav==='Course GWA' ? `text-[#F5F5F5] bg-[#004481]` : 'bg-transparent text-[#414751]cursor-pointer hover:bg-[#e0e3e5]'}
            `} 
            onClick={() => setActiveNav('Course GWA')}>COURSE GWA</button>
            <button className= {`h-9 rounded-lg flex justify-center items-center md:text-sm whitespace-nowrap px-1 flex-1 text-[11px]
            ${activeNav==='GWA' ? 'text-[#F5F5F5] bg-[#004481]' : 'bg-transparent text-[#414751] cursor-pointer hover:bg-[#e0e3e5]'} `} 
            onClick={() => setActiveNav('GWA')}>OVERALL GWA</button>
            <button className= {`h-9 rounded-lg flex justify-center items-center md:text-sm whitespace-nowrap px-1 flex-[1.2] text-[11px]
            ${activeNav==='Cumulative GWA' ? 'text-[#F5F5F5] bg-[#004481]' : 'bg-transparent text-[#414751] cursor-pointer hover:bg-[#e0e3e5]'}`} 
            onClick={() => setActiveNav('Cumulative GWA')}>CUMULATIVE GWA</button>
          </div>

          {/* COURSE GRADE */}
          <section className={`${activeNav === 'Course GWA' ? 'block' : 'hidden'}`}>
              <div className={`bg-[#FEFEFE] rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-5 space-y-3`}>
              <div className="flex justify-between">
                <h1 className="text-xs font-inter font-medium uppercase tracking-wide">Enter Your Grade:</h1>
                <div className="flex gap-1 hover:cursor-pointer hover:scale-110 transition-gpu duration-200 text-[#6B7280] hover:text-[#ba1a1a]" onClick={deleteInput}>
                  <MdDelete size={15}/>
                  <h5 className="text-xs font-inter font-medium uppercase tracking-wide">CLEAR ALL</h5>
                </div> 
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
                <div className="flex justify-between w-full items-center ">
                  <div className="flex items-center gap-1 w-auto md:gap-2 whitespace-nowrap">
                    <h5 className="text-[#242F49] font-medium text-xs md:text-sm whitespace-nowrap">Final Grade:</h5>
                    <input
                    type="number"
                    value={gwaData.percentage}
                    placeholder="0.0"
                    readOnly
                    className="w-12 border-none outline-none text-shadow-mauve-900 font-semibold text-xs md:text-sm text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    ></input>
                  </div>
                  <div className="shrink-0 pl-2">
                    <h5 className={`text-[#242F49] font-medium text-xs md:text-sm`}>{gwaData.remark}</h5>
                  </div>
                </div>
                <input
                  type="number"
                  placeholder="--"
                  value={gwaData.scale}
                  readOnly
                  className="border-none outline-none text-2xl font-bold text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  ></input>
              </div>
            </div>
          </section>
          
          {/* GWA */}
          <section className={`${activeNav === 'GWA' ? 'block' : 'hidden'} font-hanken`}>
            <div className="bg-[#FEFEFE] rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-3 space-y-2 mb-5">
              <h1 className="text-xs font-inter font-medium uppercase tracking-wide">Admitted Academic Year</h1>
              <select defaultValue="" className="select w-full bg-[#FEFEFE]" onChange={(e) => setAdmittedYear(e.target.value)}>
                <option value='' disabled hidden>--Select Admitted Academic Year--</option>
                <option value='2024'>A.Y. 2024 and Earlier</option>
                <option value='2025'>A.Y. 2025-2026 Onwards</option>
              </select>
            </div>
            <div className={` bg-[#FEFEFE] rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-5 space-y-3`}>
              <div className="flex justify-between">
                <h1 className="text-xs font-inter font-medium uppercase tracking-wide">Calculate your gwa:</h1>
                <HiInformationCircle className="text-xl hover:cursor-pointer hover:scale-110 transition-gpu duration-200 text-[#6B7280] hover:text-[#0072bc]"/> 
              </div>
              <div className="flex flex-col gap-3 text-center max-h-110 overflow-hidden overflow-y-auto ">
                <table className="rounded-lg">
                  <thead className="bg-amber-300 text-[#6f5400] sticky top-0 z-10">
                    <tr className="">
                      <th className="w-[30%] text-xs md:text-sm py-3 rounded-tl-lg font-semibold">COURSE</th>
                      <th className="w-[30%] text-xs md:text-sm py-3 font-semibold">FINAL GRADE</th>
                      <th className="w-[30%] text-xs md:text-sm py-3 font-semibold">UNITS</th>
                      <th className="w-[5%] rounded-tr-lg"></th>
                    </tr>
                  </thead>
                  <tbody className={``}>
                    {courses.map((course, index) => (
                      <tr key={course.id} className="border-b border-slate-200 last:border-b-0">
                        <td className="py-2 text-xs md:text-sm font-medium">Course {index + 1}</td>
                        <td className="py-3 align-middle text-center">
                          <input 
                            type="number" 
                            placeholder={gradePlaceholder[index] || "0"}
                            value={course.finalGrade}
                            onChange={(e) =>
                              handleGradeChange(e.target.value, (value) =>
                                updateCourseField(course.id, 'finalGrade', value)
                              )
                            }
                            className="w-4/5 h-11 border border-[#c1c6d3] rounded-lg text-center placeholder:text-center placeholder:text-base placeholder:font-normal leading-11 px-0 py-0 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-[#0b4471] text-[#1c1a27] font-semibold"
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            placeholder={unitPlaceholder}
                            value={course.units}
                            onChange={(e) =>
                              handleGradeChange(e.target.value, (value) =>
                                updateCourseField(course.id, 'units', value)
                              )
                            }
                            className="w-4/5 h-11 border border-[#c1c6d3] rounded-lg text-center placeholder:text-center placeholder:text-base placeholder:font-normal leading-11 px-0 py-0 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-[#0b4471] text-[#1c1a27] font-semibold"
                          />
                        </td>
                        <td>
                          <MdDeleteOutline
                            onClick={() => {
                              if(courses.length > 1){
                                deleteCourse(course.id)
                              }
                            }}
                            className="hover:cursor-pointer hover:scale-110 transition-gpu duration-200 text-[#6B7280]/60 hover:text-[#ba1a1a]"
                            size={20}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tbody className="sticky bottom-0 z-10 bg-[#fefefe]">
                    <tr>
                      <td colSpan={4} className="p-0">
                        <div className="w-full h-[0.5px] bg-slate-200" />
                      </td>
                    </tr>
                    <tr className="hover:bg-[#fffcef]" onClick={addCourse}>
                      <td colSpan={4} className="p-4 rounded-bl-lg rounded-br-lg">
                        <button className="text-xs font-medium cursor-pointer flex gap-2 justify-center items-center">
                          <MdAddCircleOutline size={20} className="font-light"/>
                          <span className="text-xs md:text-sm font-inter font-medium uppercase tracking-wide">ADD COURSE</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="gap-3 flex">
                <button className="bg-amber-300 text-[#6f5400] w-full py-3 rounded-lg font-bold tracking-widest text-xs md:text-sm hover:bg-amber-300/80" onClick={calculateOverallGWA}>
                  CALCULATE
                </button>
                <button className="w-2/3 bg-[#e0e3e5] text-[#424851] py-3 rounded-lg font-bold tracking-widest text-xs md:text-sm hover:bg-[#d8dadc]" onClick={clearAllCourses}>CLEAR ALL</button>
              </div>
              <div className={`bg-[#ffde9c] w-full h-22 flex justify-center items-center rounded-lg ${overallGWA !== null ? 'flex' : 'hidden'}`}>
                <div className="flex flex-col items-center px-10">
                  <h1 className="text-[#614100] font-semibold tracking-widest text-xl uppercase font-hanken text-center">GWA: <span className="text-xl font-bold">{overallGWA}</span></h1>
                  <p className="text-[#614100] tracking-widest text-sm text-center">{overallGWAResult()}</p>
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
                      <tr className="hover:bg-[#fffdf5]">
                        <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l whitespace-nowrap">97.50 - 100</td>
                        <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">1.00</td>
                        <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-r">Excellent</td>
                      </tr>
                      <tr className="hover:bg-[#fffdf5]">
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l  whitespace-nowrap">94.50 - 97.49</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">1.25</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-r" >Very Good</td>
                      </tr>
                      <tr className="hover:bg-[#fffdf5]">
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l whitespace-nowrap">91.49 - 94.49</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">1.50</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-r" >Very Good</td>
                      </tr>
                      <tr className="hover:bg-[#fffdf5]">
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l whitespace-nowrap">86.50 - 91.49</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">1.75</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-r" >Very Good</td>
                      </tr>
                      <tr className="hover:bg-[#fffdf5]">
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l whitespace-nowrap"> 81.50 - 86.49</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">2.00</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-r" >Satisfactory</td>
                      </tr>
                      <tr className="hover:bg-[#fffdf5]">
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l whitespace-nowrap">76.00 - 81.49</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">2.25</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-r" >Satisfactory</td>
                      </tr>
                      <tr className="hover:bg-[#fffdf5]">
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l whitespace-nowrap">70.50 - 75.99</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">2.50</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-r" >Satisfactory</td>
                      </tr>
                      <tr className="hover:bg-[#fffdf5]">
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l whitespace-nowrap">65.00 - 70.49</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">2.75</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-r" >Fair</td>
                      </tr>
                      <tr className="hover:bg-[#fffdf5]">
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l whitespace-nowrap">59.50 - 64.99</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm text-center sm:text-left">3.00</td>
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-r" >Fair</td>
                      </tr>
                      <tr className="hover:bg-[#fffdf5]">
                          <td className="p-3 border-slate-200 border-b text-xs md:text-sm border-l whitespace-nowrap">59.49 and below</td>
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

