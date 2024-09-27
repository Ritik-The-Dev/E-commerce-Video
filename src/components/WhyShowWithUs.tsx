import React from 'react';

const WhyShopWithUs: React.FC = () => {
  return (
    <div className="bg-blue-500 text-white p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Why Shop With Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white text-black p-4 rounded-lg text-center">
          <div className="text-4xl mb-2">⭐</div>
          <h3 className="font-bold">QUALITY AND SAVING</h3>
          <p>Comprehensive quality control and affordable prices</p>
        </div>
        <div className="bg-white text-black p-4 rounded-lg text-center">
          <div className="text-4xl mb-2">🏢</div>
          <h3 className="font-bold">GLOBAL WAREHOUSE</h3>
          <p>37 overseas warehouses</p>
        </div>
        <div className="bg-white text-black p-4 rounded-lg text-center">
          <div className="text-4xl mb-2">🚚</div>
          <h3 className="font-bold">FAST SHIPPING</h3>
          <p>Fast and convenient door to door delivery</p>
        </div>
        <div className="bg-white text-black p-4 rounded-lg text-center">
          <div className="text-4xl mb-2">🔒</div>
          <h3 className="font-bold">PAYMENT SECURITY</h3>
          <p>More than 10 different secure payment methods</p>
        </div>
        <div className="bg-white text-black p-4 rounded-lg text-center">
          <div className="text-4xl mb-2">❓</div>
          <h3 className="font-bold">HAVE QUESTIONS?</h3>
          <p>24/7 Customer Service - We're here and happy to help!</p>
        </div>
      </div>
    </div>
  );
};

export default WhyShopWithUs;