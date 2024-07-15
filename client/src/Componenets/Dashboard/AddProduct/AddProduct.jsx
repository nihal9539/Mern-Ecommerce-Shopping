import React, { useRef, useState } from "react";
import { IoMdArrowRoundBack, IoMdClose } from "react-icons/io";
import { IoAdd, IoImageOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaPercentage } from "react-icons/fa";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { uploadProduct } from "../../../Action/uploadAction";
import { Helmet } from "react-helmet";
import { CategoryItems } from "../../../assets/data";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imgref = useRef();
  const [images, setImages] = useState([]);
  const [data, setData] = useState({
    productname: "",
    description: "",
    subTitle: "",
    price: null,
    gender: "",
    sizes: [
      { size: "S", quantity: 0 },
      { size: "M", quantity: 0 },
      { size: "L", quantity: 0 },
      { size: "XL", quantity: 0 },
    ],
    category: [],
  });

  const handleBack = () => {
    navigate(-1); // Navigate back by one step in the history stack
  };

  const handledata = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleconvertToBase64 = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert("You can only upload a maximum of 5 images");
      return;
    } else {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImages((prevImages) => [
            ...prevImages,
            { file, base64: reader.result },
          ]);
        };
        reader.onerror = (err) => {
          toast.error(err);
          console.log("error", err);
        };
      });
    }
  };
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleQuantityChange = (size, quantity) => {
    const updatedSizes = data.sizes.map((item) => {
      if (item.size === size) {
        return { ...item, quantity: Number(quantity) };
      }
      return item;
    });

    setData({ ...data, sizes: updatedSizes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("Please select at least one image.");
    } else {
      const imageData = images.map((img) => img.base64);
      const productData = { ...data, images: imageData };
      dispatch(uploadProduct(productData, navigate));
    }
  };

  const handleCancel = () => {
    setData({
      productname: "",
      description: "",
      subTitle: "",
      price: null,
      gender: "",
      sizes: [
        { size: "S", quantity: 0 },
        { size: "M", quantity: 0 },
        { size: "L", quantity: 0 },
        { size: "XL", quantity: 0 },
      ],
      category: [],
    });
    navigate(-1);
  };

  const handleCategory = (check) => {
    setData((prevData) => {
      if (prevData.category.includes(check)) {
        return {
          ...prevData,
          category: prevData.category.filter((item) => item !== check),
        };
      } else {
        return {
          ...prevData,
          category: [...prevData.category, check],
        };
      }
    });
  };
  return (
    <main>
      <Helmet>
        <title>Add Product - Admin Dashboard</title>
        <meta
          name="description"
          content="Add a new product to the inventory with detailed information."
        />
      </Helmet>
      <header className="flex justify-between items-center mb-4">
        <button
          onClick={handleBack}
          aria-label="Go back"
          className="flex items-center justify-center p-2 bg-main-blue text-white rounded-full hover:bg-blue-700 focus:outline-none"
        >
          <IoMdArrowRoundBack size={25} />
        </button>
      </header>
      <form className="p-2 pt-8 grid gap-8 grid-cols-6" onSubmit={handleSubmit}>
        <section className="p-6 col-span-4 max-md:col-span-6 bg-white shadow-md rounded-2xl">
          <h1 className="mb-5 font-semibold text-lg"> Basic Information</h1>
          <div className="space-y-5">
            <input
              type="text"
              placeholder="Product name"
              name="productname"
              value={data.productname}
              required
              onChange={handledata}
              className="border-2 outline-none rounded-lg p-2 w-full"
            />
            <input
              type="text"
              placeholder="Sub title"
              value={data.subTitle}
              required
              name="subTitle"
              onChange={handledata}
              className="border-2 outline-none rounded-lg p-2 w-full"
            />
            <textarea
              type="text"
              rows={6}
              required
              maxLength={800}
              placeholder="Description"
              value={data.description}
              name="description"
              onChange={handledata}
              className="border-2 resize-none outline-none rounded-lg p-2 w-full"
            />
          </div>
        </section>
        <section className="p-6 col-span-2 max-md:col-span-6 bg-white  shadow-md rounded-2xl">
          <h1 className="mb-5 font-semibold text-lg">Product Images</h1>
          <div className="h-72 overflow-auto">
            {images.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img.base64}
                      alt={`Product ${index + 1}`}
                      className="h-40 w-full object-cover rounded-lg"
                    />
                    
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      aria-label="Remove image"
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5"
                    >
                      <IoMdClose size={20} />
                    </button>
                  </div>
                ))}
                {images.length < 5 && (
                  <div
                    onClick={() => imgref.current.click()}
                    className="border-2 border-gray-500 border-dashed rounded-lg flex flex-col gap-2 justify-center items-center h-40 cursor-pointer"
                  >
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      multiple
                      ref={imgref}
                      onChange={handleconvertToBase64}
                      className="hidden"
                    />
                    <IoAdd size={40} />
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={() => imgref.current.click()}
                className="border-2 border-gray-500 border-dashed rounded-lg flex flex-col gap-2 justify-center items-center h-72"
              >
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  multiple
                  ref={imgref}
                  onChange={handleconvertToBase64}
                  className="hidden"
                />
                <IoImageOutline size={25} />
                <span className="font-semibold max-lg:text-xs text-center">
                  Upload Your Product Images
                </span>
              </div>
            )}
          </div>
        </section>
        <section className="p-6 col-span-4 max-md:col-span-6 bg-white shadow-md rounded-2xl">
          <h1 className="font-semibold text-lg mb-5">Pricing and Size</h1>
          {data.sizes.map((size, i) => (
            <div key={i} className="w-full flex mb-2 items-center">
              <label className="w-28">{size.size} quantity :</label>
              <input
                type="number"
                min={"0"}
                value={size.quantity}
                onChange={(e) =>
                  handleQuantityChange(size.size, e.target.value)
                }
                className="p-1.5 rounded-lg border-2 outline-none"
              />
            </div>
          ))}
          <div className="mt-4 grid grid-cols-2 max-md:grid-cols-1 gap-2">
            <div>
              <label className="block">
                <span className="font-semibold">Price</span>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-300 border border-r-0 rounded-l-md">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={data.price}
                    onChange={handledata}
                    required
                    className="border border-gray-300 rounded-r-md flex-1 p-2"
                  />
                </div>
              </label>
            </div>

          </div>
        </section>
        <section className="p-6 col-span-2 max-md:col-span-6 bg-white shadow-md rounded-2xl">
          <h1 className="mb-3 font-semibold text-lg">Gender</h1>
          <FormControl fullWidth required>
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select
              labelId="gender-select-label"
              id="gender-select"
              value={data.gender}
              label="Gender"
              name="gender"
              onChange={handledata}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>

            <div className="mt-10 ">
              <h1 className="mb-3 font-semibold text-lg">Category</h1>

              <div className="space-y-2 h-40 overflow-auto">
                {CategoryItems.map((checkitem) => (
                  <label key={checkitem} className="container">
                    {checkitem}
                    <input
                      type="checkbox"
                      name="category"
                      value={checkitem}
                      checked={data.category.includes(checkitem)}
                      onChange={() => handleCategory(checkitem)}
                    />
                    <span className="checkmark"></span>
                  </label>
                ))}
              </div>
            </div>
          </FormControl>
        </section>
        <section className=" p-6 col-span-6 flex gap-2 justify-end  ">
          <button
            type="button"
            className="btn bg-gray-400 hover:bg-gray-500 text-white"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn bg-main-blue text-white hover:bg-blue-500"
          >
            Add Product
          </button>
        </section>
      </form>
    </main>
  );
};

export default AddProduct;
