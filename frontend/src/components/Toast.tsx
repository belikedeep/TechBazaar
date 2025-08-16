// Toast: Notification system

import React from "react";

type Props = {
    message: string;
    type?: "success" | "error" | "info";
    onClose: () => void;
};

const Toast: React.FC<Props> = ({ message, type = "info", onClose }) => {
    return (
        <div className={`toast toast-${type}`}>
            <span>{message}</span>
            <button onClick={onClose}>X</button>
        </div>
    );
};

export default Toast;