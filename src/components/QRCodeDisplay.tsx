import React from 'react';

type QRCodeDisplayProps = {
    qrCode: string | null;
};

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrCode }) => {
    return (
        <div className="flex flex-col items-center mt-6 lg:mt-0">
            {qrCode && (
                <>
                    <h3 className="text-lg font-semibold text-gray-700 mt-6">QR Code généré :</h3>
                    <img src={qrCode} className="mt-4 border border-gray-300 rounded-lg shadow-md" alt="QR Code généré" />
                </>
            )}
            {qrCode && (
                <button className="bg-gray-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-gray-600 transition duration-300 ease-in-out text-xs">
                    Imprimer
                </button>
            )}
        </div>
    );
};

export default QRCodeDisplay;
