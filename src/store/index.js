import favorite from "./slices/favoritesSlice"
import photos from "./slices/photosSlice"
import user from "./slices/userSlise"
import { configureStore } from '@reduxjs/toolkit';

const stringMiddleware = () => (next) => (action) => {
   if(typeof action === "string"){
      return next({
         type: action
      })
   }
   return next(action)
}

const store = configureStore({
   reducer: {photos, user, favorite},
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
   devTools: process.env.NODE_ENV !== "production"
})

export default store;