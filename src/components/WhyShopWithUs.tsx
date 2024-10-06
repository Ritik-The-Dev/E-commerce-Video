import React from "react";

interface Benefit {
  id: number;
  icon: string;
  title: string;
  desc: string;
}

const WhyShopWithUs: React.FC = () => {
  const Benefits: Benefit[] = [
    {
      id: 1,
      icon: "⭐",
      title: "QUALITY AND SAVING",
      desc: "Comprehensive quality control and affordable prices",
    },
    {
      id: 2,
      icon: "🏢",
      title: "GLOBAL WAREHOUSE",
      desc: "37 overseas warehouses",
    },
    {
      id: 3,
      icon: "🚚",
      title: "FAST SHIPPING",
      desc: "Fast and convenient door to door delivery",
    },
    {
      id: 4,
      icon: "🔒",
      title: "PAYMENT SECURITY",
      desc: "More than 10 different secure payment methods",
    },
    {
      id: 5,
      icon: "❓",
      title: "HAVE QUESTIONS?",
      desc: "24/7 Customer Service - We're here and happy to help!",
    },
  ];

  return (
    <div className="bg-blue-500 text-white p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Why Shop With Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Benefits.map((item: Benefit) => (
          <div
            key={item.id}
            className="bg-white text-black p-4 rounded-lg text-center"
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <h3 className="font-bold">{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyShopWithUs;
