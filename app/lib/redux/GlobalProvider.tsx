"use client"
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from './store';

interface GlobalProviderProps {
    children: ReactNode
}

const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
    return (
        <Provider store={store} >
            {children}
        </Provider>
    );
}

export default GlobalProvider;