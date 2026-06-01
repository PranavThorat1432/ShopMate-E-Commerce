import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";


export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders', async (_, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get('/api/orders/all-orders');
    return data.orders;

  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to fetch orders.');
  }
});

export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus', async ({orderId, status}, thunkAPI) => {
  try {
    const { data } = await axiosInstance.put(`/api/orders/update-orders/${orderId}`, {status});
    toast.success(data.message || 'Order Status Updated!');
    return data.updatedOrder;

  } catch (error) {
    toast.error(error.response.data.message || 'Failed to update order status.');
    return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to update order status.');
  }
});

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (orderId, thunkAPI) => {
  try {
    const { data } = await axiosInstance.delete(`/api/orders/delete-orders/${orderId}`);
    toast.success(data.message || 'Order Deleted!');
    return orderId;

  } catch (error) {
    toast.error(error.response.data.message || 'Failed to delete order.');
    return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to delete order.');
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    orders: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if(index !== -1) {
          state.orders[index] = {
            ...state.orders[index],
            ...action.payload
          }
        }
      })
      .addCase(updateOrderStatus.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(order => order.id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default orderSlice.reducer;
