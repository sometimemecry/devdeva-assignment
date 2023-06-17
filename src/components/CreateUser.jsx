import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import mockImage from "../assets/images/mockImage.png";
import { useSnackbar } from "notistack";

const CreateUser = ({ handleCancelClick, handleSaveUser, users }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const { register, handleSubmit, setValue } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (event) => {
    event.preventDefault();
    setPreviewImage(null);
  };

  const handleSaveClick = (formData) => {
    if (!formData.firstName) {
      alert("Please enter first name");
      return;
    }

    if (!formData.lastName) {
      alert("Please enter last name");
      return;
    }

    const confirmation = window.confirm("Are you sure you want to save?");
    if (confirmation) {
      const newId = users.length > 0 ? users[users.length - 1].id + 1 : 0;
      if (!formData.firstName) {
        alert("Please enter first name");
        return;
      }

      if (!formData.lastName) {
        alert("Please enter last name");
        return;
      }

      if (!previewImage) {
        formData.userImage = mockImage;
      } else {
        formData.userImage = previewImage;
      }

      formData.id = newId;

      handleSaveUser(formData);
      setValue("firstName", "");
      setValue("lastName", "");
      setValue("gender", "");
      setValue("birthday", "");
      setPreviewImage(null);
      enqueueSnackbar("Create User Success", { variant: "success" });
    }
  };

  const handleDateChange = (date) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      setSelectedDate(date);
      const formattedDate = format(date, "dd MMM yyyy");
      setValue("birthday", formattedDate);
    } else {
      setSelectedDate(null);
      setValue("birthday", "");
    }
  };

  return (
    <form className="w-full h-auto sm:flex" encType="multipart/form-data">
      <div className="sm:w-1/3 flex flex-col mt-8 items-center">
        <div className="w-[200px] h-[200px] sm:w-[200px] sm:h-[200px]">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full border border-black flex items-center justify-center"></div>
          )}
        </div>
        <label className="px-[12px] py-[8px] bg-[#3b82f6] text-white rounded-md flex justify-center items-center mt-8 hover:cursor-pointer hover:bg-blue-800 hover:duration-300">
          Upload Profile Picture
          <input className="hidden" type="file" onChange={handleImageChange} />
        </label>
        <button
          className="mt-4 mb-12 px-[12px] py-[8px] bg-red-600 text-white rounded-md hover:bg-red-800 hover:duration-300"
          onClick={handleDeleteImage}
        >
          Delete Picture
        </button>
      </div>

      {/* Left Section */}
      <div className="sm:w-2/3 flex flex-col items-center justify-center gap-12 p-4">
        <div className="flex flex-col sm:flex-row gap-8">
          <div>
            <p className="text-xl text-gray-500">First Name</p>
            <input
              className="border w-full sm:w-[250px] h-[45px] rounded-md px-2 py-4"
              type="text"
              {...register("firstName")}
              placeholder="Please enter First name"
            />
          </div>
          <div>
            <p className="text-xl text-gray-500">Last Name</p>
            <input
              className="border w-full sm:w-[250px] h-[45px] rounded-md px-2 py-4"
              type="text"
              {...register("lastName")}
              placeholder="Please enter Last name"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-8">
          <div>
            <p className="text-xl text-gray-500">Gender</p>
            <select
              className="border w-full sm:w-[250px] h-[45px] rounded-md px-2 text-gray-500"
              {...register("gender")}
            >
              <option value="" disabled>
                Please select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="Not Specified">Prefer not to answer</option>
            </select>
          </div>
          <div>
            <p className="text-xl text-gray-500">Birthday</p>
            <DatePicker
              className="border w-full sm:w-[250px] h-[45px] rounded-md px-2 py-4"
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/YYYY"
            />
          </div>
        </div>
        <div className="flex gap-4 w-full justify-end pr-10">
          <button
            onClick={handleCancelClick}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-800 hover:duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(handleSaveClick)}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-800 hover:duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateUser;
