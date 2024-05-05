import React, { useRef, useState } from "react";

import { IoMdArrowRoundBack } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import { FaPercentage } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AddProduct = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate back by one step in the history stack
  };
  const imgref = useRef();

  const [quantities, setQuantities] = useState({
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
  });
  const sizes = ["S", "M", "L", "XL"];

  const handleQuantityChange = (size, quantity) => {
    setQuantities((prevState) => ({
      ...prevState,
      [size]: quantity,
    }));
  };
  const [data, setData] = useState({
    productname: "",
    description: "",
    subTitle: "",
    price: "",
    image: null,
    discountprice: "",
  });
  const handledata = (e) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [imageBase64, setImageBase64] = useState("");
  const [image, setImage] = useState("");

  const handleconvertToBase64 = (e) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImageBase64(reader.result);
    };
    reader.onerror = (err) => {
      console.log("error", err);
    };
  };
  const [gender, setGender] = useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div className="">
      <IoMdArrowRoundBack
        size={35}
        className=" rounded-full max-sm:hidden cursor-pointer bg-main-blue flex justify-center items-center p-1.5 text-white"
        onClick={handleBack}
      />
      <form className="p-2 pt-8 grid gap-8 grid-cols-6">
        <div className="p-6 col-span-4 max-md:col-span-6 bg-white shadow-md rounded-2xl">
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
              maxLength={400}
              placeholder="Description"
              value={data.description}
              name="description"
              onChange={handledata}
              className=" border-2 resize-none outline-none rounded-lg p-2 w-full"
            />
          </div>
        </div>
        <div className="p-6 h-[21.5rem] relative col-span-2 max-md:col-span-6 bg-white shadow-md rounded-2xl">
          <div className="h-full">
            <div className="mb-5 flex items-center justify-between text-lg font-semibold">
              <span>Product Image</span>
              {image && <IoMdClose fill="red" onClick={() => setImage("")} />}
            </div>
            {image ? (
              <div>
                <img src={image} className="h-60 w-full" alt="" />
                <button onClick={() => setImage("")}>change</button>
              </div>
            ) : (
              <div
                onClick={() => imgref.current.click()}
                className=" border-2 border-gray-500 border-dashed rounded-lg flex flex-col gap-2 justify-center items-center h-60"
              >
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  ref={imgref}
                  onChange={handleconvertToBase64}
                  className="hidden"
                />
                <IoImageOutline size={25} />
                <h1 className="font-semibold max-lg::text-xs">
                  Upload Your Product Image
                </h1>
              </div>
            )}
          </div>
        </div>
        <div className=" p-6 col-span-4 max-md:col-span-6 bg-white shadow-md rounded-2xl">
          <div className="w-full    gap-2 items-center">
            <h1 className="font-semibold text-lg mb-5">Pricing and Size</h1>
          </div>

          {sizes.map((size) => (
            <div key={size} className="w-full flex mb-2 items-center">
              <div className="w-28">{size} quantity :</div>
              <input
                type="number"
                min={"0"}
                onClick={(e) => handleQuantityChange(size, e.target.value)}
                className="p-1.5 rounded-lg border-2 outline-none"
              />
            </div>
          ))}

          <div className=" mt-4 grid grid-cols-2 max-md:grid-cols-1 gap-2">
            <div>
              <h1 className="font-semibold mb-2">Price</h1>
              <div className="flex flex-row border-2 h-10 rounded-lg">
                <div className=" w-10 rounded-md rounded-r-none flex justify-center items-center bg-gray-300">
                  ₹
                </div>
                <input
                  type="number"
                  name="price"
                  onChange={handledata}
                  value={data.price}
                  required
                  className="number-input h-full px-2 outline-none w-full"
                />
              </div>
            </div>
            <div>
              <h1 className="font-semibold mb-2">Discount</h1>
              <div className="flex flex-row border-2 h-10 rounded-lg">
                <div className=" w-10 rounded-md rounded-r-none flex justify-center items-center bg-gray-300">
                  <FaPercentage />
                </div>
                <input
                  type="number"
                  name="discountprice"
                  value={data.discountprice}
                  onChange={handledata}
                  max={100}
                  className="  h-full px-2 outline-none w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 -top-12 relative col-span-2 max-md:col-span-6 bg-white shadow-md rounded-2xl">
        <h1 className="mb-5 font-semibold text-lg">Gender</h1>

          <FormControl sx={{}} className="w-full" required>
            <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={gender}
              label="Gender"
              onChange={handleChange}
            >
             
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className=" p-6 col-span-6 flex gap-2 justify-end  ">
          <div className="btn bg-gray-400 hover:bg-gray-400 text-white">
            Cancel
          </div>
          <button type="submit" className="btn bg-main-blue text-white hover:bg-main-blue">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
