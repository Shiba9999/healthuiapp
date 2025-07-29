import { createSlice } from '@reduxjs/toolkit';

export interface HealthResultState {
    result: any | null;
}

const initialState: HealthResultState = {
    result: null,
};

const healthResultSlice = createSlice({
    name: 'healthResult',
    initialState,
    reducers: {
        setHealthResult(state, action) {
            state.result = action.payload;
        },
        // clearHealthResult(state) {
        //   state.result = null;
        // },
    },
});

export const { setHealthResult,

} = healthResultSlice.actions;
export default healthResultSlice.reducer;
