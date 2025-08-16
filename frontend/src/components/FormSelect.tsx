// FormSelect: Dropdown select input

import React from "react";

type Props = {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
    error?: string;
};

const FormSelect: React.FC<Props> = ({ label, value, options, onChange, error }) => {
    return (
        <div>
            <label>
                {label}
                <select value={value} onChange={e => onChange(e.target.value)}>
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </label>
            {error && <span className="error">{error}</span>}
        </div>
    );
};

export default FormSelect;