import React, { useState } from "react";
import NavBar from "./components/NavBar";
import QRCodeDisplay from "./components/QRCodeDisplay";
import Form from "./components/Form";

type FormData = {
    nom: string;
    prenom: string;
    bon: string;
    carriere: string;
    ministre: string;
};

const App: React.FC = () => {
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData | null>(null);

    const handleFormSubmit = (qrCodeImage: string, data: FormData): void => {
        setQrCode(qrCodeImage);
        setFormData(data);
    };

    return (
        <div className="bg-gray-100 flex flex-col items-center min-h-screen py-6">
            <NavBar />
            <div className="mt-44 lg:mt-24 flex flex-wrap justify-center w-full px-4 max-w-7xl gap-10">
                <Form onSubmit={handleFormSubmit} />
                <QRCodeDisplay qrCode={qrCode} formData={formData} />
            </div>
        </div>
    );
};

export default App;
