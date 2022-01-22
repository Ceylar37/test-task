import {configureStore} from "@reduxjs/toolkit";
import {blockReducer} from "./block-reducer/block-reducer";

export const store = configureStore({
    reducer: {
        blockReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch