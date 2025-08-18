import React from "react";

const BackgroundBlobs: React.FC = () => (
    <>
        <div className="pointer-events-none fixed top-[-60px] left-[-100px] w-[350px] h-[350px] z-0"
            style={{
                background: "linear-gradient(135deg, #6d28d9 0%, #a78bfa 60%, #7c3aed 100%)",
                filter: "blur(80px)",
                opacity: 0.28,
                borderRadius: "50%",
            }}
            aria-hidden="true"
        />
        <div className="pointer-events-none fixed top-[180px] right-[-120px] w-[400px] h-[400px] z-0"
            style={{
                background: "linear-gradient(120deg, #7c3aed 0%, #6d28d9 60%, #a78bfa 100%)",
                filter: "blur(90px)",
                opacity: 0.22,
                borderRadius: "50%",
            }}
            aria-hidden="true"
        />
        <div className="pointer-events-none fixed bottom-[-100px] left-[40%] w-[250px] h-[250px] z-0"
            style={{
                background: "linear-gradient(90deg, #6d28d9 0%, #a78bfa 80%, #7c3aed 100%)",
                filter: "blur(60px)",
                opacity: 0.18,
                borderRadius: "50%",
            }}
            aria-hidden="true"
        />
    </>
);

export default BackgroundBlobs;