import React, { useState } from "react";

const MarketPlace = () => {
  // State for toggle and form fields
  const [activeTab, setActiveTab] = useState("Sell"); // Toggle state between "Buy" and "Sell"
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [images, setImages] = useState([]);

  const [listings, setListings] = useState([]); // Store listings data

  // Image handling
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  // Handle form submission for Sell
  const addListing = (e) => {
    e.preventDefault();

    // Create a new listing object
    const newListing = {
      title,
      description,
      category,
      stock,
      city,
      country,
      images
    };

    // Add the new listing to the listings array
    setListings([...listings, newListing]);

    // Clear the form fields
    setTitle("");
    setDescription("");
    setCategory("");
    setStock("");
    setCity("");
    setCountry("");
    setImages([]);

    alert("Item added successfully!");
  };

  return (
    <div className="w-full mt-[60px] px-4 py-8">
      {/* Toggle Switch */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center">
          <button
            onClick={() => setActiveTab("Buy")}
            className={`px-6 py-2 rounded-l-lg ${
              activeTab === "Buy" ? "bg-sky-400 text-white" : "bg-gray-200"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setActiveTab("Sell")}
            className={`px-6 py-2 rounded-r-lg ${
              activeTab === "Sell" ? "bg-sky-400 text-white" : "bg-gray-200"
            }`}
          >
            Sell
          </button>
        </div>
      </div>

      {/* Conditional Rendering Based on Active Tab */}
      {activeTab === "Sell" ? (
        <div className="md:w-1/2 mx-auto border-2 rounded-3xl px-4 py-4">
          <h2 className="text-4xl font-semibold mt-3 p-2">List new item</h2>
          <hr />
          <form onSubmit={addListing} className="space-y-4 p-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter Title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-3 bg-white text-black text-xl py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter the description in detail ..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white text-black border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm mb-1 font-medium">
                Image
              </label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                multiple
                className="file-input file-input-bordered image-full bg-white text-black w-full file-input-info"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white text-black border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="laptop">Laptop</option>
                <option value="phone">Phone</option>
                <option value="appliances">Home Appliances</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium">
                Stock
              </label>
              <input
                type="number"
                placeholder="Enter Stock"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="mt-1 block w-full px-3 bg-white text-black py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium">
                Location
              </label>
              <input
                type="text"
                placeholder="Enter City"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 block w-full px-3 mb-4 bg-white text-black py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <input
                type="text"
                placeholder="Enter Country"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 block w-full px-3 mb-4 bg-white text-black py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400"
            >
              Add Item
            </button>
          </form>
        </div>
      ) : (
        <div className="md:w-1/2 mx-auto border-2 rounded-3xl px-4 py-4">
          <h2 className="text-4xl font-semibold mt-3 p-2">Buy items</h2>
          <hr />
          {/* Placeholder content for Buy page */}
          <div className="p-4">
            <p className="text-lg">Explore available listings and make purchases.</p>
            {/* Display Listings */}
            {listings.length > 0 ? (
              <div>
                {listings.map((listing, index) => (
                  <div key={index} className="border p-4 mt-3 rounded-md">
                    <h3 className="text-xl font-bold">{listing.title}</h3>
                    <p>{listing.description}</p>
                    <p>Category: {listing.category}</p>
                    <p>Stock: {listing.stock}</p>
                    <p>Location: {listing.city}, {listing.country}</p>
                    {listing.images.length > 0 && (
                      <div className="flex space-x-2 mt-2">
                        {listing.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={URL.createObjectURL(img)}
                            alt="Preview"
                            className="w-24 h-24 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No items listed for sale yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPlace;
