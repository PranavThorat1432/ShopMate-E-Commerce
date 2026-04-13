import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";


export const fetchMyOrders = createAsyncThunk('/order/fetchMyOrders', async(_, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/api/orders/my-orders');
    return res.data.myOrders;

  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch orders!');
  }
});


export const placeOrder = createAsyncThunk('/order/placeOrder', async(data, thunkAPI) => {
  try {
    const res = await axiosInstance.post('/api/orders/create', data);
    toast.success(res.data.message);
    return res.data;

  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to place order!');
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch orders!');
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    fetchingOrders: false,
    placingOrder: false,
    finalPrice: null,
    orderStep: 1,
    paymentIntent: "",
  },
  reducers: {
    toggleOrderStep(state) {
      // Reset the flow back to step 1 (used after successful payment)
      state.orderStep = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.fetchingOrders = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.fetchingOrders = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state) => {
        state.fetchingOrders = false;
      })
      .addCase(placeOrder.pending, (state) => {
        state.placingOrder = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placingOrder = false;
        // Backend responds with `totalPrice` (camelCase)
        state.finalPrice = action.payload.totalPrice;
        state.paymentIntent = action.payload.paymentIntent;
        state.orderStep = 2;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.placingOrder = false;
      })
  },
});

export default orderSlice.reducer;
export const {toggleOrderStep} = orderSlice.actions;