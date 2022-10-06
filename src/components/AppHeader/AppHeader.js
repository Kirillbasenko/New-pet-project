import {useNavigate, Link} from 'react-router-dom' 
import { useRef } from "react"
import { useDispatch } from "react-redux"; 
import {signOut, getAuth} from "firebase/auth";
import {removeUser} from "../../store/slices/userSlise"
import { filteredPhotos, searchFrom, filterAlbum, filterABC, activeCatalogChanged } from "../../store/slices/photosSlice"
import { filteredFavorites, filterABCFavorites, filterAlbumFavorites } from "../../store/slices/favoritesSlice"

import style from "./appHeader.module.css"

const AppHeader = () => {
   const dispatch = useDispatch(); 
   const catalog = useRef(null)
   let navigate = useNavigate() 
   const isAuth = !!localStorage.getItem("isAuthEmail")

   function signOutUser() {
      signOut(getAuth());
      dispatch(removeUser())
      localStorage.removeItem("isAuthEmail")
      navigate("../login", { replace: true })
   }

   return(
      <>
         {isAuth ? 
         <div className={style.header}>
            <select onClick={(e) => dispatch(activeCatalogChanged(e.target.value))} ref={catalog} className={style.select} id="cal">
               <option value="All">All</option>
               <option value="Nature">Nature</option>
               <option value="Sport">Sport</option>
            </select>
            <Link className={style.create} to="/create">Create photo</Link>
            <Link className={style.logo} to="/">Photos project</Link>
            <Link to="/favorit" className={style.favorite}>Favorite</Link>
            <button onClick={() => {
               dispatch(filterABC())
               dispatch(filterABCFavorites())}} className={style.abc}>Sort alphabetically</button>
            <button onClick={() => {
               dispatch(filterAlbum())
               dispatch(filterAlbumFavorites())}} className={style.album}>Sort №Album</button>
            <input 
               onChange={(e) => {
                  dispatch(searchFrom(e.target.value))
                  dispatch(filteredPhotos(e.target.value))
                  dispatch(filteredFavorites(e.target.value))
               }}
               className={style.search} 
               placeholder='search' 
               type="text" />
            <button onClick={() => signOutUser()} className={style.out}>Выйти</button>
         </div> : null}
      </>
   )
}

export default AppHeader