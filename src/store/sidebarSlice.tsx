import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface SidebarState {
  isSidebarOn: boolean;
}

const initialState: SidebarState = {
  isSidebarOn: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebarOn: (state) => {
      state.isSidebarOn = true;
    },
    setSidebarOff: (state) => {
      state.isSidebarOn = false;
    },
  },
});

export const { setSidebarOn, setSidebarOff } = sidebarSlice.actions;
export const getSidebarStatus = (state: RootState) => state.sidebar.isSidebarOn;

export default sidebarSlice.reducer;
