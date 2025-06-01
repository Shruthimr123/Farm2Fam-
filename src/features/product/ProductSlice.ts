import { createSlice } from '@reduxjs/toolkit';
import { ProductPayload, ProductState } from '../../types/product';
import { createProductAPI } from '../api/product/createProductApi';
import { updateProductAPI } from '../api/product/updateProductApi';
import { deleteProductAPI } from '../api/product/deleteProductApi';
import { getProductsAPI } from '../api/product/getProductApi';


const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
    message: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearProductMessage: (state) => {
            state.message = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // CREATE
            .addCase(createProductAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProductAPI.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
                state.message = 'Product created successfully';
            })
            .addCase(createProductAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateProductAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductAPI.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                state.message = 'Product updated successfully';
            })
            .addCase(updateProductAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteProductAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProductAPI.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(p => p._id !== action.payload);
                state.message = 'Product deleted successfully';
            })
            .addCase(deleteProductAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getProductsAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductsAPI.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProductsAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearProductMessage } = productSlice.actions;
export default productSlice.reducer;
