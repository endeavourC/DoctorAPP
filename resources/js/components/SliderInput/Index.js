import React from "react";
import { currency } from "@/utils/currency";
const SliderInput = ({ maxValue, currentValue, onChange, name, title }) => {
    return (
        <div className="my-5">
            <label htmlFor={name}>{title}</label>
            <input
                onChange={ev => onChange(ev.target.value)}
                type="range"
                min="0"
                max={maxValue}
                className="custom-range"
                id={name}
                defaultValue={0}
            />
            <span>{currency(currentValue)}</span>
        </div>
    );
};

export default SliderInput;
