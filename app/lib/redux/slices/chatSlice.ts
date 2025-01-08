/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { getAgentChatAPI } from '../../api/agent.api';

interface ChatState {
    data: any | null;
    error: string | null;
    message: string | null;
    loading: boolean;
}

const initialState: ChatState = {
    data: null,
    error: null,
    message: null,
    loading: false,
};

const chatSlice = createSlice({
    name: 'chat',
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
        update: (state, action: PayloadAction<Partial<ChatState["data"]>>) => {
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
} = chatSlice.actions;

export default chatSlice.reducer;


export const getAgentChat = (agentId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(create());
    try {
        const response = await getAgentChatAPI(agentId);
        if(response.success){
            dispatch(createSuccess(response.data));
        } else {
            dispatch(createFailure(response.error || response.message || "Failed to get Agent Chat data"));
        }
        
    } catch (error) {
        console.log('[getAgentChatHistory error:]', error);
        dispatch(createFailure('Failed to get Agent Chat data'));
    }
    dispatch(setLoading(false));
};
