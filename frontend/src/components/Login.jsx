import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          role: data.dropdown,
        }),
      });
     
      const result = await response.json();
      console.log("login result", result);

      if (response.ok) {
        alert("login succesful");
         // to store the email in local storage
        localStorage.setItem("userEmail", data.email);
        navigate(`/${data.dropdown}`); // Navigate based on selected role
      } else {
        alert(result.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1511316695145-4992006ffddb?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 backdrop-blur-md bg-white/20 text-white p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email address
          </label>
          <input
            id="email"
            placeholder="eg: abc@gmail.com"
            type="text"
            {...register("email", { required: "This field is required" })}
            className="w-full px-3 py-2 rounded bg-white bg-opacity-20 text-black placeholder-gray-700 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.email && <div className="text-red-300 text-sm mt-1">{errors.email.message}</div>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: "This field is required",
              minLength: { value: 3, message: "Minimum length is 3" },
            })}
            className="w-full px-3 py-2 rounded bg-white bg-opacity-20 text-black placeholder-gray-700 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.password && <div className="text-red-300 text-sm mt-1">{errors.password.message}</div>}
        </div>

        {/* Select Role */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Select Role</label>
          <select
            {...register("dropdown", { required: "You have to select one of them" })}
            className="w-full px-3 py-2 rounded bg-white bg-opacity-20 text-black border border-white/40 focus:outline-none"
          >
            <option value="">-- Select Role --</option>
            <option value="voyager">Voyager</option>
            <option value="manager">Manager</option>
             <option value="headcook">Head Cook</option>
              <option value="supervisor">Supervisor</option>
          </select>
          {errors.dropdown && <div className="text-red-300 text-sm mt-1">{errors.dropdown.message}</div>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
