export const prettify = (date) => {
  const d = new Date(date);

  let Day = d.getDate();
  let Month = d.getMonth();
  let Year = d.getFullYear();

  if(Day < 10) Day = `0${Day}`;
  if(Month < 10) Month = `0${Month}`;
  if(Year < 10) Year = `0${Year}`;

  return `${Day}-${Month}-${Year}`;
}