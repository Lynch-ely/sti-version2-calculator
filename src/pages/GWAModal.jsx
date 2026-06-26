import React from 'react';
import { IoClose } from "react-icons/io5";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

function GWAModal() {
  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <div className='bg-[rgba(49,49,49,0.798)] w-full h-full top-0 left-0 right-0 bottom-0 fixed flex items-center justify-center'>
        <div className={`relative bg-white max-w-2xl w-full h-auto rounded-lg`}>
            <div className='border-b-2 border-gray flex justify-between absolute w-full left-0 '>
                <div className='p-5 flex justify-between w-full'>
                    <h1>How to Calculate your Semester GWA</h1>
                    <IoClose />
                </div>
            </div>
            <div className={`flex flex-col mt-15 space-y-3 p-5`}>
                <div className={`flex gap-5`}>
                    <div className='bg-blue-500 text-white w-8 h-8 rounded-full flex justify-center items-center'>
                        <h1>1</h1>
                    </div>
                    <div className=''>
                        <h5 className='text-sm'>Select Admission Year</h5>
                        <p className='text-sm'>Make sure to select your correct admission year to accurately evaluate your eligibility for the Dean's List or President's List.</p>
                    </div>
                </div>
                <div className={`flex gap-5`}>
                    <div className='bg-blue-500 text-white w-8 h-8 rounded-full flex justify-center items-center'>
                        <h1>2</h1>
                    </div>
                    <div className=''>
                        <h5 className='text-sm'>Enter Your Grades</h5>
                        <p className='text-sm'>Enter the final grade you received for each subject/course.</p>
                    </div>
                </div>
                <div className={`flex gap-5`}>
                    <div className='bg-blue-500 text-white w-8 h-8 rounded-full flex justify-center items-center'>
                        <h1>3</h1>
                    </div>
                    <div className=''>
                        <h5 className='text-sm'>Find and Enter Your Course Units</h5>
                        <ol>
                            <li>Log in to One STI Portal.</li>
                            <li>Click the menu icon.</li>
                            <li>Select Program Curriculum.</li>
                            <li>Look for you current subjects and check the units for each course.</li>
                            <li>Input the units</li>
                        </ol>
                    </div>
                </div>
                <div className={`flex gap-5`}>
                    <div className='bg-blue-500 text-white w-8 h-8 rounded-full flex justify-center items-center'>
                        <h1>4</h1>
                    </div>
                    <div className=''>
                        <h5 className='text-sm'>Add Course</h5>
                        <p className='text-sm'>Click + ADD COURSE if you need to input more subjects for the semester.</p>
                    </div>
                </div>
                <div className={`flex gap-5`}>
                    <div className='bg-blue-500 text-white w-8 h-8 rounded-full flex justify-center items-center'>
                        <h1>5</h1>
                    </div>
                    <div className=''>
                        <h5 className='text-sm'>Remove Course</h5>
                        <p className='text-sm'>Click the trash button beside each row to remove a subject.</p>
                    </div>
                </div>
                <div className={`flex gap-5`}>
                    <div className='bg-blue-500 text-white w-8 h-8 rounded-full flex justify-center items-center'>
                        <h1>6</h1>
                    </div>
                    <div className=''>
                        <h5 className='text-sm'>Get Your Results</h5>
                        <p className='text-sm'>Once all fields are filled, click the CALCULATE button to see your GWA!</p>
                    </div>
                </div>
                <div className={`w-full flex`}>
                    <div className='flex gap-3 bg-amber-300 p-5 rounded-lg'>
                        <div className='text-xl'><MdOutlineTipsAndUpdates /></div>
                        <div className=''>
                            <h5 className='text-sm'><span>Tip:</span>You can expand GRADES EQUIVALENT at the bottom of the screen to check the descriptive grading scale.</h5>
                        </div>
                    </div>
                </div>
                <button className={`rounded-lg bg-blue-500 text-white py-3`}>GOT IT</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default GWAModal
