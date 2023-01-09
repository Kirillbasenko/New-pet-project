import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { readMessage, singlePhoto, deletePhoto } from "../../store/slices/photosSlice";
import { deleteFavoritePhoto } from "../../store/slices/favoritesSlice";
import  ErrorMessage  from "../errorMessage/ErrorMessage";
import Spinner from '../spinner/Spinner';
import {addFavorite} from "../../halpers/halpers"

import "./mainPage.scss"

const MainPage = () => {
   const dispatch = useDispatch()
   let navigate = useNavigate() 
   const favoriteBtn = useRef([])
   favoriteBtn.current = []
   
   const {photosList, photosLoadingStatus, term, filterPhotos, activeCatalog} = useSelector(state => state.photos)
   console.log(photosList);

   useEffect(() => {
      dispatch(readMessage())
   }, [])

   /*if(!localStorage.getItem("isAuthEmail")){
      navigate("/login", { replace: true })
   }*/

   const addBtn = (el) => {
      if(el && !favoriteBtn.current.includes(el)){
         favoriteBtn.current.push(el)
      }
   }

   if(photosLoadingStatus === "error"){
      return <ErrorMessage/>
   }

   function renderItems (arr){
      const items = arr.map((item, index) => {
            return(
               <div key={item.key} className="char">
                  <button onClick={() => {
                     dispatch(deletePhoto(item.key))
                     dispatch(deleteFavoritePhoto(item.key))
                  } } className="char__delete">
                     <img className="char__deleteBtn" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/OOjs_UI_icon_close-ltr-destructive.svg/800px-OOjs_UI_icon_close-ltr-destructive.svg.png" alt="" />
                  </button>
                  <Link 
                     className="char__wrap"
                     onClick={() => dispatch(singlePhoto(photosList[index]))} 
                     to={`/photo/${item.key}`}>
                     <li 
                        className="char__item"
                        key={item.key}>
                           <img  src={item.src} alt={item.title}/>
                           <div className="char__content">
                              <div className="char__name">{item.title.length < 20 ? item.title : `${item.title.slice(0, 28)}...`}</div>
                              <div className="char__album">№{item.album}</div>
                           </div>
                     </li>
                  </Link>
                  <div className="char__buttons">
                     <button ref={addBtn} onClick={(e) => addFavorite(index, photosList, favoriteBtn)} className='char__add'>favorites</button>
                  </div>
               </div>
            )
      })
      return(
            <ul className="char__grid">
               {items}
            </ul>
      )
   } 

   const items = renderItems(photosList)
   //const items = renderItems(selectAll)
   const filterItems = renderItems(filterPhotos)

   return(
      <div className='main-back'>
         {photosLoadingStatus === "loading" ? <Spinner/> : null}
         <div className="char__list">
               {term || activeCatalog ? filterItems : items}
         </div>
      </div>
   )
}

export default MainPage