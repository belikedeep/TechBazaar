// FormCheckbox: Checkbox or radio input

import React from "react";

type Props = {
    label: React.ReactNode;
    checked: boolean;
    onChange: (checked: boolean) => void;
    type?: "checkbox" | "radio";
};

const FormCheckbox: React.FC<Props> = ({ label, checked, onChange, type = "checkbox" }) => {
    return (
        <label className="custom-checkbox-label">
            <input
                className="custom-checkbox-input"
                type={type}
                checked={checked}
                onChange={e => onChange(e.target.checked)}
            />
            <span className="custom-checkbox-span"></span>
            {label}
        </label>
    );
};

export default FormCheckbox;