import React, { useRef } from "react";
import Logo from "/Logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type QRCodeDisplayProps = {
    qrCode: string | null;
    formData: {
        nom: string;
        prenom: string;
        bon: string;
        carriere: string;
        ministre: string;
    } | null;
    onClose: () => void;
};

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
    qrCode,
    formData,
    onClose,
}) => {
    const qrRef = useRef<HTMLDivElement>(null);

    const handlePrintPDF = () => {
        if (qrRef.current) {
            // Capture le contenu avec html2canvas
            html2canvas(qrRef.current, { scale: 2 }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');

                // Dimensions de la page
                const pdfWidth = 80; // Largeur fixe de 80 mm
                const imgHeight = (canvas.height * pdfWidth) / canvas.width; // Hauteur proportionnelle

                // Marges
                const margin = 5; // Marge de 5 mm sur tous les côtés

                // Dimensions du contenu avec marges
                const contentWidth = pdfWidth - 2 * margin; // Largeur du contenu avec marges
                const contentHeight = imgHeight - 2 * margin; // Hauteur du contenu avec marges

                // Créer un PDF avec la largeur fixe et la hauteur automatique
                const pdf = new jsPDF('p', 'mm', [pdfWidth, imgHeight]);

                // Ajouter l'image au PDF avec des marges
                pdf.addImage(
                    imgData,
                    'PNG',
                    margin, // Marge gauche
                    margin, // Marge supérieure
                    contentWidth, // Largeur du contenu avec marges
                    contentHeight // Hauteur du contenu avec marges
                );

                // Convertir le PDF en URL de données
                const pdfBlob = pdf.output('blob');
                const pdfUrl = URL.createObjectURL(pdfBlob);

                // Créer un iframe invisible pour l'impression
                const iframe = document.createElement('iframe');
                iframe.style.position = 'absolute';
                iframe.style.width = '0';
                iframe.style.height = '0';
                iframe.style.border = 'none';
                iframe.src = pdfUrl;

                // Ajouter l'iframe au document
                document.body.appendChild(iframe);

                // Attendre que le PDF soit chargé dans l'iframe
                iframe.onload = () => {
                    // Déclencher l'impression
                    iframe.contentWindow?.print();

                    // Écouter l'événement afterprint pour nettoyer l'iframe
                    iframe.contentWindow?.addEventListener('afterprint', () => {
                        // Supprimer l'iframe après l'impression
                        document.body.removeChild(iframe);
                        URL.revokeObjectURL(pdfUrl); // Libérer la mémoire
                    });
                };
            });
        }
    };

    if (!qrCode || !formData) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 py-3 shadow-xl space-y-2 mx-auto w-96 relative">
                <div className="flex gap-4 flex-wrap justify-center" ref={qrRef}>
                    <div className="w-full flex items-center justify-between">
                        <img
                            className="h-12 w-auto mb-2"
                            src={Logo}
                            alt="logo"
                        />
                        <p className="text-xs">
                            MINISTÈRE PROVINCIAL DES MINES,<br></br> HYDROCARBURES ET
                            PORTEFEUILLE
                        </p>
                    </div>
                    <div className="w-full">
                        <p className="flex my-2 justify-end">
                            {formData.nom} {formData.prenom}
                        </p>
                        <p className="font-semibold text-2xl">Bon de Retrait</p>
                        <p>Référence : xxxxxxxx</p>
                        <div className="w-full h-1 bg-black my-2 rounded-xl"></div>
                        <div className="flex justify-between">
                            <div>
                                <p className="font-semibold my-2">Bon</p>
                                <p>{formData.bon}</p>
                            </div>
                            <div>
                                <p className="font-semibold my-2">Carrière</p>
                                <p>{formData.carriere}</p>
                            </div>
                            <div>
                                <p className="font-semibold my-2">Ministre</p>
                                <p>{formData.ministre}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-48 h-48 my-3 text-center gap-2">
                        <img
                            src={qrCode}
                            className="border border-gray-300 rounded-lg shadow-md"
                            alt="QR Code généré"
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-4 gap-4">
                    <button
                        onClick={handlePrintPDF}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 text-xs"
                    >
                        Imprimer
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 text-xs"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QRCodeDisplay;