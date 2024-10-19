import React from "react";
import BlogCard from "../components/BlogCard";

const products = [
  {
    id: 1,
    title:
      "Exploring Aquaponics Farming: A Sustainable Future for Food Production Exploring Aquaponics Farming: A Sustainable Future for Food ProductionExploring Aquaponics Farming: A Sustainable Future for Food Production",
    description:
      "This blog delves into aquaponics farming, a sustainable agricultural method that combines fish farming (aquaculture) and plant cultivation (hydroponics) in a symbiotic system. It highlights the core components of an aquaponics system, including fish tanks, grow beds, and water circulation. The blog outlines the numerous benefits of aquaponics, such as water efficiency, sustainability, space optimization, and year-round production.This blog delves into aquaponics farming, a sustainable agricultural method that combines fish farming (aquaculture) and plant cultivation (hydroponics) in a symbiotic system. It highlights the core components of an aquaponics system, including fish tanks, grow beds, and water circulation. The blog outlines the numerous benefits of aquaponics, such as water efficiency, sustainability, space optimization, and year-round production.  This blog delves into aquaponics farming, a sustainable agricultural method that combines fish farming (aquaculture) and plant cultivation (hydroponics) in a symbiotic system. It highlights the core components of an aquaponics system, including fish tanks, grow beds, and water circulation. The blog outlines the numerous benefits of aquaponics, such as water efficiency, sustainability, space optimization, and year-round production.",
    user: "John Doe",
    city: "Jind",
    state: "Haryana",
    quantity: 50,
    price: 20,
    quantityLeft: 30,
    location: "California, USA",
    image:
      "https://nutritionadvance.com/wp-content/uploads/2018/01/several-fresh-carrots-with-intact-green-stems.jpg",
  },
  {
    id: 2,
    title: "Carrots",
    description: "This blog delves into aquaponics farming, a sustainable agricultural method that combines fish farming (aquaculture) and plant cultivation (hydroponics) in a symbiotic system. It highlights the core components of an aquaponics system, including fish tanks, grow beds, and water circulation. The blog outlines the numerous benefits of aquaponics, such as water efficiency, sustainability, space optimization, and year-round production. This blog delves into aquaponics farming, a sustainable agricultural method that combines fish farming (aquaculture) and plant cultivation (hydroponics) in a symbiotic system. It highlights the core components of an aquaponics system, including fish tanks, grow beds, and water circulation. The blog outlines the numerous benefits of aquaponics, such as water efficiency, sustainability, space optimization, and year-round production.",
    user: "John Doe",
    city: "Jind",
    state: "Haryana",
    quantity: 50,
    price: 20,
    quantityLeft: 30,
    location: "California, USA",
    image:
      "https://nutritionadvance.com/wp-content/uploads/2018/01/several-fresh-carrots-with-intact-green-stems.jpg",
  },
  {
    id: 3,
    title: "Carrots",
    description: "Fresh and organic carrots from local farms.",
    user: "John Doe",
    city: "Jind",
    state: "Haryana",
    quantity: 50,
    price: 20,
    quantityLeft: 30,
    location: "California, USA",
    image:
      "https://nutritionadvance.com/wp-content/uploads/2018/01/several-fresh-carrots-with-intact-green-stems.jpg",
  },
  {
    id: 4,
    title: "Carrots",
    description: "Fresh and organic carrots from local farms.",
    user: "John Doe",
    city: "Jind",
    state: "Haryana",
    quantity: 50,
    price: 20,
    quantityLeft: 30,
    location: "California, USA",
    image:
      "https://nutritionadvance.com/wp-content/uploads/2018/01/several-fresh-carrots-with-intact-green-stems.jpg",
  },
  {
    id: 5,
    title: "Carrots",
    description: "Fresh and organic carrots from local farms.",
    user: "John Doe",
    city: "Jind",
    state: "Haryana",
    quantity: 50,
    price: 20,
    quantityLeft: 30,
    location: "California, USA",
    image:
      "https://nutritionadvance.com/wp-content/uploads/2018/01/several-fresh-carrots-with-intact-green-stems.jpg",
  },
  {
    id: 6,
    title: "Carrots",
    description: "Fresh and organic carrots from local farms.",
    user: "John Doe",
    city: "Jind",
    state: "Haryana",
    quantity: 50,
    price: 20,
    quantityLeft: 30,
    location: "California, USA",
    image:
      "https://nutritionadvance.com/wp-content/uploads/2018/01/several-fresh-carrots-with-intact-green-stems.jpg",
  },
];

function BlogPage() {
  return (
    <div className="h-screen">
      <div className="h-[80px]"></div>
      <div className="flex h-screen-minus-80 overflow-y-auto flex-wrap gap-8 justify-center p-8">
        {products.map((product) => (
          <BlogCard
            key={product.id}
            title={product.title}
            description={product.description}
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

export default BlogPage;
