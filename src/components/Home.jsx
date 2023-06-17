import React, { useState } from "react";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import UserTable from "./UserTable";
import mockImage from "../assets/images/mockImage.png";
import { useSnackbar } from "notistack";

const mockUser = [
  {
    id: 0,
    userImage: mockImage,
    firstName: "Rattapong",
    lastName: "Sukjai",
    gender: "male",
    birthday: "13 Jun 2023",
  },
  {
    id: 1,
    userImage: mockImage,
    firstName: "Somchai",
    lastName: "Rirut",
    gender: "male",
    birthday: "19 Apr 2023",
  },
  {
    id: 2,
    userImage: mockImage,
    firstName: "Somchai",
    lastName: "Rirut",
    gender: "male",
    birthday: "21 Oct 2023",
  },
];

const Home = () => {
  const [sector, setSector] = useState("Users List");
  const [users, setUsers] = useState([...mockUser]);
  const [editingUser, setEditingUser] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleAddClick = () => {
    setSector("Create new User");
  };

  const handleEditClick = (userId) => {
    setSector("Edit User");
    const userToEdit = users.find((user) => user.id === userId);
    setEditingUser(userToEdit);
    console.log(userToEdit);
  };

  const handleCancelClick = () => {
    setSector("Users List");
  };

  const handleSaveUser = (userData) => {
    if (editingUser) {
      // If editingUser exists, update the existing user
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id ? { ...user, ...userData } : user
        )
      );
    } else {
      // If editingUser is null, create a new user
      setUsers((prevUsers) => [...prevUsers, userData]);
    }
    setSector("Users List");
    setEditingUser(null);
    console.log(userData);
  };

  const handleDeleteUser = (userId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmation) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    }
    enqueueSnackbar("Delete User Complete", { variant: "error" });
  };

  let changeSector;
  if (sector === "Create new User") {
    changeSector = (
      <CreateUser
        handleCancelClick={handleCancelClick}
        handleSaveUser={handleSaveUser}
        users={users}
      />
    );
  } else if (sector === "Edit User") {
    changeSector = (
      <EditUser
        editingUser={editingUser}
        handleCancelClick={handleCancelClick}
        handleSaveUser={handleSaveUser}
      />
    );
  } else if (sector === "Users List") {
    changeSector = (
      <UserTable
        users={users}
        handleDeleteUser={handleDeleteUser}
        handleEditClick={handleEditClick}
      />
    );
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col w-full sm:w-[1200px] items-center border border-gray-700">
        {/* Navbar */}
        <div className="flex justify-between items-center w-full bg-blue-500 h-[50px]">
          <h2 className="text-white text-xl px-4">User Management</h2>
          <div className="w-[40px] h-[40px] flex justify-center items-center bg-white rounded-full mx-4">
            <p className="w-full h-full rounded-full text-center text-3xl font-thin flex justify-center items-center">
              D
            </p>
          </div>
        </div>
        {/* User list section */}
        <div className="flex justify-between w-full py-4 items-center">
          <p className="text-gray-500 text-xl font-thin px-4">{sector}</p>
          <button
            className="border px-6 py-2 rounded-md bg-blue-500 text-white mx-4 hover:bg-blue-800 hover:duration-300"
            onClick={handleAddClick}
          >
            Add +
          </button>
        </div>
        {changeSector}
      </div>
    </div>
  );
};

export default Home;
