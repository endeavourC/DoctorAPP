import React from "react";

const SelectInput = ({ options, title = "Choose your option" }) => {
    return (
        <div>
            <select className="browser-default custom-select">
                <option>{title}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;
