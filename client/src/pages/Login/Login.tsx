import React, { useState } from "react";
import HeaderTwo from "../../Componenets/HeaderTwo/HeaderTwo";
type User = {
  Name: string;
  password: string;
  email: string;
};
const Login = () => {
  const [signup, setSignup] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [data, setData] = useState<User>({
    Name: "",
    email: "",
    password: "",
  });
  console.log(data);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    e.preventDefault();
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const validateEmail = (value) => {
    if (!value.trim()) {
      return <h1 className="text-red-600  text-right">Email is required</h1>;
    }
    return null;
  };
  const validateName = (value) => {
    if (!value.trim()) {
      return <h1 className="text-red-600  text-right">Name is required</h1>;
    }
    return null;
  };

  const validatePassword = (value) => {
    if (!value.trim()) {
      return <h1 className="text-red-600  text-right">Password is required</h1>;
    }
    return null;
  };
  const handleAuth = () => {
    setSignup(!signup);
    setData({
      email: "",
      Name: "",
      password: "",
    });
    setErrors({
      email: "",
      password: "",
      name: "",
    })
  };
  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const emailError = validateEmail(data.email);
    const passwordError = validatePassword(data.password);
    const nameError = validateName(data.Name);
    setErrors({ email: emailError, password: passwordError,name:nameError });
    if (!emailError && !passwordError) {
    }
  };

  return (
    <div>
      <HeaderTwo />
      <div className="  flex flex-row bg-[url(./login_bg_2.jpeg)]    justify-center items-center w-screen h-screen">
        <div
          className={` w-96  ${
            signup ? "min-h-[31rem] max-h-[45rem]" : "min-h-[25rem] max-h-[30rem]"
          }   mt-10 rounded-lg pb-4   backdrop-blur-sm shadow-2xl shadow-black`}
        >
          <div className="bg-[url(./login_bg_2.jpeg)] h-20 p-0 rounded-xl rounded-b-none bg-no-repeat bg-cover"></div>
          <div className="   p-2 px-10 ">
            {signup ? (
              <form action="" className=" text-white space-y-5">
                <div className=" flex flex-col gap-2">
                  <h1>Name</h1>
                  <div className="p-2 bg-white rounded-md px-3">
                    <input
                      type="text"
                      onChange={handleChange}
                      name="Name"
                      value={data.Name}
                      
                      className="bg-white border-none w-full outline-none text-black font-semibold"
                    />
                  </div>
                  {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className=" flex flex-col gap-2">
                  <h1>Email</h1>
                  <div className="p-2 bg-white rounded-md px-3">
                    <input
                      type="email"
                      onChange={handleChange}
                      name="email"
                      value={data.email}
                      
                      className="bg-white border-none w-full outline-none text-black font-semibold"
                    />
                  </div>
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className=" flex flex-col gap-2">
                  <h1>Password</h1>
                  <div className="p-2 bg-white rounded-md px-3">
                    <input
                      type="password"
                      onChange={handleChange}
                      name="password"
                      value={data.password}
                      
                      className="bg-white border-none w-full outline-none text-black font-semibold"
                    />
                  </div>
                  {errors.password && (
                    <p className="error">{errors.password}</p>
                  )}
                </div>
                <div className=" space-y-0">
                  <p
                    onClick={handleAuth}
                    className="text-black text-sm font-semibold hover:cursor-pointer"
                  >
                    Already have an account ?
                  </p>
                </div>
                <div className=" flex flex-col gap-2">
                  <div className="p-3.5 bg-black rounded-md ">
                    <input
                      type="submit"
                      value={"Sign up"}
                      onClick={handleSubmit}

                      className=" border-none w-full outline-none text-white font-semibold"
                    />
                  </div>
                </div>
              </form>
            ) : (
              <form action="" className=" text-white space-y-5">
                <div className=" flex flex-col gap-2">
                  <h1>Email</h1>
                  <div className="p-2 bg-white rounded-md px-3">
                    <input
                      type="email"
                      onChange={handleChange}
                      name="email"
                      value={data.email}
                      required
                      className="bg-white border-none w-full outline-none text-black font-semibold"
                    />
                  </div>
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className=" flex flex-col gap-2">
                  <h1>Password</h1>
                  <div className="p-2 bg-white rounded-md px-3">
                    <input
                      type="password"
                      onChange={handleChange}
                      name="password"
                      value={data.password}
                      required
                      className="bg-white border-none w-full outline-none text-black font-semibold"
                    />
                  </div>
                  {errors.password && (
                    <p className="error">{errors.password}</p>
                  )}
                </div>
                <div className=" space-y-0">
                  <p
                    onClick={handleAuth}
                    className="text-black text-sm font-semibold hover:cursor-pointer"
                  >
                    Don't have an account ?
                  </p>
                </div>
                <div className=" flex flex-col gap-2">
                  <div className="p-3.5 bg-black rounded-md ">
                    <input
                      type="submit"
                      onClick={handleSubmit}
                      value={"Login"}
                      className=" border-none w-full outline-none text-white font-semibold"
                    />
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
// import React, { useState, useEffect } from 'react';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({
//     email:'',
//     password:''
//   });

//   const validateEmail = (value) => {
//     if (!value.trim()) {
//       return 'Email is required';
//     }
//     return null;
//   };

//   const validatePassword = (value) => {
//     if (!value.trim()) {
//       return 'Password is required';
//     }
//     return null;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const emailError = validateEmail(email);
//     const passwordError = validatePassword(password);
//     setErrors({ email: emailError, password: passwordError });
//     if (!emailError && !passwordError) {
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input type="email" id="email" name="email" value={email}  />
//         {errors.email && <p className="error">{errors.email}</p>}
//       </div>
//       <div>
//         <label htmlFor="password">Password:</label>
//         <input type="password" id="password" name="password" value={password}  />
//         {errors.password && <p className="error">{errors.password}</p>}
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default Login;
