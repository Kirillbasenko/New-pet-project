import {useNavigate, Link} from 'react-router-dom' 
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"; 
import {signOut, getAuth} from "firebase/auth";
import {removeUser} from "../../store/slices/userSlise";
import { filteredPhotos, searchFrom, filterAlbum, filterABC, activeCatalogChanged } from "../../store/slices/photosSlice"
import { filteredFavorites, filterABCFavorites, filterAlbumFavorites, activeFilterCatalogChanged } from "../../store/slices/favoritesSlice"

import style from "./appHeader.module.css"

const AppHeader = () => {
   const dispatch = useDispatch(); 
   let navigate = useNavigate() 
   const catalog = useRef(null)
   const {activeSort} = useSelector(state => state.photos)
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
               <Link className={style.logo} to="/">
                  Photo Gallery
               </Link>
               <select 
                  onClick={(e) => {
                     dispatch(activeCatalogChanged(e.target.value))
                     dispatch(activeFilterCatalogChanged(e.target.value))
                  } } 
                  ref={catalog} 
                  className={style.select} 
                  id="cal">
                  <option value="All">All</option>
                  <option value="Nature">Nature</option>
                  <option value="Sport">Sport</option>
               </select>
               <button onClick={() => {
                  dispatch(filterABC())
                  dispatch(filterABCFavorites())}} 
                  style={{background: activeSort === "abc" ? "rgb(151, 92, 3)" : "rgb(221, 134, 4)"}} 
                  className={style.abc}>Sort abc</button>
               <button onClick={() => {
                  dispatch(filterAlbum())
                  dispatch(filterAlbumFavorites())}} 
                  style={{background: activeSort === "alb" ? "rgb(151, 92, 3)" : "rgb(221, 134, 4)"}}
                  className={style.alb}>Sort №Album</button>
               <input 
                  onChange={(e) => {
                     dispatch(searchFrom(e.target.value))
                     dispatch(filteredPhotos(e.target.value))
                     dispatch(filteredFavorites(e.target.value))
                  }}
                  className={style.search} 
                  placeholder='Search' 
                  type="text" />
               <Link to="/create" className={style.wrap}>
                  <img 
                     className={style.createIcon} 
                     src="https://cdn-icons-png.flaticon.com/512/3658/3658756.png" 
                     alt="createIcon" />
                  <div className={style.create}>Create photo</div>
               </Link>
               <Link to="/favorit" className="link__wrap">
                  <img 
                     className={style.image} 
                     
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Heart_icon_red_hollow.svg/812px-Heart_icon_red_hollow.svg.png" 
                     alt="heart" />
                  <div  className={style.favorite}>Favorite</div>
               </Link>
               <button onClick={() => signOutUser()} className={style.out}>
                  <img className={style.imageOut} src="https://img.freepik.com/free-icon/logout_318-385171.jpg" alt="" />
               </button>
            </div> : null}
      </>
   )
}

export default AppHeader