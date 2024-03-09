// redux/logoSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Data } from "../type";
import {
  getAllProductsService,
  getModelService,
  submitModelService,
} from "./api";

const initialState: Data = {
  data: [],
  allProducts: [],
};

export const getModels = createAsyncThunk("get/availableModels", () => {
  try {
    const response = getModelService();
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const submitModel = createAsyncThunk("post/carModel", (payload: any) => {
  try {
    const response = submitModelService(payload);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getAllProducts = createAsyncThunk(
  "get/allProducts",
  () => {
    try {
      const response = getAllProductsService();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

const logoSlice = createSlice({
  name: "models",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getModels.fulfilled, (state, action) => {
        return { ...state, data: action.payload };
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        return { ...state, allProducts: action.payload };
      });
  },
});

export default logoSlice.reducer;
