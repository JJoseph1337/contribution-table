import { sub, format } from "date-fns";

export const getColor = (value) => {
  if (value >= 1 && value <= 9) return "#ACD5F2";
  if (value >= 10 && value <= 19) return "#7FA8C9";
  if (value >= 20 && value <= 29) return "#527BA0";
  if (value >= 30) return "#254E77";
  return "#EDEDED";
};

export const getWeeks = (day) => {
  const date = new Date();
  let currentDate = sub(date, {
    days: date.getDay() - day,
  });

  const weeks = [];

  for (let i = 0; i < 52; i++) {
    weeks.push(format(currentDate, "yyyy-MM-dd"));
    currentDate = sub(currentDate, { weeks: 1 });
  }

  return weeks.reverse();
};