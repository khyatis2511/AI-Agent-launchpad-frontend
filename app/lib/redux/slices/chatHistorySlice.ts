/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { getAgentChatHistoryAPI } from '../../api/agent.api';

interface ChatHisoryState {
    data: any | null; 
    error: string | null;
    message: string | null;
    loading: boolean;
}

const initialState: ChatHisoryState = {
    data: null,
    error: null,
    message: null,
    loading: false,
};

const chatHisorySlice = createSlice({
    name: 'chatHisory',
    initialState,
    reducers: {
        create: (state) => {
            state.loading = true;
        },
        createSuccess: (state, action: PayloadAction<any>) => {
            state.data = action.payload;
            state.error = null;              
            state.message = 'Data saved successfully'; 
            state.loading = false;
        },
        createFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        update: (state, action: PayloadAction<Partial<ChatHisoryState["data"]>>) => {
            if (state.data) {
                state.data = { ...state.data, ...action.payload };
                state.message = 'Data updated successfully';
                state.error = null;
            } else {
                state.error = 'No data available to update';
            }
            state.loading = false;
        },
        delete: (state) => {
            state.data = null;
            state.message = 'Data deleted successfully';
            state.error = null;
            state.loading = false;
        },
        reset: (state) => {
            state.data = null;
            state.error = null;
            state.message = null;
            state.loading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const {
    create,
    createSuccess,
    createFailure,
    update,
    delete: deleteData,
    reset,
    setLoading,
} = chatHisorySlice.actions;

export default chatHisorySlice.reducer;


export const getAgentChatHistory = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(create());
    try {
        const response = await getAgentChatHistoryAPI();
        if(response.success){
            dispatch(createSuccess(response.data));
        } else {
            dispatch(createFailure(response.error || response.message || "Failed to get Agent Chat History data"));
        }
        
    } catch (error) {
        console.log('[getAgentChatHistory error:]', error);
        dispatch(createFailure('Failed to get Agent Chat History data'));
    }
    dispatch(setLoading(false));
};
