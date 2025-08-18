import React from "react";

const Footer: React.FC = () => (
    <footer className="w-full mt-12 py-6 px-4 flex flex-col items-center justify-center bg-transparent/40 backdrop-blur-xl border-t border-white/10 rounded-t-2xl z-30">
        <div className="text-sm text-gray-300 font-medium tracking-wide flex items-center gap-2">
            <span>
                &copy; {new Date().getFullYear()}{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400">
                    TechBazar
                </span>
            </span>
            <span className="mx-2 text-gray-500">|</span>
            <span>
                Made with <span className="text-pink-400">♥</span> by your team
            </span>
        </div>
    </footer>
);

export default Footer;