import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { startFundraiser } from "../apis/fundRaiser";
const CampaignForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [imagePreviews, setImagePreviews] = useState([]);
  const [fundraisers, setFundraisers] = useState([]);
  const navigate = useNavigate();

  // Handle image input and generate previews
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);

    // Convert images to Base64 format
    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
        });
      })
    ).then((base64Images) => {
      setListings((prev) => ({
        ...prev,
        images: base64Images,
      }));
    });
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        title: data.title,
        desc: data.description,
        target_funds: data.targetAmount,
        deadline: data.deadline,
        images: fundraisers.images,
      };

      await startFundraiser(payload);
      reset();
      setImagePreviews([]);
      toast.success("Fund Raiser started successfully");
      navigate("/");
    } catch (error) {
      console.error("Error creating listing:", error);
      toast.error("Error creating listing");
    }
  };
  return (
    <div className="flex max-md:flex-row h-screen items-center justify-evenly p-5">
      <div className="w-1/2 max-md:w-full md:sticky mt-[80px] bg-[#283e2f] text-[#e0fce7] self-start border-2 rounded-3xl px-2">
        <h2 className="text-2xl font-medium mt-3 p-2 text-center md:text-left">
          Start a Fundraiser
        </h2>
        <hr />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 overflow-scroll h-[70vh] p-2"
        >
          <div className="w-full">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter Title"
              id="title"
              className="mt-1 flex w-[100%] px-3 h-[60%] bg-white text-black py-2 border rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              id="description"
              placeholder="Enter the description in detail ..."
              className="mt-1 flex w-[100%] bg-white px-3 py-2 text-black border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm mb-1 font-medium">
              Images
            </label>
            <input
              type="file"
              id="image"
              {...register("images")}
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

          <div className="flex gap-5">
            <div className="w-full">
              <label htmlFor="deadline" className="block text-sm font-medium">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                id="deadline"
                {...register("deadline", { required: "Deadline is required" })}
                className="mt-1 w-full px-3 py-2 bg-white text-black border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onClick={(e) => e.target.showPicker()}
              />
              {errors.deadline && (
                <p className="text-red-500 text-xs">
                  {errors.deadline.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="targetAmount"
                className="block text-sm font-medium"
              >
                Target Amount (in USD)
              </label>
              <input
                type="number"
                name="targetAmount"
                id="targetAmount"
                {...register("targetAmount", {
                  required: "Target Amount is required",
                })}
                className="mt-1 w-full px-3 py-2 bg-white text-black border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.targetAmount && (
                <p className="text-red-500 text-xs">
                  {errors.targetAmount.message}
                </p>
              )}
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
        <img
          className="rounded-full border-2"
          src="https://png.pngtree.com/png-clipart/20230120/ourmid/pngtree-financial-crowdfunding-banknotes-png-image_6178078.png"
        />
      </div>
    </div>
  );
};

export default CampaignForm;
