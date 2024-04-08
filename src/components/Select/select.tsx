import { HTMLProps } from "react";
import styles from "./select.module.scss";

interface SelectProps extends HTMLProps<HTMLSelectElement> {
  option: string[];
  label: string;
}

export default function Select({ option, label, ...props }: SelectProps) {
  return (
    <div className={styles.select}>
      <label htmlFor={label}>{label}</label>
      <select
        id={label}
        name={label.toLowerCase()}
        className={styles.custom_select}
        {...props}
      >
        {option?.map((opt) => {
          return (
            <option key={opt.toLowerCase()} value={opt}>
              {opt}
            </option>
          );
        })}
      </select>

      <p>
        <i className="bi bi-info-circle"></i> By Default, First value is
        selected.
      </p>
    </div>
  );
}
