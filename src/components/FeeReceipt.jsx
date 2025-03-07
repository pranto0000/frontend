import React from 'react';


const FeeReceipt = ({ userId, amount, name }) => {
    const handlePrint = () => {
        
        doc.text('School Management System', 20, 20);
        doc.text(`Student Name: ${name}`, 20, 40);
        doc.text(`Student ID: ${userId}`, 20, 60);
        doc.text(`Amount Paid: $${amount}`, 20, 80);
        doc.text('Thank you for your payment!', 20, 100);
        doc.save('FeeReceipt.pdf');
    };

    return (
        <button onClick={handlePrint} className="bg-green-500 text-white px-4 py-2 rounded">
            Download Receipt
        </button>
    );
};

export default FeeReceipt;
