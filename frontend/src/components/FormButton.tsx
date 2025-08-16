// FormButton: Button with loading state

import React from "react";

type Props = {
    children: React.ReactNode;
    loading?: boolean;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
};

const FormButton: React.FC<Props> = ({ children, loading, onClick, type = "button" }) => {
    return (
        <button type={type} onClick={onClick} disabled={loading}>
            {loading ? "Loading..." : children}
        </button>
    );
};

export default FormButton;