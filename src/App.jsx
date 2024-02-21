import { useState, useEffect } from "react";
import { getWeeks } from "./utils";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import { Cell } from "./components/Cell";
import { weeks, months } from "./data";

import "./App.css";

function App() {
  const [data, setData] = useState();

  const fetchData = async () => {
    const response = await fetch(
      "https://dpg.gg/test/calendar.json"
    );
    const data = await response.json();

    setData(data);
  };

  const handleClickOutside = () => {
    const tooltip = document.querySelector(".Tooltip");

    if (tooltip) {
      tooltip.remove();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () =>
      window.removeEventListener(
        "click",
        handleClickOutside
      );
  }, []);

  const handleCellClick = (e) => {
    e.stopPropagation();

    const cell = e.target;
    console.log(e.clientX, e.clientY);
    const date = cell.getAttribute("data-date");
    const tooltip = document.querySelector(".Tooltip");
    const main = document.getElementById("main");

    if (tooltip) {
      tooltip.remove();
    } else {
      const value = data[date];

      const tooltip = document.createElement("div");
      tooltip.className = "Tooltip";
      tooltip.innerHTML = `
        <span class="Tooltip__header">${
          !value ? "No" : value
        } contributions</span>
        <span class="Tooltip__description">${format(
          new Date(date),
          "PPPP", {locale: ru}
        )}</span>
      `;
      tooltip.setAttribute(
        "style",
        `top: ${e.clientY}px; left: ${e.clientX}px;`
      );

      main.appendChild(tooltip);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return null;

  const currentDate = new Date();

  return (
    <div
      id="main"
      className="App"
    >
      <table role="grid">
        <thead>
          <tr>
            <td style={{ width: "29px" }}></td>
            {months.map((value, index) => (
              <td
                key={index}
                colSpan={value}
              >
                {new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() - (11 - index)
                ).toLocaleString("ru-RU", {
                  month: "short",
                })}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, index) => (
            <tr key={index}>
              <td height={15}>
                {[1, 3, 5].includes(week.id) && week.name}
              </td>

              {getWeeks(week.id).map((value, index) => {
                if (index === 51) {
                  const shouldRender =
                    new Date(value).getDate() <=
                    new Date().getDate();

                  return shouldRender ? (
                    <Cell
                      key={index}
                      value={value}
                      index={index}
                      data={data}
                      onClick={handleCellClick}
                    />
                  ) : null;
                }

                return (
                  <Cell
                    key={index}
                    value={value}
                    index={index}
                    data={data}
                    onClick={handleCellClick}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
