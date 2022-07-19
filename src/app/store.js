import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../features/counter/counterSlice'
import invoicesSlice from '../features/invoices/InvoicesSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    invoices: invoicesSlice,
  }
})