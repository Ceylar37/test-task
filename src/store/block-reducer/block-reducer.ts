import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Block} from "../../models/block";
import {GetBlockDto} from "../../models/dto/get-block.dto";
import {AppDispatch} from "../index";
import {CloudflareService} from "../../services/cloudflare-service/cloudflare-service";
import {Transaction} from "../../models/transaction";

interface BlockState {
    currentBlock: Block | null,
    isPending: boolean,
    error: string | null
}

const initialState: BlockState = {
    currentBlock: null,
    isPending: true,
    error: null
}

const blockSlice = createSlice({
    name: 'block',
    initialState,
    reducers: {
        setNewBlock: (state, action: PayloadAction<Block>) => {
            state.currentBlock = {...action.payload, number: parseInt(action.payload.number.slice(2), 16).toString()}
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchBlock.pending, state => {
            state.isPending = true
        })
        builder.addCase(fetchBlock.fulfilled, state => {
            state.isPending = false
        })
    }
})

export const fetchBlock = createAsyncThunk<Promise<void>,
    GetBlockDto,
    {
        dispatch: AppDispatch
    }>(
    'block/fetchBlock',
    async ({id}, thunkApi) => {
        const requestValue = id === 'latest' ? id : '0x' + Number(id).toString(16);
        try {
            const response = await CloudflareService.getInfoByNumberOrLatest({id: requestValue})
            const newBlock: Block = {
                number: response.result.number,
                hash: response.result.hash,
                tableOfTransactions: response.result.transactions.map(({hash, from, to}: Transaction) => ({
                    from,
                    to,
                    hash,
                }))
            }
            thunkApi.dispatch(blockActions.setNewBlock(newBlock))
            thunkApi.dispatch(blockActions.setError(null))
        } catch (e: any) {
            if (e.message) {
                thunkApi.dispatch(blockActions.setError('Server Error'))
            }
            debugger
        }
    }
)

export const blockReducer = blockSlice.reducer
export const blockActions = blockSlice.actions