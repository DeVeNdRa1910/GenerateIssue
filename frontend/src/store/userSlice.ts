import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userId: string;
  fname: string;
  lname: string;
  email: string;
  adminId: string;
  profileImage: string;
}

const initialState: UserState = {
  userId: "",
  fname: "",
  lname: "",
  email: "",
  adminId: "",
  profileImage: "",
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployee: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    clearEmployee: () => initialState,
  },
});

export const { setEmployee, clearEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
