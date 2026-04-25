import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'
import { axiosInstance } from "../../lib/axios";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    totalUsers: 0,
    users: [],
    totalRevenueAllTime: 0,
    todayRevenue: 0,
    yesterdayRevenue: 0,
    totalUsersCount: 0,
    monthlySales: [],
    orderStatusCounts: {},
    topSellingProducts: [],
    lowStockProducts: 0,
    revenueGrowth: "",
    newUsersThisMonth: 0,
    currentMonthSales: 0,
  },
  reducers: {
    getAllUsersRequest(state) {
      state.loading = true
    },
    getAllUsersSuccess(state, action) {
      state.loading = false,
      state.users = action.payload.users,
      state.totalUsers = action.payload.totalUsers
    },
    getAllUsersFailed(state) {
      state.loading = false
    },
    deleteUserRequest(state) {
      state.loading = true
    },
    deleteUserSuccess(state, action) {
      state.loading = false,
      state.users = state.users.filter(user => user.id !== action.payload),
      state.totalUsers = Math.max(0, state.totalUsers - 1),
      state.totalUsersCount = Math.max(0, state.totalUsersCount - 1)
    },
    deleteUserFailed(state) {
      state.loading = false
    },
    getStatsRequest(state) {
      state.loading = true

    },
    getStatsSuccess(state, action) {
      state.loading = false
      state.totalRevenueAllTime = action.payload.totalRevenueAllTime
      state.todayRevenue = action.payload.todayRevenue
      state.yesterdayRevenue = action.payload.yesterdayRevenue
      state.totalUsersCount = action.payload.totalUsersCount
      state.monthlySales = action.payload.monthlySales
      state.orderStatusCounts = action.payload.orderStatusCounts
      state.topSellingProducts = action.payload.topSellingProducts
      state.lowStockProducts = action.payload.lowStockProducts?.length
      state.revenueGrowth = action.payload.revenueGrowth
      state.newUsersThisMonth = action.payload.newUsersThisMonth
      state.currentMonthSales = action.payload.currentMonthSales
    },
    getStatsFailed(state) {
      state.loading = false
    }
  },
});


export const fetchAllUsers = (page) => async (dispatch) => {
  dispatch(adminSlice.actions.getAllUsersRequest());

  await axiosInstance.get(`/api/admin/get-all-users?page=${page || 1}`).then(res => {
    dispatch(adminSlice.actions.getAllUsersSuccess(res.data));
  }).catch(error => {
    dispatch(adminSlice.actions.getAllUsersFailed());
  });
};


export const deleteUser = (id, page) => async (dispatch, getState) => {
  dispatch(adminSlice.actions.deleteUserRequest());

  await axiosInstance.delete(`/api/admin/delete-user/${id}`).then(res => {
    dispatch(adminSlice.actions.deleteUserSuccess(res.data));
    toast.success(res.data.message || 'User Deleted!');
    const state = getState();

    const updatedTotal = state.admin.totalUsers;
    const updatedMaxPage = Math.ceil(updatedTotal / 10) || 1;

    const validPage = Math.min(page, updatedMaxPage);
    dispatch(fetchAllUsers(validPage));
    

  }).catch(error => {
    dispatch(adminSlice.actions.deleteUserFailed());
    toast.error(error.response.data.message || 'Failed to Delete User!');
  });
};


export const getDashboardStats = () => async (dispatch) => {
  dispatch(adminSlice.actions.getStatsRequest());

  await axiosInstance.get(`/api/admin/fetch/dashboard-stats`).then(res => {
    dispatch(adminSlice.actions.getStatsSuccess(res.data));
  }).catch(error => {
    dispatch(adminSlice.actions.getStatsFailed());
  });
};

export default adminSlice.reducer;
