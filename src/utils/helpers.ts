export const getBgColorByAge = (age: number) => {
  if (age >= 50) return '#1cd93b';
  if (age >= 40) return 'rgba(228, 205, 35, 0.85)'; // Fixed invalid rgb string
  if (age >= 30) return '#1c2fd9'; 
  if (age >= 20) return '#d41818f3'; 
  return '#ffe6e6';              
};