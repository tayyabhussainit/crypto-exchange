import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './reducers/UserReducer'

const store = configureStore({
  reducer: {
    UserReducer: UserReducer,
  }
});

export default store;