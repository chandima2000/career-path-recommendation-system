import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { EarthCanvas } from "../canvas";
import { slideIn } from "../../utils/motion";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "regenerator-runtime/runtime";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/auth/signin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        setLoading(false);
        //alert(Error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Credentials!",
        });
        return;
      }
      setLoading(false);
      navigate("/quiz");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`xl:mt-0 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden min-h-screen`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] p-8 rounded-2xl"
      >
        <h3 className={styles.sectionHeadText}>Sign in</h3>

        <form className="mt-12 flex flex-col gap-8">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your email</span>
            <input
              type="email"
              id="email"
              placeholder="What's your email?"
              className="bg-transparent py-4 px-6 placeholder:text-secondary text-white rounded border font-medium"
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Password</span>
            <input
              type="password"
              id="password"
              placeholder="your Password?"
              className="bg-transparent py-4 px-6 placeholder:text-secondary text-white rounded border font-medium"
              onChange={handleChange}
            />
          </label>
          <button
            type="submit"
            className="py-3 px-8 rounded-xl bg-red-600 w-fit text-black font-bold shadow-md shadow-primary hover:bg-red-400"
            onClick={handleSubmit}
          >
            {loading ? "Signin..." : "Sign In"}
          </button>
          <div className="flex gap-10 items-center">
            <p className="">Don't have an Account?</p>
            <Link
              to={"/signup"}
              className="py-3 px-8 rounded-xl bg-red-600 w-fit text-black font-bold shadow-md shadow-primary
                          hover:bg-red-400"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SignIn;
