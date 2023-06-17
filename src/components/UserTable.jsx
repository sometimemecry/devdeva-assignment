import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

const UserTable = ({ users, handleDeleteUser, handleEditClick }) => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = users.slice(startIndex, endIndex);
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="pt-4 w-11/12 min-h-[400px] relative">
      <table className="w-full">
        <thead>
          <tr className="h-[50px]">
            <th className="px-8 text-center bg-gray-300">Profile picture</th>
            <th className="px-8 text-center bg-gray-300">First name</th>
            <th className="px-8 text-center bg-gray-300">Last name</th>
            <th className="hidden md:table-cell px-8 text-center bg-gray-300">
              Gender
            </th>
            <th className="hidden md:table-cell px-8 text-center bg-gray-300">
              Birthday
            </th>
            <th className="px-8 text-center bg-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user) => (
            <tr className="h-[80px] w-full" key={user.id}>
              <td className="h-[80px] flex justify-center items-center">
                <div className="w-[60px] h-[60px] overflow-hidden">
                  <img
                    src={user.userImage}
                    alt=""
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </td>
              <td className="text-center">{user.firstName}</td>
              <td className="text-center">{user.lastName}</td>
              <td className="hidden md:table-cell text-center">
                {user.gender}
              </td>
              <td className="hidden md:table-cell text-center">
                {user.birthday}
              </td>
              <td className="text-center">
                {/* Action icons */}
                <div className="flex gap-2 items-center justify-center">
                  <button
                    className="px-4 py-2 bg-yellow-400 rounded-md hidden md:block"
                    onClick={() => handleEditClick(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md hidden md:block"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                  <div className="flex md:hidden gap-1">
                    <FiEdit
                      className="text-yellow-400 cursor-pointer"
                      size={30}
                      onClick={() => handleEditClick(user.id)}
                    />
                    <BsTrash
                      className="text-red-600 cursor-pointer"
                      size={30}
                      onClick={() => handleDeleteUser(user.id)}
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <ul className="flex pr-6 absolute bottom-8 right-2 list-none">
          <li>
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="mr-1"
            >
              {"<"}
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 ${currentPage === index + 1 ? "active" : ""}`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="ml-1"
            >
              {">"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserTable;
