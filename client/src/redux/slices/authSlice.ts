import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  role: string;
  access_token: string;
}

interface AuthState {
  admin: AdminData | null;
}

const initialState: AuthState = {
  admin: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAdmin: (state, action: PayloadAction<AdminData>) => {
      state.admin = action.payload;
    },
    logoutAdmin: (state) => {
      state.admin = null;
    },
  },
});

export const { loginAdmin, logoutAdmin } = authSlice.actions;
export default authSlice.reducer;