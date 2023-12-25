import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface DataState {
  isUserInfoLoading: boolean;
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    isUserInfoLoading: true,
  } as DataState,
  reducers: {
    setIsUserInfoLoading(state, action: PayloadAction<boolean>) {
      state.isUserInfoLoading = action.payload;
    },
  },
});

export const useIsUserInfoLoading = () =>
  useSelector((state: { mainData: DataState }) => state.mainData.isUserInfoLoading);

export const {
  setIsUserInfoLoading: setIsUserInfoLoadingAction
} = dataSlice.actions;

export default dataSlice.reducer;