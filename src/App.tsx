import React, { useState } from "react";
import NavBar from "./components/NavBar";
import QRCodeDisplay from "./components/QRCodeDisplay";
import Form from "./components/Form";

// Define the component with proper type annotations
const App: React.FC = () => {
  // State to store the QR code URL or null if not generated
  const [qrCode, setQrCode] = useState<string | null>(null);

  // Handler for form submission, expects a string URL for the QR code
  const handleFormSubmit = (qrCodeImage: string): void => {
    setQrCode(qrCodeImage); // Set the QR code URL
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center min-h-screen py-6">
      <NavBar />
      <div className="mt-44 lg:mt-24 flex justify-center items-start w-full px-4 max-w-7xl flex-col lg:flex-row">
        {/* Pass the handleFormSubmit function as the onSubmit prop */}
        <Form onSubmit={handleFormSubmit} />
        {/* Display the QR code if it is generated */}
        <QRCodeDisplay qrCode={qrCode} />
      </div>
    </div>
  );
};

export default App;
