import { createSlice } from "@reduxjs/toolkit";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../fireBase"

const initialState = {
   favorites: [],
   filterPhotos: [],
   activeCatalog: ""
}

const favoritesSlice = createSlice({
   name: "favorite",
   initialState,
   reducers: {
      favoriteFetched: (state) => {
         state.favorites = JSON.parse(localStorage.getItem("arr"))
      },
      filteredFavorites: (state, action) => {
         state.filterPhotos = state.favorites.filter(item => item.title.startsWith(action.payload))
      },
      filterABCFavorites: state => {
         state.filterPhotos = state.favorites.sort((a, b) => a.title > b.title ? 1 : -1)
      },
      filterAlbumFavorites: state => {
         state.filterPhotos = state.favorites.sort((a, b) => a.album > b.album ? 1 : -1)
      },
      activeFilterCatalogChanged: (state, action) => {
         state.activeCatalog = action.payload
         state.filterPhotos = action.payload === "All" ? state.favorites : state.favorites.filter(item => item.catalog === state.activeCatalog)
      },
      deleteFavoritePhoto: (state, action) => {
         let arr = JSON.parse(localStorage.getItem("arr")).filter(item => item.key !== action.payload)
         localStorage.setItem("arr", JSON.stringify(arr))
      },
   },
})

const {actions, reducer} = favoritesSlice

export default reducer;

export const {
   favoriteFetched,
   filteredFavorites,
   filterABCFavorites,
   filterAlbumFavorites,
   activeFilterCatalogChanged,
   deleteFavoritePhoto
} = actions