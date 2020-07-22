import React from "react";

const SelectInput = ({
    onChange,
    currentValue,
    stateType,
    options,
    title = "Choose your option"
}) => {
    return (
        <div>
            <select
                onChange={ev => onChange(stateType, ev.target.value)}
                className="browser-default custom-select"
            >
                <option value="">{title}</option>
                {options.map(option => (
                    <option
                        selected={option.value === currentValue ? true : false}
                        key={option.value}
                        value={option.value}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;
