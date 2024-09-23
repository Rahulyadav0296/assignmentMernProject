export const getDate = (createDate) => {
  const currentDate = new Date(createDate);
  const monthsNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthsNames[currentDate.getMonth()];
  const date = String(currentDate.getDate()).padStart(2, "0");
  const year = currentDate.getFullYear();

  return `${month} ${date}, ${year}`;
};
