import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_URL } from "@/constants"
import axios from "axios"

const initialState = {
  data: [],
  loading: false,
  error: null
}

// fetch trend market data
export const fetchTrendData = createAsyncThunk("fetchTrendData", async () => {
  const { data } = await axios.get(`${API_URL}/search/trending`)
  return data
})

const trendSlice = createSlice({
  name: "trend",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTrendData.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTrendData.fulfilled, (state, action) => {
        state.data = action.payload

        console.log(action.payload)
        state.loading = false
        state.error = null
      })
      .addCase(fetchTrendData.rejected, (state, action) => {
        state.data = null
        state.loading = false
        state.error = action.error.message || "An error occurred."
      })
  }
})

export default trendSlice.reducer
