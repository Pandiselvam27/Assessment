// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import logoReducer from "./logoSlice";

const store = configureStore({
  reducer: {
    logos: logoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
