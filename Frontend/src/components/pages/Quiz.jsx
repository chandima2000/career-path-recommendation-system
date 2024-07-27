import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { slideIn } from "../../utils/motion";
import { TypeAnimation } from "react-type-animation";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "regenerator-runtime/runtime";

const Quiz = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question1: "", // Numeric
    question2: "", // Numeric
    question3: "", // Numeric
    question4: "", // Numeric
    question5: "", // Numeric
    question6: "", // Numeric
    question7: "", // Categorical
    question8: "", // Categorical
    question9: "", // Numeric
    question10: "",
    question11: "", // Numeric
    question12: "", // Categorical
    question13: "", // Numeric
    question14: "", // Numeric
    question15: "",
    question16: "", // Numeric
    question17: "", // Categorical
    question18: "", // Numeric
    question19: "", // Numeric
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const fetchUserDetails = async () => {

  //   try{
  //   const response = await fetch('http://localhost:8000/api/get/user/', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
  //     },
  //   });
  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log(data.name)
  //     setUserName(data.name);
  //   } else {
  //     console.error('Failed to fetch user details');
  //   }
  // }catch(error)
  // {
  //   console.error('Error:', error);
  // }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/get/quiz/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(formData);

      const data = await res.json();

      navigate("/predict", {
        state: {
          prediction: data.prediction,
          probability: data.probability,
        },
      });

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };


  // useEffect (() => {
  //     fetchUserDetails()
  // },[])

  return (
    <div className="flex flex-col gap-10 overflow-hidden min-h-full sm:max-h-fit">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] p-8 rounded-xl"
      >
        <div className="text-center">
          {/* <p className="">Hello, {userName}</p> */}
          <TypeAnimation
            className="text-cyan-600 font-semibold text-6xl my-10"
            sequence={["Are you passionate to see your future ?"]}
            wrapper="span"
            cursor={false}
            style={{ display: "inline-block" }}
          />
          <div className="flex flex-row gap-8 text-center justify-center">
            <p className="text-red-500 text-3xl font-semibold">Try the Quiz</p>
            <button
              type="button"
              className="animate-bounce items-center focus:animate-none inline-flex text-md font-medium bg-red-600 mt-3 px-4 py-2 rounded-lg tracking-wide text-white cursor-text"
            >
              <HiOutlineChevronDoubleDown />
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 mx-48 flex flex-col gap-8 justify-items-center "
        >
          <div className="flex flex-col">
            <label>
              (1) How would you rate your logical reasoning skills on a scale
              from 1 to 9?
            </label>
            <input
              type="number"
              name="question1"
              value={formData.question1}
              onChange={handleChange}
              min="1"
              max="9"
              className="bg-transparent py-4 px-6 ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            />
          </div>

          <div className="flex flex-col">
            <label>(2) How many hackathons have you participated in ?</label>
            <input
              type="number"
              name="question2"
              value={formData.question2}
              onChange={handleChange}
              min="0"
              max="6"
              className="bg-transparent py-4 px-6  ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            />
          </div>

          <div className="flex flex-col">
            <label>
              (3) How would you rate your coding skills on a scale from 1 to 9 ?
            </label>
            <input
              type="number"
              name="question3"
              value={formData.question3}
              onChange={handleChange}
              min="1"
              max="9"
              className="bg-transparent py-4 px-6 ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            />
          </div>

          <div className="flex flex-col">
            <label>
              (4) How would you rate your public speaking skills on a scale from
              1 to 9 ?
            </label>
            <input
              type="number"
              name="question4"
              value={formData.question4}
              onChange={handleChange}
              min="1"
              max="9"
              className="bg-transparent py-4 px-6 ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            />
          </div>

          <div className="flex flex-col">
            <label>(5) Do you consider yourself good at self-learning ?</label>
            <select
              name="question5"
              value={formData.question5}
              onChange={handleChange}
              className="bg-transparent py-4 px-6 ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            >
              <option value="">Select an option</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>
              (6) Have you completed any extra courses outside your formal
              education ?
            </label>
            <select
              name="question6"
              value={formData.question6}
              onChange={handleChange}
              className="bg-transparent py-4 px-6 ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            >
              <option value="">Select an option</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>
              (7) Which of the following certifications do you have?
            </label>
            <select
              name="question7"
              value={formData.question7}
              onChange={handleChange}
              className="bg-transparent py-4 px-6 ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            >
              <option value="">Select an option</option>
              <option value="R Programming">R Programming</option>
              <option value="Information Security">Information Security</option>
              <option value="Shell Programming">Shell Programming</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Hadoop">Hadoop</option>
              <option value="Python">Python</option>
              <option value="Distro Making">Distro Making</option>
              <option value="App Development">App Development</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>
              (8) Which of the following workshops have you attended ?
            </label>
            <select
              name="question8"
              value={formData.question8}
              onChange={handleChange}
              className="bg-transparent py-4 px-6 ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            >
              <option value="">Select an option</option>
              <option value="Database Security">Database Security</option>
              <option value="System Designing">System Designing</option>
              <option value="Web Technologies">Web Technologies</option>
              <option value="Hacking">Hacking</option>
              <option value="Testing">Testing</option>
              <option value="Data Science">Data Science</option>
              <option value="Game Development">Game Development</option>
              <option value="Cloud Computing">Cloud Computing</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>
              (9) How would you rate your reading and writing skills ?
            </label>
            <select
              name="question9"
              value={formData.question9}
              onChange={handleChange}
              className="bg-transparent py-4 px-6 ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            >
              <option value="">Select an option</option>
              <option value="0">Poor</option>
              <option value="1">Medium</option>
              <option value="2">Excellent</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>(10) How would you rate your memory capability ?</label>
            <select
              name="question10"
              value={formData.question10}
              onChange={handleChange}
              className="bg-transparent py-4 px-6 ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            >
              <option value="">Select an option</option>
              <option value="0">Poor</option>
              <option value="1">Medium</option>
              <option value="2">Excellent</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>(11) Which subjects are you most interested in ?</label>
            <select
              name="question11"
              value={formData.question11}
              onChange={handleChange}
              className="bg-transparent py-4 px-6 ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            >
              <option value="">Select an option</option>
              <option value="0">Software Engineering</option>
              <option value="1">IOT</option>
              <option value="2">Cloud Computing</option>
              <option value="3">Programming</option>
              <option value="4">Networks</option>
              <option value="5">Computer Architecture</option>
              <option value="6">Data Engineering</option>
              <option value="7">Hacking</option>
              <option value="8">Management</option>
              <option value="9">Parallel Computing</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>(12) What is your preferred career area ?</label>
            <select
              name="question12"
              value={formData.question12}
              onChange={handleChange}
              className="bg-transparent py-4 px-6 ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            >
              <option value="">Select an option</option>
              <option value="0">System Developer</option>
              <option value="1">Security</option>
              <option value="2">Business Process Analyst</option>
              <option value="3">Developer</option>
              <option value="4">Testing</option>
              <option value="5">Cloud Computing</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>
              (13) What type of company would you like to work for ?
            </label>
            <select
              name="question13"
              value={formData.question13}
              onChange={handleChange}
              className="bg-transparent py-4 px-6 ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            >
              <option value="">Select an option</option>
              <option value="0">Service Based</option>
              <option value="1">Web Services</option>
              <option value="2">BPA</option>
              <option value="3">Testing and Maintenance Services</option>
              <option value="4">Product Based</option>
              <option value="5">Finance</option>
              <option value="6">Cloud Services</option>
              <option value="7">Product Development</option>
              <option value="8">Sales and Marketing</option>
              <option value="9">SAaS Services</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>(14) Do you take advice from seniors or elders ?</label>
            <select
              name="question14"
              value={formData.question14}
              onChange={handleChange}
              className="bg-transparent py-4 px-6 ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            >
              <option value="">Select an option</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>(15) What types of books do you enjoy reading ?</label>
            <select
              name="question15"
              value={formData.question15}
              onChange={handleChange}
              className="bg-transparent py-4 px-6 ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            >
              <option value="">Select an option</option>
              <option value="0">Guide</option>
              <option value="1">Health</option>
              <option value="2">Self help</option>
              <option value="3">Horror</option>
              <option value="4">Biographies</option>
              <option value="5">Science fiction</option>
              <option value="6">Satire</option>
              <option value="7">Children</option>
              <option value="8">Autobiographies</option>
              <option value="9">Prayer books</option>
              <option value="10">Fantasy</option>
              <option value="11">Journals</option>
              <option value="12">Trilogy</option>
              <option value="13">Anthology</option>
              <option value="14">Encyclopedias</option>
              <option value="15">Drama</option>
              <option value="16">Mystery</option>
              <option value="17">History</option>
              <option value="18">Science</option>
              <option value="19">Dictionaries</option>
              <option value="20">Diaries</option>
              <option value="21">Religion-Spirituality</option>
              <option value="22">Action and Adventure</option>
              <option value="23">Poetry</option>
              <option value="24">Cookbooks</option>
              <option value="25">Comics</option>
              <option value="26">Art</option>
              <option value="27">Travel</option>
              <option value="28">Series</option>
              <option value="29">Math</option>
              <option value="30">Romance</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>(16) Do you prefer management or technical roles ?</label>
            <select
              name="question16"
              value={formData.question16}
              onChange={handleChange}
              className="bg-transparent py-4 px-6 ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            >
              <option value="">Select an option</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>
              (17) Do you consider yourself a hard worker or a smart worker ?
            </label>
            <select
              name="question17"
              value={formData.question17}
              onChange={handleChange}
              className="bg-transparent py-4 px-6 ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            >
              <option value="">Select an option</option>
              <option value="0">Hard Worker</option>
              <option value="1">Smart Worker</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>(18) Have you ever worked in a team ?</label>
            <select
              name="question18"
              value={formData.question18}
              onChange={handleChange}
              className="bg-transparent py-4 px-6 ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            >
              <option value="">Select an option</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>(19) Are you an introvert ?</label>
            <select
              name="question19"
              value={formData.question19}
              onChange={handleChange}
              className="bg-transparent py-4 px-6 ml-16 mt-5 placeholder:text-secondary text-red-400 rounded border font-medium bg-black"
            >
              <option value="">Select an option</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
          <div className="flex flex-row justify-center items-center">
            <button
              type="submit"
              className=" py-3 px-8 rounded-xl bg-red-600 w-fit hover:bg-red-500 text-white font-semibold shadow-md shadow-primary"
            >
              Let's See Your Future
            </button>
          </div>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      ></motion.div>
    </div>
  );
};

export default Quiz;
