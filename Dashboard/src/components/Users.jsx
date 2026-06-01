import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import {deleteUser, fetchAllUsers} from '../store/slices/adminSlice'


const Users = () => {

  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const {loading, users, totalUsers} = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers(page))
  }, [dispatch, page]);

  useEffect(() => {
    if(totalUsers !== undefined) {
      const newMax = Math.ceil(totalUsers / 10);
      setMaxPage(newMax || 1);
    }
  }, [totalUsers]);

  useEffect(() => {
    if(maxPage && page > maxPage) {
      setPage(maxPage);
    }
  }, [maxPage, page]);

  const handleDeleteUser = (id) => {
    // if(totalUsers === 11) {
    //   setMaxPage(1);
    // }
    dispatch(deleteUser(id, page));
  };

  return (
    <main className="p-2.5 pl-2.5 md:pl-68 w-full">
      {/* Header */}
      <div className="flex-1 md:p-6">
        <Header />
        <h1 className="text-2xl font-bold">All Users</h1>
        <p className="text-sm text-gray-600 mb-6">Manage All Your Websites Users</p>
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
          <div 
            className={`overflow-x-auto rounded-lg ${loading ? 'p-10 shadow-none' : `${users && users?.length > 0 && 'shadow-lg'}`}`}
          >
            {
              loading ? (
                <div className="w-40 h-40 mx-auto border-2 border-white border-t-transparent rounded-full animate-spin"/>

              ) : users && users?.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-blue-100 text-gray-700 ">
                    <tr>
                      <th className="py-3 px-4 text-left">Avatar</th>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Email</th>
                      <th className="py-3 px-4 text-left">Registered on</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <img 
                            src={user.avatar || avatar} 
                            alt={user.name} 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </td>
                        <td className="py-3 px-4 font-medium">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500 text-lg">No users found</p>
                </div>
              )
            }
          </div>

          {/* Pagination */}
          {!loading && users && users?.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                Previous
              </button>
              <span className="px-4 py-1">
                Page {page} of {maxPage}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === maxPage}
                className={`px-3 py-1 rounded ${page === maxPage ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </main>

  );
};

export default Users;
