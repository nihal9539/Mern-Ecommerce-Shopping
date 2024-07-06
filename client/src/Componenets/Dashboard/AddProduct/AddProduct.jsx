import React, { useRef, useState } from "react";

import { IoMdArrowRoundBack } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import { FaPercentage } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { uploadProduct } from "../../../Action/uploadAction";
import { Helmet } from "react-helmet";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBack = () => {
    navigate(-1); // Navigate back by one step in the history stack
  };
  const imgref = useRef();
  const [image, setImage] = useState("");
  const [data, setData] = useState({
    productname: "",
    description: "",
    subTitle: "",
    price: null,
    image: null,
    discount: 0,
    gender: "",
    sizes: [
      { size: "S", quantity: null },
      { size: "M", quantity: null },
      { size: "L", quantity: null },
      { size: "XL", quantity: null },
    ],
  });

  // handle data
  const handledata = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Image converter
  const handleconvertToBase64 = (e) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setData((prevData) => ({
        ...prevData,
        image: reader.result,
      }));
    };
    reader.onerror = (err) => {
      console.log("error", err);
    };
  };

  // handleing size quantity
  const handleQuantityChange = (size, quantity) => {
    const updatedSizes = data.sizes.map((item) => {
      if (item.size === size) {
        return { ...item, quantity: Number(quantity) };
      }
      return item;
    });

    setData({ ...data, sizes: updatedSizes });
  };

  // submiting form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.image) {
      toast.error("Please select an image.");
    } else {
      dispatch(uploadProduct(data, navigate));
    }
  };
  const cancelImage = () => {
    setImage("");
    setData((prev) => ({
      ...prev,
      image: null,
    }));
  };

  console.log(data);
  return (
    <main className="">
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
              className=" border-2 outline-none rounded-lg p-2 w-full"
            />
            <input
              type="text"
              placeholder="Sub title"
              value={data.subTitle}
              required
              name="subTitle"
              onChange={handledata}
              className=" border-2 outline-none rounded-lg p-2 w-full"
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
              className=" border-2 resize-none outline-none rounded-lg p-2 w-full"
            />
          </div>
        </section>
        <section className="p-6  relative col-span-2 max-md:col-span-6 bg-white shadow-md rounded-2xl">
          <h1 className="mb-5 font-semibold text-lg">Product Image</h1>
          <div className="h-full">
            {image ? (
              <div className="relative">
                <img
                  src={image}
                  alt="Product"
                  className="h-80 w-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={cancelImage}
                  aria-label="Remove image"
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5"
                >
                  <IoMdClose size={20} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => imgref.current.click()}
                className=" border-2 border-gray-500 border-dashed rounded-lg flex flex-col gap-2 justify-center items-center h-80"
              >
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  ref={imgref}
                  onChange={handleconvertToBase64}
                  className="hidden"
                />
                <IoImageOutline size={25} />
                <span className="font-semibold max-lg:text-xs text-center">
                  Upload Your Product Image
                </span>
              </div>
            )}
          </div>
        </section>
        <section className=" p-6 col-span-4 max-md:col-span-6 bg-white shadow-md rounded-2xl">
          <h1 className="font-semibold text-lg mb-5">Pricing and Size</h1>

          {data?.sizes?.map((size, i) => (
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

          <div className=" mt-4 grid grid-cols-2 max-md:grid-cols-1 gap-2">
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
            <div>
              <label className="block">
                <span className="font-semibold">Discount</span>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-300 border border-r-0 rounded-l-md">
                    <FaPercentage />
                  </span>
                  <input
                    type="number"
                    name="discount"
                    value={data.discount}
                    onChange={handledata}
                    max={100}
                    min={0}
                    className="border border-gray-300 rounded-r-md flex-1 p-2"
                  />
                </div>
              </label>
            </div>
          </div>
        </section>
        <section className="p-6 max-md:top-0  relative col-span-2 max-md:col-span-6 bg-white shadow-md rounded-2xl">
          <h1 className="mb-5 font-semibold text-lg">Gender</h1>

          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={data.gender}
              label="Gender"
              name="gender"
              onChange={handledata}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
          </FormControl>
        </section>
        <section className=" p-6 col-span-6 flex gap-2 justify-end  ">
          <button
            type="button"
            className="btn bg-gray-400 hover:bg-gray-500 text-white"
            onClick={() => navigate(-1)}
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
