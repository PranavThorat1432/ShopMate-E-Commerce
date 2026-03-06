import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { toggleAIModal } from "./PopupSlice";


export const fetchAllProducts = createAsyncThunk('/product/fetchAll', 
  async ({ availability = '', price = '0-10000', category = '', ratings = '', search = '', page = 1 }, thunkAPI) => {
    try {
      const params = new URLSearchParams();

      if(category) {
        params.append('category', category);
      }
      if(price) {
        params.append('price', price);
      }
      if(search) {
        params.append('search', search);
      }
      if(ratings) {
        params.append('ratings', ratings);
      }
      if(availability) {
        params.append('availability', availability);
      }
      if(page) {
        params.append('page', page);
      }

      const result = await axiosInstance.get(`/api/products?${params.toString()}`);
      return result.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch products!');
    }
  }
);


export const fetchProductDetails = createAsyncThunk('/product/singleProduct', 
  async (id, thunkAPI) => {
    try {
      const result = await axiosInstance.get(`/api/products/single-product/${id}`);
      return result.data.product;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch product details!');
    }
  }
);


export const postReview = createAsyncThunk('/product/postReview', 
  async ({productId, review}, thunkAPI) => {
    try {
      const result = await axiosInstance.put(`/api/products/post-review/${productId}`, review);
      toast.success(result.data.message);
      return result.data.review;

    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add review!');
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add review!');
    }
  }
);


export const deleteReview = createAsyncThunk('/product/deleteReview', 
  async ({productId, reviewId}, thunkAPI) => {
    try {
      const result = await axiosInstance.delete(`/api/products/delete-review/${productId}`);
      toast.success(result.data.message);
      return reviewId;

    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete review!');
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete review!');
    }
  }
);


export const fetchProductWithAI = createAsyncThunk('/product/productAISearch', 
  async (userPrompt, thunkAPI) => {
    try {
      const result = await axiosInstance.post(`/api/products/ai-search`, userPrompt);
      thunkAPI.dispatch(toggleAIModal());
      return result.data;
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch AI Filtered Products!');
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch AI Filtered Products!');
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    productDetails: {},
    totalProducts: 0,
    topRatedProducts: [],
    newProducts: [],
    aiSearching: false,
    isReviewDeleting: false,
    isPostingReview: false,
    productReviews: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.newProducts = action.payload.newProducts;
        state.topRatedProducts = action.payload.topRatedProducts;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
        state.productDetails = action.payload.reviews;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(postReview.pending, (state) => {
        state.isPostingReview = true;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.isPostingReview = false;
        state.productReviews = [action.payload, ...state.productReviews];
      })
      .addCase(postReview.rejected, (state) => {
        state.isPostingReview = false;
      })
      .addCase(deleteReview.pending, (state) => {
        state.isReviewDeleting = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isReviewDeleting = false;
        state.productReviews = state.productReviews.filter((review) => review.review_id !== action.payload);
      })
      .addCase(deleteReview.rejected, (state) => {
        state.isReviewDeleting = false;
      })
      .addCase(fetchProductWithAI.pending, (state) => {
        state.aiSearching = true;
      })
      .addCase(fetchProductWithAI.fulfilled, (state, action) => {
        state.aiSearching = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.products.length;
      })
      .addCase(fetchProductWithAI.rejected, (state) => {
        state.aiSearching = false;
      })

  },
});

export default productSlice.reducer;