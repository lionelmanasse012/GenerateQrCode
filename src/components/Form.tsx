import React, { useState } from 'react';

type FormData = {
    nom: string;
    prenom: string;
    bon: string;
    carriere: string;
    ministre: string;
};

type FormProps = {
    onSubmit: (data: string) => void;  // On attend un string (l'URL du QR code)
};

const Form: React.FC<FormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        nom: "",
        prenom: "",
        bon: "",
        carriere: "",
        ministre: "",
    });

    const [loading, setLoading] = useState<boolean>(false); 
    const [error, setError] = useState<string | null>(null); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); 
        setError(null); 

        try {
            const response = await fetch('https://api-qrcodescanner.onrender.com/generate-qr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.qrCodeImage) {
                    onSubmit(data.qrCodeImage);  // Passe l'URL du QR code comme string
                    setFormData({
                        nom: "",
                        prenom: "",
                        bon: "",
                        carriere: "",
                        ministre: "",
                    });
                } else {
                    setError("L'API n'a pas retourné d'URL de QR code.");
                }
            } else {
                setError("Erreur lors de la génération du QR code.");
            }
        } catch (error) {
            console.error("Erreur lors de l'appel API :", error);
            setError("Erreur de connexion.");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white p-6 py-3 rounded-lg shadow-xl space-y-2 w-full lg:w-96 lg:mr-12 lg:mb-0 mb-8">
                {Object.keys(formData).map((field) => (
                    <div key={field}>
                        <label htmlFor={field} className="block text-gray-700 font-medium">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                            type="text"
                            id={field}
                            name={field}
                            value={formData[field as keyof FormData]}
                            onChange={handleChange}
                            required
                            aria-required="true"
                        />
                    </div>
                ))}
                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className={`px-6 py-2 rounded-lg transition duration-300 ease-in-out text-xs my-2 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                        disabled={loading} 
                    >
                        {loading ? "Chargement..." : "Envoyer"}
                    </button>
                </div>
            </form>

            {error && (
                <div className="text-red-500 text-center mt-4">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default Form;
