import React from 'react';

const NavBar: React.FC = () => {
    return (
        <nav className="bg-white w-full py-4 px-6 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-20 shadow-md fixed top-0 left-0 z-50">
            <img
                className="h-16 w-auto mb-2"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvDgfgXlz4XF2_T6_WgQp_wWV8ZM31-NHVstY8xA3zKDnGyivJQfj-h00UkpURUDrWv3k&usqp=CAU"
                alt="logo"
            />
            <h2 className="text-xl font-semibold uppercase text-center text-gray-800">
                MINISTÈRE PROVINCIAL DES MINES, HYDROCARBURES ET PORTEFEUILLE
            </h2>
        </nav>
    );
};

export default NavBar;