// Modal: Dialog/modal component

import React from "react";
import type { ReactNode } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
};

const Modal: React.FC<Props> = ({ open, onClose, children }) => {
    if (!open) return null;
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;