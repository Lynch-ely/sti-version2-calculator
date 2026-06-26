import { useState, useEffect, useActionState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import confetti from "canvas-confetti";
import Footer from "./Footer";

export default function GWACalculator() {
  const [activeNav, setActiveNav] = useState('Course GWA');
  const [activeSwitch, setActiveSwitch] = useState(false);
  const [activeArrow, setActiveArrow] = useState(false);

  const [prelim, setPrelim] = useState('');
  const [midterm, setMidterm] = useState('');
  const [prefinal, setPrefinal] = useState('');
  const [finals, setFinals] = useState('');

  // PLACEHOLDER
  const gradePlaceholder = ['1.00','1.25','1.50'];
  const gwaPlaceholder = ['1.00','1.25','1.50', '1.75'];
  const unitPlaceholder = '3';

  // LIGHT/DARK MODE SWITCH
  const toggleSwitch = () => {
    setActiveSwitch(!activeSwitch);
  }

  // TOGGLE ARROW FOR GRADE EQUIVALENT
  const toggleArrow = () => {
    setActiveArrow(!activeArrow);
  }

  // -------COURSE GWA CALCULATION---------
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

  // OVERALL COURSES
  const initialCourses= [
    { id: 1, name: 'Course 1', finalGrade: '', units: '' },
    { id: 2, name: 'Course 2', finalGrade: '', units: '' },
    { id: 3, name: 'Course 3', finalGrade: '', units: '' },
  ];
  
  const [courses, setCourses] = useState(initialCourses);
  const [overallGWA, setOverallGWA] = useState(null);
  const [admittedYear, setAdmittedYear] = useState('');
  const [gwaFeedback, setGWAFeedback] = useState('');
  const [hasCalculationError, setHasCalculationError] = useState(false);
  
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
  

  // -------OVERALL GWA CALCULATION---------
  function calculateOverallGWA(){
    if(!admittedYear){
      setOverallGWA(null);
      setGWAFeedback('');
      setHasCalculationError(true);
      return;
    }

    setHasCalculationError(false);

    let totalGradePoints = 0;
    let totalUnits = 0;
    let hasValidCourses = false;

    courses.forEach((course) => {
      const grade = parseFloat(course.finalGrade);
      const units = parseFloat(course.units);

      if(isNaN(grade) || isNaN(units) || units <= 0){
        return;
      }else{
        totalGradePoints += grade * units;
        totalUnits += units;
        hasValidCourses = true;
      };
    });

    if(!hasValidCourses || totalUnits === 0){
      setOverallGWA(null);
      setGWAFeedback('');
      return;
    }

    const finalGWA = totalGradePoints / totalUnits;
    setOverallGWA(finalGWA.toFixed(2));
    
    const hasQualifyingGrade = courses.some(course => {
      const grade = parseFloat(course.finalGrade);
      if(isNaN(grade)) return false;

      if (admittedYear === '2024'){
        return grade > 2.25 && grade < 81.49;
      }else{
        return grade > 2.00 && grade < 86.49;
      };
    });

    const qualifiesByGWA = finalGWA <= 1.50 || finalGWA >= 91.49;

    let feedbackText = '';

    if(qualifiesByGWA && !hasQualifyingGrade){
      feedbackText = `Congrats! You're on the Dean's / President's List!`;
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }else if(qualifiesByGWA && hasQualifyingGrade){
      feedbackText = `You did well, but you are not qualify for DL/PL because you have a grade below ${admittedYear === '2024' ? '2.25' : '2.00'}. Bawi next sem!`;
    }else{
      feedbackText = `You need at least 1.50 to qualify for the Dean's / President's List.`;
    }

    setGWAFeedback(feedbackText);
  };

  // GWA CLEAR ALL
  function clearAllCourses(){
    setCourses(initialCourses);
    setOverallGWA(null);
  }
  
  // -------CUMULATIVE GWA CALCULATION---------
  const initialSemesters= [
    { id: 1, name: 'Course 1', gradeGWA: ''},
    { id: 2, name: 'Course 2', gradeGWA: ''},
    { id: 3, name: 'Course 3', gradeGWA: ''},
    { id: 4, name: 'Course 4', gradeGWA: ''},
  ];

  const [semesters, setSemesters] = useState(initialSemesters);
  const [cumulativeGWA, setCumulativeGWA] = useState(null);
  const [cumulativeAdmittedYear, setCumulativeAdmittedYear] = useState('');
  const [cumulativeFeedback, setCumulativeFeedback] = useState('');
  const [hasError, setHasError] = useState(false);
  
  function updateSemestersField(id, field, value) {
    setSemesters((prev) => prev.map((sem) => sem.id === id ? { ...sem, [field]: value } : sem
    ));
  }

  const addSemesters = () => {
    setSemesters((prev) => {
      const maxId = prev.length > 0 ? Math.max(...prev.map(c => c.id)) : 4;
      const nextId = maxId + 1;

      return [
        ...prev,
        { id: nextId, name: `Semester ${nextId}`, gradeGWA: ''},
      ]
    });
  };

  const deleteSemester = (id) => {
    if (semesters.length <= 1) return;
    setSemesters((prev) => prev.filter((sem) => sem.id !== id));
  };

  function calculateCumulativeGWA(){
    if(!cumulativeAdmittedYear){
      setCumulativeGWA(null);
      setCumulativeFeedback('');
      setHasError(true);
      return;
    }

    setHasError(false);

    let semGWATotal = 0;
    let counter = 0;
    let hasValidSemesters = false;

    semesters.forEach((sem) => {
      const semGWAGrade = parseFloat(sem.gradeGWA);

      if(!isNaN(semGWAGrade)){
        semGWATotal += semGWAGrade;
        counter++;
        hasValidSemesters = true;
      };
    });

    if (!hasValidSemesters || counter === 0) {
      setCumulativeGWA(null);
      setCumulativeFeedback('');
      return;
    }

    const runningGWA = semGWATotal / counter;
    const truncatedGWA = (Math.floor(runningGWA * 100) /100).toFixed(2);
    setCumulativeGWA(truncatedGWA);

    const hasQualifiedGrade = semesters.some(sem => {
      const grade = parseFloat(sem.gradeGWA);
      if(isNaN(grade)) return false;
      
      if (cumulativeAdmittedYear === '2022'){
        return grade > 2.25 && grade < 82.50;
      }else if(cumulativeAdmittedYear === '2024'){
        return grade > 2.25 && grade < 81.50;
      }else if(cumulativeAdmittedYear === '2025'){
        return grade > 2.00 && grade < 81.50;
      }
      return false;
    });

    const qualifiesByGWA = runningGWA <= 1.50 || runningGWA >= 91.49;
    let feedbackText = '';

    if(qualifiesByGWA && !hasQualifiedGrade){
      
      if (runningGWA <= 1.10) {
        feedbackText = `Congrats SUMMA CUM LAUDE!`;
      } else if (runningGWA <= 1.30) {
        feedbackText = `Congrats MAGNA CUM LAUDE!`;
      } else if (runningGWA <= 1.50) {
        feedbackText = `Congrats CUM LAUDE!`;
      }

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }else if(qualifiesByGWA && hasQualifiedGrade){
      feedbackText = `You did well, but you are not qualify for Latin Honors because you have a grade below ${admittedYear === '2025' ? '2.00' : '2.25'}. Still, Congrats!`;
    }else{
      feedbackText = `You need at least ${admittedYear === '2025' ? '2.00' : '2.25'} to qualify for Latin Honors.`;
    }
    setCumulativeFeedback(feedbackText);
  }

  // CUMULATIVE GWA CLEAR ALL
  function clearAllSemesters(){
    setSemesters(initialSemesters);
    setCumulativeGWA(null);
  }

  // LIGHT MODE AND DARK MODE
  const theme = activeSwitch ? 
  {
    // DARK MODE
    bg: 'bg-[#0B1220]',
    card: 'bg-[#151D2A]',
    header: 'text-[#60A5FA]',
    lm: 'text-[#F8FAFC]',
    navCard: 'bg-[#151D2A] text-[#CBD5E1]',
    text: 'text-[#F8FAFC]',
    courseGWAText: 'text-[#F8FAFC]',
    trHeadBlue: 'bg-[#2563EB] text-[#F8FAFC]',
    trHeadYellow: 'bg-[#ebcb25] text-[#4A3200]',
    // trHeadYellow: 'bg-[#7C4A03] text-[#FDE68A]',
    // trHeadYellow: 'bg-[#ffe600] text-[#FDE68A]', - SAME W REMARK
    // trHeadYellow: 'bg-[#A16207] text-[#FFFBEB]',
    tableHover: 'hover:bg-[#1E293B]',
    clearText: 'text-[#94A3B8]',
    clearButton: 'bg-[#1E293B] text-[#E2E8F0] hover:bg-[#273449] cursor-pointer',
    deleteSection: 'text-[#64748B] hover:text-[#EF4444]',
    border: 'border border-[#283548] focus:border-[#3B82F6]',
    borderDivision: 'border-[#283548]',
    infoIcon: 'text-[#94A3B8] hover:text-[#60A5FA]',
    add: 'bg-[#283548]',
    navActive: 'bg-[#2563EB] text-[#F8FAFC]',
    navInactive: 'text-[#94A3B8]',
    navHover: 'hover:bg-[#1E293B]',
    placeholder: "placeholder:text-[#94A3B8]",
    calculateHover: 'hover:bg-[#7C4A03]/80',
    ring: 'border-[#ff1744] ring-2 ring-[#ff1744]/20',
    // fb: 'bg-[#201C11] border border-[#D4AF37]/40 text-[#FDE68A]',
    fb: 'bg-[#1E293B]/50 backdrop-blur-lg border border-[#ebcb25]/80 text-[#FEF3C7] shadow-md shadow-yellow-500/10',
    // fb: 'bg-[#EBCB25]/10 backdrop-blur-md border border-[#EBCB25]/30 text-[#FEF3C7]',
    footerText: 'text-[#f5f5f5]',
    overlay: 'bg-[#020817]/80 backdrop-blur-sm',
    overlayHeader: 'text-[#F8FAFC]',
    overlayTitle: 'text-[#F8FAFC]',
    overlaySubtitle: 'text-[#94A3B8]',   
    overlayText: 'text-[#F8FAFC]', 
    overlayClose: 'text-[#94A3B8] hover:text-[#F8FAFC]',
    overlayNumber: 'bg-[#2563EB] text-[#F8FAFC]',
  }
  :
  {
    // LIGHT MODE
    bg: 'bg-[#f7f9fb]',
    card: 'bg-[#FEFEFE]',
    header: 'text-[#004481]',
    lm: 'text-[#f5f5f5]',
    navCard: 'bg-[#f7f9fb] text-[#414751]',
    text: 'text-[#242F49]',
    trHeadBlue: 'bg-[#0072bc] text-[#f5f5f5]',
    trHeadYellow: 'bg-amber-300 text-[#6f5400]',
    tableHover: 'hover:bg-[#fffdf5]',
    clearText: 'text-[#6B7280]',
    clearButton: 'bg-[#e0e3e5] text-[#424851] cursor-pointer',
    deleteSection: 'text-[#6B7280]/60 hover:text-[#ba1a1a]',
    border: 'border border-slate-200 focus:border-[#0b4471]',
    borderDivision:'border-slate-200',
    courseGWAText: 'text-[#242F49]',
    infoIcon: 'text-[#6B7280] hover:text-[#0072bc]',
    // navActive: 'bg-[#004481] text-[#F8FAFC]',
    navActive: 'bg-[#0072bc] text-[#f5f5f5]',
    navInactive: 'text-[#414751]',
    navHover: 'hover:bg-[#E5E7EB]',
    placeholder: 'placeholder:text-[#9CA3AF]',
    calculateHover: 'hover:bg-amber-300/80',
    ring: 'border-[#ff1744] ring-2 ring-[#ffb4c3]',
    fb: 'bg-[#FFF8DC] border border-[#EAB308] text-[#6B4F00]',
    footerText: 'text-[#0072bc]',
    overlay: 'bg-[#0F172A]/40 backdrop-blur-sm',
    overlayHeader: 'text-[#004481]',    
    overlayTitle: 'text-[#1E293B]',            
    overlaySubtitle: 'text-[#475569]',         
    overlayText: 'text-[#FFFFFF]',                
    overlayClose: 'text-[#6B7280] hover:text-[#242F49]',
    overlayNumber: 'bg-[#0072bc] text-[#f5f5f5]',
  };

  const [isGWAModalOpen, setIsGWAModalOpen] = useState(false);

  const toggleGWAModal = () => {
    setIsGWAModalOpen(!isGWAModalOpen);
  }

  const [isCumulativeModalOpen, setIsCumulativeGWAModalOpen] = useState(false);

  const toggleCumulativeModal = () => {
    setIsCumulativeGWAModalOpen(!isCumulativeModalOpen);
  }
 
  return (
    <div className={`min-h-screen font-inter p-5 sm:p-0 ${theme.text} ${theme.bg} transition-all ease-in-out duration-300`}>
        <div className="max-w-2xl mx-auto space-y-3 md:space-y-6 md:pt-10">
          {/* HEADER */}
          <div className="flex justify-center items-center w-full relative shadow-[0_20px_50px_rgba(0,0,0,0.03)] ">
            <h1 className="text-xl md:text-xl font-bold">STI GWA CALCULATOR</h1>

            {/* TOGGLE SWITCH */}
            <div className={`absolute right-0 text-xl ${activeSwitch ? '' : 'text-black'}`}>
              <button onClick={toggleSwitch} className={`cursor-pointer`}>
                {activeSwitch ? <MdOutlineLightMode/> : <MdOutlineDarkMode/>}
              </button>
            </div>
          </div>
          
          {/* NAV */}
          <div className={`w-full h-auto rounded-lg flex text-xs sm:text-sm font-medium p-0.5 shadow-sm gap-1 ${theme.navCard}`}>
            <button className= {`h-9 rounded-lg flex justify-center items-center md:text-sm whitespace-nowrap px-1 flex-1 text-[11px]
            ${activeNav==='Course GWA' ? theme.navActive : `${theme.navInactive} ${theme.navHover}`}`} 
            onClick={() => setActiveNav('Course GWA')}>COURSE GWA</button>
            <button className= {`h-9 rounded-lg flex justify-center items-center md:text-sm whitespace-nowrap px-1 flex-1 text-[11px]
            ${activeNav==='GWA' ? theme.navActive : `${theme.navInactive} ${theme.navHover}`}`} 
            onClick={() => setActiveNav('GWA')}>SEMESTER GWA</button>
            <button className= {`h-9 rounded-lg flex justify-center items-center md:text-sm whitespace-nowrap px-1 flex-[1.2] text-[11px]
            ${activeNav==='Cumulative GWA' ? theme.navActive : `${theme.navInactive} ${theme.navHover}`}`}  
            onClick={() => setActiveNav('Cumulative GWA')}>CUMULATIVE GWA</button>
          </div>

          {/* COURSE GRADE */}
          <section className={`${activeNav === 'Course GWA' ? 'block' : 'hidden'}`}>
              <div className={`rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-5 space-y-3 ${theme.card}`}>
              <div className="flex justify-between">
                <h1 className="text-xs font-inter font-medium uppercase tracking-wide">Enter Your Grade:</h1>
                <div className={`flex gap-1 hover:cursor-pointer hover:scale-110 transition-gpu duration-200 hover:text-[#ba1a1a] ${theme.clearText}`} onClick={deleteInput}>
                  <MdDelete size={15}/>
                  <h5 className="text-xs font-inter font-medium uppercase tracking-wide">CLEAR ALL</h5>
                </div> 
              </div>
              <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
                <div className={`flex flex-col rounded-lg p-3 border gap-x-11 ${theme.borderDivision}`}>
                  <h5 className={`font-medium text-xs md:text-sm ${theme.courseGWAText}`}>Prelim (20%)</h5>
                  <input
                  type="number"
                  placeholder="--"
                  value={prelim}
                  onChange={(e) => handleGradeChange(e.target.value, setPrelim)}
                  className={`border-none outline-none text-xl md:text-2xl font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${theme.border} ${theme.placeholder}`}
                  ></input>
                </div>
                <div className={`flex flex-col rounded-lg p-3 border gap-1 ${theme.borderDivision}`}>
                  <h5 className={`font-medium text-xs md:text-sm ${theme.courseGWAText}`}>Midterm (20%)</h5>
                  <input
                  type="number"
                  value={midterm}
                  onChange={(e) => handleGradeChange(e.target.value, setMidterm)}
                  placeholder="--"
                  className={`border-none outline-none text-xl md:text-2xl font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${theme.border} ${theme.placeholder}`}
                  ></input>
                </div>
                <div className={`flex flex-col rounded-lg p-3 border gap-1 ${theme.borderDivision}`}>
                  <h5 className={`font-medium text-xs md:text-sm ${theme.courseGWAText}`}>Pre-Final (20%)</h5>
                  <input
                  type="number"
                  placeholder="--"
                  value={prefinal}
                  onChange={(e) => handleGradeChange(e.target.value, setPrefinal)}
                  className={`border-none outline-none text-xl md:text-2xl font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${theme.border} ${theme.placeholder}`}
                  ></input>
                </div>
                <div className={`flex flex-col rounded-lg p-3 border gap-1 ${theme.borderDivision}`}>
                  <h5 className={`font-medium text-xs md:text-sm ${theme.courseGWAText}`}>Finals (40%)</h5>
                  <input
                  type="number"
                  placeholder="--"
                  value={finals}
                  onChange={(e) => handleGradeChange(e.target.value, setFinals)}
                  className={`border-none outline-none text-xl md:text-2xl font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${theme.border} ${theme.placeholder}`}
                  ></input>
                </div>
              </div>

              <div className={`flex flex-col justify-between rounded-lg p-3 gap-1 h-22 border ${gwaData.color} w-full overflow-hidden`}>
                <div className={`flex justify-between w-full items-center ${theme.courseGWAText}`}>
                  <div className="flex items-center gap-1 w-auto md:gap-2 whitespace-nowrap">
                    <h5 className={`font-medium text-xs md:text-sm whitespace-nowrap ${theme.courseGWAText}`}>Final Grade:</h5>
                    <input
                    type="text"
                    value={gwaData.percentage}
                    placeholder="0.0"
                    readOnly
                    className={`w-12 border-none outline-none font-semibold text-xs md:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${theme.placeholder}`}
                    ></input>
                  </div>
                  <div className="shrink-0 pl-2">
                    <h5 className={`text-[#242F49] font-medium text-xs md:text-sm ${theme.courseGWAText}`}>{gwaData.remark}</h5>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="--"
                  value={gwaData.scale}
                  readOnly
                  className={`border-none outline-none text-2xl font-bold text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${theme.courseGWAText}`}
                  ></input>
              </div>
            </div>
          </section>
          
          {/* SEMESTER GWA */}
          <section className={`${activeNav === 'GWA' ? 'block' : 'hidden'} font-hanken`}>
            <div className={`rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-3 space-y-2 md:mb-5 ${theme.card}`}>
              <h1 className="text-xs font-inter font-medium uppercase tracking-wide">Admission Academic Year</h1>
              <select defaultValue="" className={`select w-full border focus:outline-none ${theme.card} ${hasCalculationError ? `${theme.ring}` : `${theme.borderDivision}`}`} 
              onChange={(e) => {
              setAdmittedYear(e.target.value);
              setHasCalculationError(false);
              }}>
                <option value='' disabled hidden>--Select Admission Year--</option> 
                <option value='2024'>A.Y. 2024 and Earlier</option>
                <option value='2025'>A.Y. 2025-2026 Onwards</option>
              </select>
            </div>
            <div className={`${theme.card} rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-5 space-y-3 mt-3`}>
              <div className="flex justify-between">
                <h1 className="text-xs font-inter font-medium uppercase tracking-wide">Calculate your gwa:</h1>
                <HiInformationCircle className={`text-xl hover:cursor-pointer hover:scale-110 transition-gpu duration-200 ${theme.infoIcon}`} onClick={toggleGWAModal} /> 
              </div>
              <div className="flex flex-col gap-3 text-center max-h-77 md:max-h-110 overflow-hidden overflow-y-auto ">
                <table className="rounded-lg">
                  <thead className="sticky top-0 z-10">
                    <tr className={`${theme.trHeadYellow}`}>
                      <th className="w-[30%] text-xs md:text-sm py-3 rounded-tl-lg font-semibold">COURSE</th>
                      <th className="w-[30%] text-xs md:text-sm py-3 font-semibold">FINAL GRADE</th>
                      <th className="w-[30%] text-xs md:text-sm py-3 font-semibold">UNITS</th>
                      <th className="w-[5%] rounded-tr-lg"></th>
                    </tr>
                  </thead>
                  <tbody className={``}>
                    {courses.map((course, index) => (
                      <tr key={course.id} className={`border-b last:border-b-0 ${theme.borderDivision}`}>
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
                            className={`w-4/5 h-11 border rounded-lg text-center placeholder:text-center placeholder:text-base placeholder:font-normal leading-11 px-0 py-0 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none font-semibold ${theme.border}`}
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
                            className={`w-4/5 h-11 border rounded-lg text-center placeholder:text-center placeholder:text-base placeholder:font-normal leading-11 px-0 py-0 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none font-semibold ${theme.border}`}
                          />
                        </td>
                        <td className="pr-2 md:md:pr-0">
                          <MdDeleteOutline
                            onClick={() => {
                              if(courses.length > 1){
                                deleteCourse(course.id)
                              }
                            }}
                            className={`hover:cursor-pointer hover:scale-110 transition-gpu duration-200 ${theme.deleteSection}`}
                            size={20}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tbody className={`sticky bottom-0 z-10 ${theme.card}`}>
                    <tr>
                      <td colSpan={4} className="p-0">
                        <div className={`w-full h-[0.5px] ${theme.add}`} />
                      </td>
                    </tr>
                    <tr className={`${theme.tableHover}`} onClick={addCourse}>
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
              <div className="gap-3 flex ">
                <button className= {`w-full py-3 rounded-lg font-bold tracking-widest text-xs md:text-sm cursor-pointer ${theme.trHeadYellow} hover:bg-[#D4B61B] ${theme.calculateHover}`} onClick={calculateOverallGWA}>
                  CALCULATE
                </button>
                <button className={`w-2/3 py-3 rounded-lg font-bold tracking-widest text-xs md:text-sm ${theme.clearButton}`} onClick={clearAllCourses}>CLEAR ALL</button>
              </div>
              <div className={`${theme.fb} w-full h-18 md:h-22 flex justify-center items-center rounded-lg md:px-10 ${overallGWA !== null ? 'flex' : 'hidden'}`}>
                <div className="flex flex-col items-center px-0">
                  <h1 className="font-semibold tracking-widest text-sm md:text-lg uppercase font-hanken text-center">GWA: <span className="text-sm md:text-lg font-bold">{overallGWA}</span></h1>
                  <p className="tracking-widest text-[9px] md:text-sm text-center">{gwaFeedback}</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* CUMULATIVE GWA */}
          <section className={`${activeNav === 'Cumulative GWA' ? 'block' : 'hidden'} font-hanken`}>
            <div className={`rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-3 space-y-2 md:mb-5 ${theme.card}`}>
              <h1 className="text-xs font-inter font-medium uppercase tracking-wide">Admission Academic Year</h1>
              <select defaultValue="" className={`select w-full border focus:outline-none ${theme.card} ${hasError ? `${theme.ring}` : `${theme.borderDivision}`}`} onChange={(e) => setCumulativeAdmittedYear(e.target.value)}>
                <option value='' disabled hidden>--Select Admission Year--</option> 
                <option value='2022'>A.Y. 2022-2023 and 2023-2024</option>
                <option value='2024'>A.Y. 2024-2025</option>
                <option value='2025'>A.Y. 2025-2026 Onwards</option>
              </select>
            </div>
            <div className={` ${theme.card} rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-5 space-y-3 mt-3`}>
              <div className="flex justify-between">
                <h1 className="text-xs font-inter font-medium uppercase tracking-wide">Calculate your cumulative gwa:</h1>
                <HiInformationCircle className={`text-xl hover:cursor-pointer hover:scale-110 transition-gpu duration-200 ${theme.infoIcon}`} onClick={toggleCumulativeModal} /> 
              </div>
              <div className="flex flex-col gap-3 text-center max-h-95 md:max-h-110 overflow-hidden overflow-y-auto">
                <table className="rounded-lg">
                  <thead className="sticky top-0 z-10">
                    <tr className={`${theme.trHeadYellow}`}>
                      <th className="px-3 whitespace-nowrap text-xs md:text-sm py-3 rounded-tl-lg font-semibold">SEMESTER / TERM</th>
                      <th className="px-3 whitespace-nowrap text-xs md:text-sm py-3 font-semibold">SEMESTER GWA</th>
                      <th className="px-3 rounded-tr-lg"></th>
                    </tr>
                  </thead>
                  <tbody className={``}>
                    {semesters.map((sem, index) => (
                      <tr key={sem.id} className={`border-b last:border-b-0 ${theme.borderDivision}`}>
                        <td className="py-2 text-xs md:text-sm font-medium">Semester {index + 1}</td>
                        <td className={`py-3 align-middle text-center`}>
                          <input 
                            type="number" 
                            placeholder={gwaPlaceholder[index] || "0"}
                            value={sem.gradeGWA}
                            onChange={(e) =>
                              handleGradeChange(e.target.value, (value) =>
                                updateSemestersField(sem.id, 'gradeGWA', value)
                              )
                            }
                            className={`w-4/5 h-11 border rounded-lg text-center placeholder:text-center placeholder:text-base placeholder:font-normal leading-11 px-0 py-0 outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none font-semibold ${theme.border} `}
                          />
                        </td>
                        <td className="pr-3 md:md:pr-0">
                          <MdDeleteOutline
                            onClick={() => {
                              if(semesters.length > 1){
                                deleteSemester(sem.id)
                              }
                            }}
                            className={`hover:cursor-pointer hover:scale-110 transition-gpu duration-200 ${theme.deleteSection}`}
                            size={20}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tbody className={`sticky bottom-0 z-10 ${theme.card} ${theme.tableHover}`}>
                    <tr>
                      <td colSpan={4} className="p-0">
                        <div className={`w-full h-[0.5px] ${theme.add}`} />
                      </td>
                    </tr>
                    <tr className={`${theme.tableHover}`} onClick={addSemesters}>
                      <td colSpan={4} className="p-4 rounded-bl-lg rounded-br-lg">
                        <button className="text-xs font-medium cursor-pointer flex gap-2 justify-center items-center">
                          <MdAddCircleOutline size={20} className="font-light"/>
                          <span className="text-xs md:text-sm font-inter font-medium uppercase tracking-wide">ADD SEMESTER</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="gap-3 flex ">
                <button className={`w-full py-3 rounded-lg font-bold tracking-widest text-xs md:text-sm cursor-pointer ${theme.trHeadYellow} hover:bg-[#D4B61B] ${theme.calculateHover}`} onClick={calculateCumulativeGWA}>
                  CALCULATE
                </button>
                <button className={`w-2/3 py-3 rounded-lg font-bold tracking-widest text-xs md:text-sm ${theme.clearButton}`} onClick={clearAllSemesters}>CLEAR ALL</button>
              </div>
              <div className={`${theme.fb} w-full h-18 md:h-22 flex justify-center items-center rounded-lg md:px-10 ${cumulativeGWA !== null ? 'flex' : 'hidden'}`}>
                <div className={`flex flex-col items-center px-0`}>
                  <h1 className="font-semibold tracking-widest text-sm md:text-lg uppercase font-hanken text-center">GWA: <span className="text-sm md:text-lg font-bold">{cumulativeGWA}</span></h1>
                  <p className="tracking-widest text-[9px] md:text-sm text-center">{cumulativeFeedback}</p>
                </div>
              </div>
            </div>
          </section>

          {/* GRADES EQUIVALENT */}
          <div className={`rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-5 ${theme.card} ${activeArrow ? 'space-y-0' : 'space-y-3'}`}>
              <div className="flex justify-between">
                <h1 className="text-xs font-inter font-medium uppercase tracking-wide">GRADES EQUIVALENT</h1>
                <div className="transition-all" onClick={toggleArrow}>{activeArrow ? <FaAngleDown /> : <FaAngleUp />}</div>
              </div>
              <div className={`grid transition-all duration-300 ease-in-out ${activeArrow ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"}`}>
                <div className={`overflow-x-auto w-full border-slate-200 rounded-lg min-h-0 scrollbar-none [&::-webkit-scrollbar]:hidden ${activeArrow ? 'hidden' : 'block'}`}>
                  <table className="w-full border-none">
                    <thead>
                      <tr className={`${theme.trHeadBlue}`}>
                        <th className="p-3 w-1/3 text-xs md:text-sm font-semibold text-left">Grade Range</th>
                        <th className="p-3 w-1/3 text-xs md:text-sm font-semibold text-center sm:text-left">GWA</th>
                        <th className="p-3 w-1/3 text-xs md:text-sm font-semibold text-left">Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={`${theme.tableHover}`}>
                        <td className={`p-3 text-xs md:text-sm border-l whitespace-nowrap border-b ${theme.borderDivision}`}>97.50 - 100</td>
                        <td className={`p-3 text-xs md:text-sm text-center sm:text-left border-b ${theme.borderDivision}`}>1.00</td>
                        <td className={`p-3 text-xs md:text-sm border-r border-b ${theme.borderDivision}`}>Excellent</td>
                      </tr>
                      <tr className={`${theme.tableHover}`}>
                          <td className={`p-3 text-xs md:text-sm border-l whitespace-nowrap border-b ${theme.borderDivision}`}>94.50 - 97.49</td>
                          <td className={`p-3 text-xs md:text-sm text-center sm:text-left border-b ${theme.borderDivision}`}>1.25</td>
                          <td className={`p-3 text-xs md:text-sm border-r border-b ${theme.borderDivision}`}>Very Good</td>
                      </tr>
                      <tr className={`${theme.tableHover}`}>
                          <td className={`p-3 text-xs md:text-sm border-l whitespace-nowrap border-b ${theme.borderDivision}`}>91.49 - 94.49</td>
                          <td className={`p-3 text-xs md:text-sm text-center sm:text-left border-b ${theme.borderDivision}`}>1.50</td>
                          <td className={`p-3 text-xs md:text-sm border-r border-b ${theme.borderDivision}`}>Very Good</td>
                      </tr>
                      <tr className={`${theme.tableHover}`}>
                          <td className={`p-3 text-xs md:text-sm border-l whitespace-nowrap border-b ${theme.borderDivision}`}>86.50 - 91.49</td>
                          <td className={`p-3 text-xs md:text-sm text-center sm:text-left border-b ${theme.borderDivision}`}>1.75</td>
                          <td className={`p-3 text-xs md:text-sm border-r border-b ${theme.borderDivision}`}>Very Good</td>
                      </tr>
                      <tr className={`${theme.tableHover}`}>
                          <td className={`p-3 text-xs md:text-sm border-l whitespace-nowrap border-b ${theme.borderDivision}`}> 81.50 - 86.49</td>
                          <td className={`p-3 text-xs md:text-sm text-center sm:text-left border-b ${theme.borderDivision}`}>2.00</td>
                          <td className={`p-3 text-xs md:text-sm border-r border-b ${theme.borderDivision}`}>Satisfactory</td>
                      </tr>
                      <tr className={`${theme.tableHover}`}>
                          <td className={`p-3 text-xs md:text-sm border-l whitespace-nowrap border-b ${theme.borderDivision}`}>76.00 - 81.49</td>
                          <td className={`p-3 text-xs md:text-sm text-center sm:text-left border-b ${theme.borderDivision}`}>2.25</td>
                          <td className={`p-3 text-xs md:text-sm border-r border-b ${theme.borderDivision}`}>Satisfactory</td>
                      </tr>
                      <tr className={`${theme.tableHover}`}>
                          <td className={`p-3 text-xs md:text-sm border-l whitespace-nowrap border-b ${theme.borderDivision}`}>70.50 - 75.99</td>
                          <td className={`p-3 text-xs md:text-sm text-center sm:text-left border-b ${theme.borderDivision}`}>2.50</td>
                          <td className={`p-3 text-xs md:text-sm border-r border-b ${theme.borderDivision}`}>Satisfactory</td>
                      </tr>
                      <tr className={`${theme.tableHover}`}>
                          <td className={`p-3 text-xs md:text-sm border-l whitespace-nowrap border-b ${theme.borderDivision}`}>65.00 - 70.49</td>
                          <td className={`p-3 text-xs md:text-sm text-center sm:text-left border-b ${theme.borderDivision}`}>2.75</td>
                          <td className={`p-3 text-xs md:text-sm border-r border-b ${theme.borderDivision}`}>Fair</td>
                      </tr>
                      <tr className={`${theme.tableHover}`}>
                          <td className={`p-3 text-xs md:text-sm border-l whitespace-nowrap border-b ${theme.borderDivision}`}>59.50 - 64.99</td>
                          <td className={`p-3 text-xs md:text-sm text-center sm:text-left border-b ${theme.borderDivision}`}>3.00</td>
                          <td className={`p-3 text-xs md:text-sm border-r border-b ${theme.borderDivision}`}>Fair</td>
                      </tr>
                      <tr className={`${theme.tableHover}`}>
                          <td className={`p-3 text-xs md:text-sm border-l whitespace-nowrap border-b ${theme.borderDivision}`}>59.49 and below</td>
                          <td className={`p-3 text-xs md:text-sm text-center sm:text-left border-b ${theme.borderDivision}`}>5.00</td>
                          <td className={`p-3 text-xs md:text-sm border-r border-b ${theme.borderDivision}`}>Failed </td>
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
          <Footer className={`${theme.footerText}`}></Footer>
        </div>
        
        <GWAModal isOpen={isGWAModalOpen} onClose={toggleGWAModal} theme={theme} />
        <CumulativeGWAModal isOpen={isCumulativeModalOpen} onClose={toggleCumulativeModal} theme={theme} />
    </div>
  )
}


  function GWAModal({ isOpen, onClose, theme}) {
    if(!isOpen) return null;
    return (
      <div className='min-h-screen w-full flex items-center justify-center fixed z-50'>
        <div className={`${theme.overlay} w-full h-full top-0 left-0 right-0 bottom-0 fixed flex items-center justify-center font-inter tracking-wide px-3`}>
          <div className={`relative ${theme.card} max-w-2xl w-full h-auto rounded-lg`}>
              <div className='border-b-2 border-gray flex justify-between absolute w-full left-0 '>
                  <div className='p-5 flex justify-between w-full'>
                      <h1 className={`${theme.overlayHeader} font-semibold text-sm md:text-base`}>How to Calculate Your Semester GWA</h1>
                      {/* <button className={`${theme.overlayClose} text-xl`} onClick={onClose}>
                        <IoClose />
                      </button> */}
                      
                  </div>
              </div>
              <div className={`flex flex-col mt-15 space-y-3 p-5`}>
                  <div className={`flex gap-5`}>
                      <div className={`${theme.overlayNumber} w-8 h-8 rounded-full flex justify-center items-center font-semibold shrink-0 mt-0.5 `}>
                          <h1 className={`${theme.overlayText} `}>1</h1>
                      </div>
                      <div className={`flex flex-col justify-center pt-1.25`}>
                          <h5 className={`${theme.overlayTitle} text-xs md:text-sm font-medium `}>Select Admission Year</h5>
                          <p className={`text-xs md:text-sm ${theme.overlaySubtitle}`}>Make sure to select your correct admission year to accurately evaluate your eligibility for the Dean's List or President's List.</p>
                      </div>
                  </div>
                  <div className={`flex gap-5`}>
                      <div className={`${theme.overlayNumber} w-8 h-8 rounded-full flex justify-center items-center font-semibold shrink-0`}>
                          <h1 className={`${theme.overlayText}`}>2</h1>
                      </div>
                      <div className=''>
                          <h5 className={`${theme.overlayTitle} text-xs md:text-sm font-medium `}>Enter Your Grades</h5>
                          <p className={`text-xs md:text-sm ${theme.overlaySubtitle}`}>Enter the final grade you received for each subject/course.</p>
                      </div>
                  </div>
                  <div className={`flex gap-5`}>
                      <div className={`${theme.overlayNumber} w-8 h-8 rounded-full flex justify-center items-center font-semibold shrink-0`}>
                          <h1 className={`${theme.overlayText}`}>3</h1>
                      </div>
                      <div className=''>
                          <h5 className={`${theme.overlayTitle} text-xs md:text-sm font-medium `}>Find and Enter Your Course Units</h5>
                          <ul className={`text-xs md:text-sm ${theme.overlaySubtitle}`}>
                              <li className={`text-xs md:text-sm`}>• Log in to One STI Portal.</li>
                              <li className={`text-xs md:text-sm`}>• Click the menu icon.</li>
                              <li className={`text-xs md:text-sm`}>• Select Program Curriculum.</li>
                              <li className={`text-xs md:text-sm`}>• Look for you current subjects and check the units for each course.</li>
                              <li className={`text-xs md:text-sm`}>• Input the units</li>
                          </ul>
                      </div>
                  </div>
                  <div className={`flex gap-5`}>
                      <div className={`${theme.overlayNumber} w-8 h-8 rounded-full flex justify-center items-center font-semibold shrink-0`}>
                          <h1 className={`${theme.overlayText}`}>4</h1>
                      </div>
                      <div className=''>
                          <h5 className={`${theme.overlayTitle} text-xs md:text-sm font-medium `}>Add Course</h5>
                          <p className={`text-xs md:text-sm ${theme.overlaySubtitle}`}>Click <span className="font-semibold">+ ADD SEMESTER</span> if you need to input more subjects for the semester.</p>
                      </div>
                  </div>
                  <div className={`flex gap-5`}>
                      <div className={`${theme.overlayNumber} w-8 h-8 rounded-full flex justify-center items-center font-semibold shrink-0`}>
                          <h1 className={`${theme.overlayText}`}>5</h1>
                      </div>
                      <div className=''>
                         <h5 className={`${theme.overlayTitle} text-xs md:text-sm font-medium `}>Remove Course</h5>
                          <p className={`text-xs md:text-sm ${theme.overlaySubtitle}`}>Click the trash icon beside each row to remove a subject.</p>
                      </div>
                  </div>
                  <div className={`flex gap-5`}>
                      <div className={`${theme.overlayNumber} w-8 h-8 rounded-full flex justify-center items-center font-semibold shrink-0`}>
                          <h1 className={`${theme.overlayText}`}>6</h1>
                      </div>
                      <div className=''>
                          <h5 className={`${theme.overlayTitle} text-xs md:text-sm font-medium`}>Get Your Results</h5>
                          <p className={`text-xs md:text-sm ${theme.overlaySubtitle}`}>Once all fields are filled, click the <span className="font-semibold text-">CALCULATE</span> button to see your GWA!</p>
                      </div>
                  </div>
                  <div className={`w-full flex`}>
                      <div className={`flex gap-3 py-3 px-3 rounded-lg ${theme.fb}`}>
                          <div className='text-base md:text-xl'><MdOutlineTipsAndUpdates /></div>
                          <div className={``}>
                              <h5 className='text-xs md:text-sm'><span>Tip: </span>Expand GRADES EQUIVALENT at the bottom of the screen to check the descriptive grading scale.</h5>
                          </div>
                      </div>
                  </div>
                  <button className={`rounded-lg py-3 font-bold text-xs md:text-sm mt-3 ${theme.navActive}`} onClick={onClose}>GOT IT</button>
              </div>
          </div>
        </div>
      </div>
    )
  }

  function CumulativeGWAModal({ isOpen, onClose, theme}) {
    if(!isOpen) return null;
    return (
      <div className='min-h-screen w-full flex items-center justify-center fixed z-50'>
        <div className={`${theme.overlay} w-full h-full top-0 left-0 right-0 bottom-0 fixed flex items-center justify-center font-inter tracking-wide px-3`}>
          <div className={`relative ${theme.card} max-w-2xl w-full h-auto rounded-lg`}>
              <div className='border-b-2 border-gray flex justify-between absolute w-full left-0 '>
                  <div className='p-5 flex justify-between w-full'>
                      <h1 className={`${theme.overlayHeader} font-semibold text-sm md:text-base`}>How to Calculate Your Cumulative GWA</h1>
                  </div>
              </div>
              <div className={`flex flex-col mt-15 space-y-3 p-5`}>
                  <div className={`flex gap-5`}>
                      <div className={`${theme.overlayNumber} w-8 h-8 rounded-full flex justify-center items-center font-semibold shrink-0 mt-0.5 `}>
                          <h1 className={`${theme.overlayText} `}>1</h1>
                      </div>
                      <div className={`flex flex-col justify-center pt-1.25`}>
                          <h5 className={`${theme.overlayTitle} text-xs md:text-sm font-medium `}>Select Admission Year</h5>
                          <p className={`text-xs md:text-sm ${theme.overlaySubtitle}`}>Make sure to select your correct admission year to accurately evaluate your eligibility for Latin Honors.</p>
                      </div>
                  </div>
                  <div className={`flex gap-5`}>
                      <div className={`${theme.overlayNumber} w-8 h-8 rounded-full flex justify-center items-center font-semibold shrink-0`}>
                          <h1 className={`${theme.overlayText}`}>2</h1>
                      </div>
                      <div className=''>
                          <h5 className={`${theme.overlayTitle} text-xs md:text-sm font-medium `}>Enter Semesters GWA</h5>
                          <p className={`text-xs md:text-sm ${theme.overlaySubtitle}`}>Enter the GWA you received for each individual semester.</p>
                      </div>
                  </div>
                  <div className={`flex gap-5`}>
                      <div className={`${theme.overlayNumber} w-8 h-8 rounded-full flex justify-center items-center font-semibold shrink-0`}>
                          <h1 className={`${theme.overlayText}`}>3</h1>
                      </div>
                      <div className=''>
                          <h5 className={`${theme.overlayTitle} text-xs md:text-sm font-medium `}>Add Semester</h5>
                          <p className={`text-xs md:text-sm ${theme.overlaySubtitle}`}>Click <span className="font-semibold">+ ADD SEMESTER</span> if you need to input more semesters.</p>
                      </div>
                  </div>
                  <div className={`flex gap-5`}>
                      <div className={`${theme.overlayNumber} w-8 h-8 rounded-full flex justify-center items-center font-semibold shrink-0`}>
                          <h1 className={`${theme.overlayText}`}>4</h1>
                      </div>
                      <div className=''>
                         <h5 className={`${theme.overlayTitle} text-xs md:text-sm font-medium `}>Remove Semester</h5>
                          <p className={`text-xs md:text-sm ${theme.overlaySubtitle}`}>Click the trash icon beside each row to remove a semester.</p>
                      </div>
                  </div>
                  <div className={`flex gap-5`}>
                      <div className={`${theme.overlayNumber} w-8 h-8 rounded-full flex justify-center items-center font-semibold shrink-0`}>
                          <h1 className={`${theme.overlayText}`}>5</h1>
                      </div>
                      <div className=''>
                          <h5 className={`${theme.overlayTitle} text-xs md:text-sm font-medium `}>Get Your Results</h5>
                          <p className={`text-xs md:text-sm ${theme.overlaySubtitle}`}>Once all fields are filled, click the <span className="font-semibold text-">CALCULATE</span> button to see your Cumulative GWA!</p>
                      </div>
                  </div>
                  <div className={`w-full flex`}>
                      <div className={`flex gap-3 py-3 px-3 rounded-lg ${theme.fb}`}>
                          <div className='text-base md:text-xl'><MdOutlineTipsAndUpdates /></div>
                          <div className={``}>
                              <h5 className='text-xs md:text-sm'><span className="font-semibold">Tip: </span>Expand <span className="font-semibold">GRADES EQUIVALENT</span> at the bottom of the screen to check the descriptive grading scale.</h5>
                          </div>
                      </div>
                  </div>
                  <button className={`rounded-lg py-3 font-bold text-xs md:text-sm mt-3 ${theme.navActive}`} onClick={onClose}>GOT IT</button>
              </div>
          </div>
        </div>
      </div>
    )
  }
