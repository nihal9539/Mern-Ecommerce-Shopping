import { IoAdd } from "react-icons/io5";


const DashboardProduct = () => {
  return (
    <div className="">
      <div>
        <h1 className="text-2xl font-bold">Products</h1>
      </div>

      <div className="w-full  bg-gray-500 ">
        <button className="float-right flex items-center border-2 p-2 rounded-md border-main-blue text-main-blue">
          <IoAdd className="" size={30}/>
          <span>New product</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardProduct;
