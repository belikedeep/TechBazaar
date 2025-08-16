// FormCheckbox: Checkbox or radio input

import React from "react";

type Props = {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    type?: "checkbox" | "radio";
};

const FormCheckbox: React.FC<Props> = ({ label, checked, onChange, type = "checkbox" }) => {
    return (
        <label>
            <input
                type={type}
                checked={checked}
                onChange={e => onChange(e.target.checked)}
            />
            {label}
        </label>
    );
};

export default FormCheckbox;