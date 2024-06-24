import React, { useEffect, useRef, useState } from "react";

import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { FaPercentage } from "react-icons/fa";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProduct,
  getProductById,
  updateProduct,
} from "../../../Action/ProductAction";

const EditProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productReducer);

  const [data, setData] = useState({
    productname: "",
    description: "",
    subTitle: "",
    price: "",
    discountprice: "",
    gender: "",
    image: "",
    sizes: [],
  });
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProductById(id));
    setData({
      productname: product?.productname,
      description: product?.description,
      subTitle: product?.subTitle,
      price: product.price,
      discountprice: product.description,
      gender: product?.gender,
      sizes: product?.sizes.map((item) => {
        return { size: item.size, quantity: item.quantity };
      }),
    });
  }, []);

  const handleBack = () => {
    navigate(-1); // Navigate back by one step in the history stack
    setData({
      productname: "",
      description: "",
      subTitle: "",
      price: "",
      discountprice: "",
      gender: "",
      image: "",
      sizes: [],
    });
  };
  const imgRef = useRef();
  const [image, setImage] = useState(product?.image?.url);

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
      imgRef.current.value = "";
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
    dispatch(updateProduct(id, data, navigate));
    dispatch(getAllProduct());
    setData({
      productname: "",
      description: "",
      subTitle: "",
      price: "",
      discountprice: "",
      gender: "",
      image: "",
      sizes: [],
    });
  };

  const handleImageClick = () => {
    imgRef.current.click();
  };

  return (
    <div className="">
      <IoMdArrowRoundBack
        size={35}
        className=" rounded-full max-sm:hidden cursor-pointer bg-main-blue flex justify-center items-center p-1.5 text-white"
        onClick={handleBack}
      />
      <form className="p-2 pt-8 grid gap-8 grid-cols-6" onSubmit={handleSubmit}>
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
              maxLength={800}
              placeholder="Description"
              value={data.description}
              name="description"
              onChange={handledata}
              className=" border-2 resize-none outline-none rounded-lg p-2 w-full"
            />
          </div>
        </div>
        <div className="p-6 h-[23rem] relative col-span-2 max-md:col-span-6 bg-white shadow-md rounded-2xl">
          <div className="h-full">
            <div className="mb-5 flex items-center justify-between text-lg font-semibold">
              <span>Product Image</span>
            </div>

            <div>
              <img src={image} className="h-56 w-full" alt="Image" />
            </div>

            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              ref={imgRef}
              onChange={handleconvertToBase64}
              className="hidden"
            />
            {/* <IoImageOutline size={25} onClick={()=>imgRef.current.click()} /> */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleImageClick}
                className="font-semibold max-lg:text-xs text-center bg-black text-white mt-5 rounded-md p-2"
              >
                Change Your Product Image
              </button>
            </div>
          </div>
        </div>
        <div className=" p-6 col-span-4 max-md:col-span-6 bg-white shadow-md rounded-2xl">
          <div className="w-full    gap-2 items-center">
            <h1 className="font-semibold text-lg mb-5">Pricing and Size</h1>
          </div>

          {data?.sizes?.map((size, i) => (
            <div key={i} className="w-full flex mb-2 items-center">
              <div className="w-28">{size.size} quantity :</div>
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
                  min={0}
                  className="  h-full px-2 outline-none w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 max-md:top-0 -top-12 relative col-span-2 max-md:col-span-6 bg-white shadow-md rounded-2xl">
          <h1 className="mb-5 font-semibold text-lg">Gender</h1>

          <FormControl sx={{}} className="w-full" required>
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
        </div>
        <div className=" p-6 col-span-6 flex gap-2 justify-end  ">
          <div className="btn bg-gray-400 hover:bg-gray-400 text-white">
            Cancel
          </div>
          <button
            type="submit"
            className="btn bg-main-blue text-white hover:bg-main-blue"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
