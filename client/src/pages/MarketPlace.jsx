import React from 'react';
import P2PCard from '../components/P2PCard';

const products = [
  {
    id: 1,
    title: 'Carrots',
    description: 'Fresh and organic carrots from local farms.',
    user: 'John Doe',
    city: 'Jind',
    state: 'Haryana',
    quantity: 50,
    price: 20,
    quantityLeft: 30,
    location: 'California, USA',
    image: 'https://nutritionadvance.com/wp-content/uploads/2018/01/several-fresh-carrots-with-intact-green-stems.jpg',
  },
];

function MarketPlace() {
  return (
    <div className="h-screen">
      <div className='h-[80px]'></div>
      <div className="flex h-screen-minus-80 overflow-y-auto flex-wrap gap-8 justify-center p-8">
        {products.map((product) => (
          <P2PCard
            key={product.id}
            title={product.title}
            city={product.city}
            state={product.state}
            user={product.user}
            quantity={product.quantity}
            price={product.price}
            quantityLeft={product.quantityLeft}
            // location={product.location}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}

export default MarketPlace;
