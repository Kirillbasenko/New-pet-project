import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../fireBase"

const initialState = {
   photosList: [],
   photo: [],
   term: "",
   filterPhotos: [],
   photosLoadingStatus: 'idle',
   activeCatalog: ""
}

export const readMessage = createAsyncThunk(
   "photos/readMessages",
   async () => {
      let array = []
      let querySnapshot = await getDocs(collection(db, "photos"))
      querySnapshot.forEach(doc => {
         array.push(doc.data())
      })
      return array;
   }
)

const photosSlice = createSlice({
   name: "photos",
   initialState,
   reducers: {
      singlePhoto: (state, action) => {
               state.photo = action.payload
            },
      searchFrom: (state, action) => {
               state.term = action.payload
            },
      filteredPhotos: (state, action) => {
               state.filterPhotos = state.photosList.filter(item => item.title.startsWith(action.payload))
            },
      filterABC: state => {
         state.photosList = state.photosList.sort((a, b) => a.title > b.title ? 1 : -1)
      },
      filterAlbum: state => {
         state.photosList = state.photosList.sort((a, b) => a.album > b.album ? 1 : -1)
      },
      activeCatalogChanged: (state, action) => {
         state.activeCatalog = action.payload
         state.filterPhotos = action.payload === "All" ? state.photosList : state.photosList.filter(item => item.catalog === state.activeCatalog)
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(readMessage.pending, state => {state.photosLoadingStatus = 'loading'})
         .addCase(readMessage.fulfilled, (state, action) => {
               state.photosLoadingStatus = 'idle';
               state.photosList = action.payload
            })
         .addCase(readMessage.rejected, state => {state.photosLoadingStatus = 'error'})
         .addDefaultCase(() => {})
   }
})

const {actions, reducer} = photosSlice

export default reducer;
export const {
   singlePhoto, 
   searchFrom,
   filteredPhotos,
   filterABC,
   filterAlbum,
   activeCatalogChanged
} = actions