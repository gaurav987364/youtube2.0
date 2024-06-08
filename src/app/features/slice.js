import {createSlice} from '@reduxjs/toolkit';
const slice = createSlice({
    name: 'slice',
    initialState:{
        video:[],
        category:'All',
        showSuggestion: [],
    },
    reducers:{
        setHomeVideo: (state, action)=>{
            state.video = action.payload
        },
        setCategory:(state,action) => {
            state.category = action.payload;
        },
        setSearchSuggestion:(state,action) => {
            state.showSuggestion = action.payload;
        },

    }
});

export const {setCategory, setHomeVideo, setSearchSuggestion} = slice.actions;
export default slice.reducer;