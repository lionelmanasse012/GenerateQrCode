import React from 'react';
import Logo from '/Logo.png';

const NavBar: React.FC = () => {
    return (
        <nav className="bg-white w-full py-4 px-6 flex flex-col lg:flex-row items-center justify-center lg:gap-20 shadow-md sticky top-0">
            <img
                className="h-12 lg:h-16 w-auto mb-2"
                src={Logo}
                alt="logo"
            />
            <h2 className="text-sm lg:text-xl font-semibold uppercase text-center text-gray-800">
                MINISTÈRE PROVINCIAL DES MINES, HYDROCARBURES ET PORTEFEUILLE
            </h2>
        </nav>
    );
};

export default NavBar;