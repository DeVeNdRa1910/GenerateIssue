import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  adminId: string;
  fname: string;
  lname: string;
  email: string;
  profileImage: string;
  employeeIds: number[];
}

const initialState: AdminState = {
  fname: "",
  lname: "",
  email: "",
  adminId: "",
  profileImage: "",
  employeeIds: []
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<AdminState>) => {
      return action.payload;
    },
    clearAdmin: () => initialState,
  },
});

export const { setAdmin, clearAdmin } = employeeSlice.actions;
export default employeeSlice.reducer;
