// FormInput: Input with validation

import React from "react";

type Props = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    error?: string;
};

const FormInput: React.FC<Props> = ({ label, value, onChange, type = "text", error }) => {
    return (
        <div>
            <label>
                {label}
                <input type={type} value={value} onChange={e => onChange(e.target.value)} />
            </label>
            {error && <span className="error">{error}</span>}
        </div>
    );
};

export default FormInput;