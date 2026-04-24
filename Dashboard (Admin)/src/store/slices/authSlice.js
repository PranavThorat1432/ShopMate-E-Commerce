import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5174';


const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    loginRequest(state) {
      state.loading = true
    },
    loginSuccess(state, action) {
      state.loading = false,
      state.user = action.payload,
      state.isAuthenticated = true
    },
    loginFailed(state) {
      state.loading = false
    },
    getUserRequest(state) {
      state.loading = true
    },
    getUserSuccess(state, action) {
      state.loading = false,
      state.user = action.payload,
      state.isAuthenticated = true
    },
    getUserFailed(state) {
      state.loading = false
    },
    logoutRequest(state) {
      state.loading = true
    },
    logoutSuccess(state, action) {
      state.loading = false,
      state.user = null,
      state.isAuthenticated = false
    },
    logoutFailed(state) {
      state.loading = false
    },
    forgotPasswordRequest(state) {
      state.loading = true
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false
    },
    forgotPasswordFailed(state) {
      state.loading = false
    },
    resetPasswordRequest(state) {
      state.loading = true
    },
    resetPasswordSuccess(state, action) {
      state.loading = false,
      state.user = action.payload,
      state.isAuthenticated = true
    },
    resetPasswordFailed(state) {
      state.loading = false
    },
    updateProfileRequest(state) {
      state.loading = true
    },
    updateProfileSuccess(state, action) {
      state.loading = false,
      state.user = action.payload
    },
    updateProfileFailed(state) {
      state.loading = false
    },
    updatePasswordRequest(state) {
      state.loading = true
    },
    updatePasswordSuccess(state, action) {
      state.loading = false
    },
    updatePasswordFailed(state) {
      state.loading = false
    },
    resetAuthSlice(state) {
      state.loading = false,
      state.user = state.user,
      state.isAuthenticated = state.isAuthenticated
    }
  },
});


export const login = (data) => async (dispatch) => {
  dispatch(authSlice.actions.loginRequest());
  try {
    await axiosInstance.post('/api/auth/login', data).then(res => {
      if(res.data.user.role === 'Admin') {
        dispatch(authSlice.actions.loginSuccess(res.data.user));
        toast.success(res.data.message || 'Login Success!');
        
      } else {
        dispatch(authSlice.actions.loginFailed());
        toast.error(error.response.data.message || 'Login Failed! Try Again.');
        
      }
    })
    
  } catch (error) {
    dispatch(authSlice.actions.loginFailed());
    toast.error(error.response.data.message || 'Login Failed! Try Again.');
    
  }
};


export const getUser = () => async (dispatch) => {
  dispatch(authSlice.actions.getUserRequest());
  try {
    await axiosInstance.get('/api/auth/getUser').then(res => {
      dispatch(authSlice.actions.getUserSuccess(res.data.user));
    });
    
  } catch (error) {
    dispatch(authSlice.actions.getUserFailed());
    
  }
};


export const logout = () => async (dispatch) => {
  dispatch(authSlice.actions.logoutRequest());
  try {
    await axiosInstance.get('/api/auth/logout').then(res => {
      dispatch(authSlice.actions.logoutSuccess(res.data.user));
      toast.success(res.data.message || 'Logout Success!');
      dispatch(authSlice.actions.resetAuthSlice());
    });
    
  } catch (error) {
    dispatch(authSlice.actions.getUserFailed());
    toast.error(error.response.data.message || 'Logout Failed!');
    dispatch(authSlice.actions.resetAuthSlice());
  }
};


export const forgotPassword = (email) => async (dispatch) => {
  dispatch(authSlice.actions.forgotPasswordRequest());
  try {
    await axiosInstance.post(`/api/auth/password/forgot-password?frontendUrl=${FRONTEND_URL}`, email).then(res => {
      dispatch(authSlice.actions.forgotPasswordSuccess());
      toast.success(res.data.message);
    });
    
  } catch (error) {
    dispatch(authSlice.actions.forgotPasswordFailed());
    toast.error(error.response.data.message || 'Cannot request for Reset Password.');
    
  }
};


export const resetPassword = (newData, token) => async (dispatch) => {
  dispatch(authSlice.actions.resetPasswordRequest());
  try {
    await axiosInstance.put(`/api/auth/password/reset/${token}`, newData).then(res => {
      dispatch(authSlice.actions.resetPasswordSuccess(res.data.user));
      toast.success(res.data.message);
    });
    
  } catch (error) {
    dispatch(authSlice.actions.resetPasswordFailed());
    toast.error(error.response.data.message || 'Failed to reset password.');
    
  }
};


export const updateAdminProfile = (data) => async (dispatch) => {
  dispatch(authSlice.actions.updateProfileRequest());
  try {
    await axiosInstance.put(`/api/auth/update-profile`, data).then(res => {
      dispatch(authSlice.actions.updateProfileSuccess(res.data.user));
      toast.success(res.data.message);
    });
    
  } catch (error) {
    dispatch(authSlice.actions.updateProfileFailed());
    toast.error(error.response.data.message || 'Failed to update profile.');
    
  }
};


export const updateAdminPassword = (data) => async (dispatch) => {
  dispatch(authSlice.actions.updatePasswordRequest());
  try {
    await axiosInstance.put(`/api/auth/password/update`, data).then(res => {
      dispatch(authSlice.actions.updatePasswordSuccess(res.data.user));
      toast.success(res.data.message);
    });
    
  } catch (error) {
    dispatch(authSlice.actions.updatePasswordFailed());
    toast.error(error.response.data.message || 'Failed to update password.');
    
  }
};


export const resetAuthSlice = () => (dispatch) => {
  dispatch(authSlice.actions.resetAuthSlice());
}

export default authSlice.reducer;
