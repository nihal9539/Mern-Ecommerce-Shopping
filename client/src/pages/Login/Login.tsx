import React, { useState } from "react";
import HeaderTwo from "../../Componenets/HeaderTwo/HeaderTwo";
 type User = {
    Name:string,
    password:string
    email:string

}
const Login = () => {
    const [data,setData]= useState<User>({
        Name:"",
        email:"",
        password:""
    })
    console.log(data);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        e.preventDefault()
        setData(prevData => ({ ...prevData, [name]: value, }))

    }
    
  return (
    <div>
      <HeaderTwo />
      <div className="  flex flex-row bg-[url(./login_bg_2.jpeg)]    justify-center items-center w-screen h-screen">
        <div className=" w-96   h-[25rem] mt-10 rounded-lg   backdrop-blur-sm shadow-2xl shadow-black">
          <div className="bg-[url(./login_bg_2.jpeg)] h-24 p-0 rounded-xl rounded-b-none bg-no-repeat bg-cover"></div>
          <div className="   p-2 px-10 ">
            <form action="" className=" text-white space-y-5">
    
              <div className=" flex flex-col gap-2">
                <h1>Email</h1>
                <div className="p-2 bg-white rounded-md px-3">
                  <input type="email" onChange={handleChange} name="email" value={data.email} required className="bg-white border-none w-full outline-none text-black font-semibold" />
                </div>
              </div>
              <div className=" flex flex-col gap-2">
                <h1>Password</h1>
                <div className="p-2 bg-white rounded-md px-3">
                  <input type="password" onChange={handleChange} name="password" value={data.password} required className="bg-white border-none w-full outline-none text-black font-semibold" />
                </div>
              </div>
              <div className=" space-y-0">
                <p className="text-black text-sm font-semibold hover:cursor-pointer">Don't have an account ?</p>
              
              </div>
              <div className=" flex flex-col gap-2">
                <div className="p-3.5 bg-black rounded-md ">
                  <input type="submit" value={"Login"}  className=" border-none w-full outline-none text-white font-semibold" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
