import { getColor } from "../utils";
import styles from "./Cell.module.css";

export const Cell = ({ value, index, data, onClick }) => {
  return (
    <td
      key={index}
      className={styles.Cell}
      role="gridcell"
      data-date={value}
      onClick={onClick}
      style={{
        backgroundColor: getColor(data[value]),
      }}
    ></td>
  );
};
