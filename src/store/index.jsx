import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice  from './slices/isLoading.slice'
import productsSlice  from './slices/products.slice'
import  productsCartSlice from './slices/productsCart.slice'
import purchasesSlice from './slices/purchases.slice'

export default configureStore({
  reducer: {
      loading:isLoadingSlice,
      products:productsSlice,
      purchases:purchasesSlice,
      productsCart:productsCartSlice,
	}
})