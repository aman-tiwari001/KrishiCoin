import React, { useState } from "react";

const SellPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
    quantity: 50, 
    pricePerUnit: 0, 
    city: "",
    state: "",
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const [listings, setListings] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setListings([...listings, formData]);
    console.log("New Listing:", formData);
    console.log("All Listings:", listings);

    setFormData({
      title: "",
      description: "",
      images: [],
      quantity: 50,
      pricePerUnit: 0,
      city: "",
      state: "",
    });
    setImagePreviews([]); 
  };

  return (
    <div className="flex flex-col md:flex-row h-screen items-center p-5">
      <div className="md:w-1/2 w-full md:sticky mt-[60px] bg-[#283e2f] text-[#bcdef0] self-start border-2 rounded-3xl px-2">
        <h2 className="text-4xl font-semibold mt-3 p-2 text-center md:text-left">
          List New Item
        </h2>
        <hr />
        <form
          onSubmit={handleSubmit}
          className="space-y-4 overflow-scroll h-[70vh] p-2"
        >

          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 bg-white text-black text-xl py-2 border rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter the description in detail ..."
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white text-black border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm mb-1 font-medium">
              Images
            </label>
            <input
              type="file"
              id="image"
              multiple
              onChange={handleImageChange}
              className="file-input file-input-bordered image-full bg-white text-black w-full file-input-info"
            />

            <div className="mt-3 grid grid-cols-3 gap-4">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
                  className="h-32 w-full object-cover rounded-md"
                />
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium">
              Quantity (in multiples of 50kg)
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              min="50"
              step="50"
              className="mt-1 block w-full px-3 bg-white text-black py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="pricePerUnit" className="block text-sm font-medium">
              Price Per 50kg
            </label>
            <input
              type="number"
              name="pricePerUnit"
              id="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 bg-white text-black py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium">
              Location
            </label>
            <input
              type="text"
              name="city"
              placeholder="Enter City"
              value={formData.city}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 mb-4 bg-white text-black py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              type="text"
              name="state"
              placeholder="Enter State"
              value={formData.state}
              onChange={handleInputChange}
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
      <div className="hidden md:block md:w-1/2">
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/woman-selling-agricultural-products-illustration-download-in-svg-png-gif-file-formats--farmer-store-sell-pack-agriculture-illustrations-6020566.png" />
      </div>
    </div>
  );
};

export default SellPage;
