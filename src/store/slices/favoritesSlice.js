import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   favorites: [],
   filterPhotos: [],
}

const favoritesSlice = createSlice({
   name: "favorite",
   initialState,
   reducers: {
      favoriteFetched: (state, action) => {
         state.favorites = JSON.parse(localStorage.getItem("arr"))
      },
      filteredFavorites: (state, action) => {
         state.filterPhotos = state.favorites.filter(item => item.title.startsWith(action.payload))
      },
      filterABCFavorites: state => {
         state.favorites = state.favorites.sort((a, b) => a.title > b.title ? 1 : -1)
      },
      filterAlbumFavorites: state => {
         state.favorites = state.favorites.sort((a, b) => a.album > b.album ? 1 : -1)
      },
   },
})

const {actions, reducer} = favoritesSlice

export default reducer;
export const {
   favoriteFetched,
   filteredFavorites,
   filterABCFavorites,
   filterAlbumFavorites
} = actions