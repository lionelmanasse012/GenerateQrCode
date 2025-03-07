import React, { useRef } from 'react';

type QRCodeDisplayProps = {
    qrCode: string | null;
    formData: {
        nom: string;
        prenom: string;
        bon: string;
        carriere: string;
        ministre: string;
    } | null;
};

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrCode, formData }) => {
    const qrRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        if (qrRef.current && formData) {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                    <html>
                        <head>
                            <style>
                                body { text-align: center; padding: 20px; font-family: Arial, sans-serif; }
                                img { max-width: 200px; height: auto; border: 2px solid #000; }
                                table { margin: auto; border-collapse: collapse; width: 80%; margin-bottom: 20px; }
                                th, td { border: 1px solid black; padding: 10px; text-align: left; }
                                th { background-color: #f2f2f2; }
                                .footer { text-align: center; font-size: 12px; }
                            </style>
                        </head>
                        <body onload="window.print(); window.close();">
                            <h2>Bon de Retrait</h2>
                            <table>
                                <tr><th>Nom</th><td>${formData.nom}</td></tr>
                                <tr><th>Prénom</th><td>${formData.prenom}</td></tr>
                                <tr><th>Bon</th><td>${formData.bon}</td></tr>
                                <tr><th>Carrière</th><td>${formData.carriere}</td></tr>
                                <tr><th>Ministre</th><td>${formData.ministre}</td></tr>
                            </table>
                            <div>
                                <img src="${qrCode}" alt="QR Code généré" />
                            </div>
                            <div class="footer">
                                <p>Scannez-moi !</p>
                            </div>
                        </body>
                    </html>
                `);
                printWindow.document.close();
            }
        }
    };

    return (
        <div className="flex flex-col items-center lg:mt-0">
            {qrCode && formData && (
                <>
                    <div className='bg-white p-6 py-3 shadow-xl space-y-2 w-full mx-auto sm:w-96'>
                        <div className='flex gap-4 flex-wrap justify-center' ref={qrRef}>
                            <div className='w-full flex items-center justify-between'>
                                <img
                                    className="h-12 w-auto mb-2"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvDgfgXlz4XF2_T6_WgQp_wWV8ZM31-NHVstY8xA3zKDnGyivJQfj-h00UkpURUDrWv3k&usqp=CAU"
                                    alt="logo"
                                />
                                <p className='text-xs'>MINISTÈRE PROVINCIAL DES MINES,<br></br> HYDROCARBURES ET PORTEFEUILLE</p>
                            </div>
                            <div className='w-full'>
                                <p className='flex my-2 justify-end'>{formData.nom} {formData.prenom}</p>
                                <p className='font-semibold text-2xl'>Bon de Retrait</p>
                                <p>Référence : xxxxxxxx</p>
                                <div className='w-full h-1 bg-black my-2 rounded-xl'></div>
                                <div className="flex justify-between">

                                    <div>
                                        <p className='font-semibold my-2'>Bon</p>
                                        <p>{formData.bon}</p>
                                    </div>
                                    <div>
                                        <p className='font-semibold my-2'>Carrière</p>
                                        <p>{formData.carriere}</p>
                                    </div>
                                    <div>
                                        <p className='font-semibold my-2'>Ministre</p>
                                        <p>{formData.ministre}</p>
                                    </div>
                                </div>

                            </div>
                            <div className='flex flex-col w-48 h-48 my-3 text-center'>
                                <img src={qrCode} className="border border-gray-300 rounded-lg shadow-md" alt="QR Code généré" />
                                <p>Scannez-moi!</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handlePrint}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-gray-600 transition duration-300 ease-in-out text-xs"
                    >
                        Imprimer le Bon
                    </button>
                </>
            )}
        </div>
    );
};

export default QRCodeDisplay;
