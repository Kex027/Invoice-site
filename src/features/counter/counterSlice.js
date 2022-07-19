import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incremented(state) {
            state.value++;
        },
        decremented(state) {
            state.value--;
        },
        addValue(state, action) {
            state.value += +action.payload;
        },
        reset(state) {
            state.value = 0;
        }
    }
});

export const getCounterValue = (state) => state.counter.value;
export const { incremented, decremented, addValue, reset } = counterSlice.actions;
export default counterSlice.reducer;