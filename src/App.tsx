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
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleFormSubmit = (qrCodeImage: string, data: FormData): void => {
        setQrCode(qrCodeImage);
        setFormData(data);
        setShowModal(true); // Affiche le modal après soumission
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="bg-gray-100 flex flex-col items-center h-screen">
            <NavBar />
            <div className="flex justify-center h-full w-full items-center px-4">
                <Form onSubmit={handleFormSubmit} />
            </div>

            {/* Modal */}
            {showModal && (
                <QRCodeDisplay 
                    qrCode={qrCode} 
                    formData={formData} 
                    onClose={handleCloseModal} 
                />
            )}
        </div>
    );
};

export default App;
