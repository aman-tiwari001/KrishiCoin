import React, { useState } from "react";
import { motion } from "framer-motion";

// Dummy data for available items
const items = [
  {
    id: 1,
    title: "Tomatoes",
    description: "Fresh organic tomatoes.",
    quantityOffered: 500,
    quantityLeft: 300,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Potatoes",
    description: "Organic potatoes, freshly harvested.",
    quantityOffered: 600,
    quantityLeft: 200,
    image: "https://via.placeholder.com/150",
  },
];

const BuyPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleBuy = (quantity) => {
    // Handle the buy logic
    console.log(`Bought ${quantity} kgs of ${selectedItem.title}`);
  };

  return (
    <div className="p-5">
      {!selectedItem ? (
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="card shadow-md hover:shadow-xl"
              onClick={() => handleCardClick(item)}
            >
              <figure>
                <img src={item.image} alt={item.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p>{item.description}</p>
                <p>Quantity Left: {item.quantityLeft} kg</p>
              </div>
            </div>
          ))}
        </motion.div>
      ) : (
        <div className="flex gap-10">
          <motion.div
            className="w-1/2"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h3 className="text-2xl font-bold mb-4">{selectedItem.title}</h3>
            <p>{selectedItem.description}</p>
            <p>Total Quantity Offered: {selectedItem.quantityOffered} kg</p>
            <p>Quantity Left: {selectedItem.quantityLeft} kg</p>
          </motion.div>

          <motion.div
            className="w-1/2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h3 className="text-xl font-bold">Buy {selectedItem.title}</h3>
            <input
              type="number"
              min={50}
              step={50}
              placeholder="Enter quantity in 50kg units"
              className="input input-bordered w-full mb-4"
              onChange={(e) => handleBuy(e.target.value)}
            />
            <p className="text-lg">
              Total Price: ${(selectedItem.pricePerUnit * selectedItem.quantity).toFixed(2)}
            </p>
            <button className="btn btn-success w-full mt-4">Buy Now</button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BuyPage;
