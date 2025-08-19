import React from "react";

const Footer: React.FC = () => (
    <footer className="w-full mt-28 pt-16 py-6 px-4 flex flex-col items-center justify-center bg-transparent/40 backdrop-blur-xl gap-10 border-t border-white/10 rounded-t-2xl z-30">
        <nav className="flex flex-wrap justify-center gap-6 mb-3 text-sm text-gray-200 font-medium">
            <a href="/" className="hover:underline">Home</a>
            <a href="/about" className="hover:underline">About</a>
            <a href="/terms" className="hover:underline">Terms & Conditions</a>
            <a href="/shipping" className="hover:underline">Shipping & Return</a>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/faq" className="hover:underline">FAQ</a>
        </nav>
        <div className="text-xs text-gray-400 font-medium tracking-wide text-center">
            &copy; {new Date().getFullYear()} TechBazaar LLC, All rights reserved.
        </div>
    </footer>
);

export default Footer;