import React from 'react'

function CourseGrade() {
  return (
    <div>
      <div className={` bg-[#FEFEFE] rounded-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-5 space-y-3`}>
        <div className="flex justify-between">
          <h1 className="text-xs font-inter font-medium uppercase tracking-wide">Enter Your Grade:</h1>
          <MdDelete onClick={deleteInput}/> 
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col bg-[#fefefe] rounded-lg p-3 border border-[#ECEDF1] gap-1">
            <h5 className="text-[#242F49] font-medium text-sm">Prelim (20%)</h5>
            <input
            type="number"
            placeholder="--"
            value={prelim}
            onChange={(e) => handleGradeChange(e.target.value, setPrelim)}
            className="border-none outline-none text-2xl font-bold text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            ></input>
          </div>
          <div className="flex flex-col bg-[#fefefe] rounded-lg p-3 border border-[#ECEDF1] gap-1">
            <h5 className="text-[#242F49] font-medium text-sm">Midterm (20%)</h5>
            <input
            type="number"
            value={midterm}
            onChange={(e) => handleGradeChange(e.target.value, setMidterm)}
            placeholder="--"
            className="border-none outline-none text-2xl font-bold text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            ></input>
          </div>
          <div className="flex flex-col bg-[#fefefe] rounded-lg p-3 border border-[#ECEDF1] gap-1">
            <h5 className="text-[#242F49] font-medium text-sm">Prefinals (20%)</h5>
            <input
            type="number"
            placeholder="--"
            value={prefinal}
            onChange={(e) => handleGradeChange(e.target.value, setPrefinal)}
            className="border-none outline-none text-2xl font-bold text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            ></input>
          </div>
          <div className="flex flex-col bg-[#fefefe] rounded-lg p-3 border border-[#ECEDF1] gap-1">
            <h5 className="text-[#242F49] font-medium text-sm">Finals (40%)</h5>
            <input
            type="number"
            placeholder="--"
            value={finals}
            onChange={(e) => handleGradeChange(e.target.value, setFinals)}
            className="border-none outline-none text-2xl font-bold text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            ></input>
          </div>
        </div>

        <div className={`flex flex-col justify-between bg-[#fefefe] rounded-lg p-3 gap-1 h-22 border-2 ${gwaData.color}`}>
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center gap-2">
              <h5 className="text-[#242F49] font-medium text-sm ">GWA:</h5>
              <input
              type="number"
              value={gwaData.scale}
              placeholder="0.0"
              readOnly
              className="border-none outline-none text-shadow-mauve-900 font-semibold text-sm text-[#242F49] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              ></input>
            </div>
            <div className="">
              <input
              type="text"
              placeholder="REMARK"
              value={gwaData.remark}
              readOnly
              className="text-right border-none outline-none text-[#242F49] font-medium text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              ></input>
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
    </div>
  )
}

export default CourseGrade
