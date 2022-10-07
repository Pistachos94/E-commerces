import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getToken';
import { setIsLoading } from './isLoading.slice';

export const productsCartSlice = createSlice({
	name: 'productCart',
    initialState: [],
    reducers:{
        setProductsCart:(state, action)=>{
            return action.payload
        }
    }
});

export const getProductsCartThunk = ()=> dispatch =>{
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then(res=>dispatch(setProductsCart(res.data.data.cart.products)))
        .finally(()=>dispatch(setIsLoading(false)))
};

export const AddProductsCartThunk = (productCart)=> dispatch =>{
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart", 
        productCart,
        getConfig()
    )
        .then(res=>dispatch(getProductsCartThunk()))
        .finally(()=>dispatch(setIsLoading(false)))
};


export const purchaseCartThunk = ()=> dispatch =>{
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", {}, getConfig())
        .then(()=>dispatch(setProductsCart([]) ))
        .finally(()=>dispatch(setIsLoading(false)))
};

export const {setProductsCart}=productsCartSlice.actions;

export default productsCartSlice.reducer;