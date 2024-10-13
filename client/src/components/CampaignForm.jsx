import { useState } from "react";

const CampaignForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
    deadline: "",
    targetAmount: 0,
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [fundraisers, setFundraisers] = useState([]);

  // Handle input change for all form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image input and generate previews
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFundraisers([...fundraisers, formData]);
    console.log("New Fundraiser:", formData);
    console.log("All Fundraisers:", fundraisers);

    // Reset the form and image previews
    setFormData({
      title: "",
      description: "",
      images: [],
      deadline: "",
      targetAmount: 0,
    });
    setImagePreviews([]);
  };

  return (
    <div className="flex max-md:flex-row h-screen items-center justify-evenly p-5">
      <div className="w-1/2 max-md:w-full md:sticky mt-[80px] bg-[#283e2f] text-[#e0fce7] self-start border-2 rounded-3xl px-2">
        <h2 className="text-2xl font-medium mt-3 p-2 text-center md:text-left">
          Start a Fundraiser
        </h2>
        <hr />
        <form
          onSubmit={handleSubmit}
          className="space-y-4 overflow-scroll h-[70vh] p-2"
        >
          <div className="w-full">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter fundraiser title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 w-full px-3 py-2 bg-white text-black border rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>

          <div className="w-full">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Provide a detailed description..."
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 w-full px-3 py-2 bg-white text-black border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="file-input file-input-bordered bg-white text-black w-full file-input-info"
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

          <div className="flex gap-5">

          <div className="w-full">
            <label htmlFor="deadline" className="block text-sm font-medium">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              id="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              className="mt-1 w-full px-3 py-2 bg-white text-black border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="w-full">
            <label htmlFor="targetAmount" className="block text-sm font-medium">
              Target Amount (in USD)
            </label>
            <input
              type="number"
              name="targetAmount"
              id="targetAmount"
              value={formData.targetAmount}
              onChange={handleInputChange}
              className="mt-1 w-full px-3 py-2 bg-white text-black border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400"
          >
            Create Fundraiser
          </button>
        </form>
      </div>
      <div className="hidden md:block">
        <img className="rounded-full border-2" src="https://png.pngtree.com/png-clipart/20230120/ourmid/pngtree-financial-crowdfunding-banknotes-png-image_6178078.png" />
      </div>
    </div>
  );
};

export default CampaignForm;
