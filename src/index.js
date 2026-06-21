export function calculateCourseGWA(prelim, midterm, prefinal, finals) {
  if (!prelim || !midterm || !prefinal || !finals) {
    return { percentage: "--", scale: "0.0", remark: "REMARK", color: "border-[#ECEDF1]" };
  }

  let p = parseFloat(prelim) || 0;
  let m = parseFloat(midterm) || 0;
  let pf = parseFloat(prefinal) || 0;
  let f = parseFloat(finals) || 0;

  if (p > 100 || p < 0) p = 100;
  if (m > 100 || m < 0) m = 100; 
  if (pf > 100 || pf < 0) pf = 100;
  if (f > 100 || f < 0) f = 100;

  const finalPercentage = (p * 0.2) + (m * 0.2) + (pf * 0.2) + (f * 0.4);

  let scale = "5.00";
  let remark = "Failed";
  let color = "border-[#ECEDF1]";

  if (finalPercentage >= 97.50) {
    scale = "1.00";
    remark = "Excellent";
    color = "border-[#00c853]";
  } else if (finalPercentage >= 94.50) {
    scale = "1.25";
    remark = "Very Good";
    color = "border-[#2979ff]";
  } else if (finalPercentage >= 91.49) {
    scale = "1.50";
    remark = "Very Good";
    color = "border-[#2979ff]";
  } else if (finalPercentage >= 86.50) {
    scale = "1.75";
    remark = "Very Good";
    color = "border-[#2979ff]";
  } else if (finalPercentage >= 81.50) {
    scale = "2.00";
    remark = "Satisfactory";
    color = "border-[#ffe600]";
  } else if (finalPercentage >= 76.00) {
    scale = "2.25";
    remark = "Satisfactory";
    color = "border-[#ffe600]";
  } else if (finalPercentage >= 70.50) {
    scale = "2.50";
    remark = "Satisfactory";
    color = "border-[#ffe600]";
  } else if (finalPercentage >= 65.00) {
    scale = "2.75";
    remark = "Fair";
    color = "border-[#ff9100]";
  } else if (finalPercentage >= 59.50) {
    scale = "3.00";
    remark = "Fair";
    color = "border-[#ff9100]";
  } else {
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
}

export const validateGradeInput = (value) => {
  if (value === '') return '';
  const numericValue = parseFloat(value);
  return (numericValue > 100 || numericValue < 0) ? '100' : value;
};