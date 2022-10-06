import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { readMessage, singlePhoto } from "../../store/slices/photosSlice";
import  ErrorMessage  from "../errorMessage/ErrorMessage";
import Spinner from '../spinner/Spinner';
import {addFavorite} from "../../halpers/halpers"

import "./mainPage.modules.scss"

const MainPage = () => {
   const dispatch = useDispatch()
   let navigate = useNavigate() 
   const favoriteBtn = useRef([])
   favoriteBtn.current = []

   const {photosList, photosLoadingStatus, term, filterPhotos, activeCatalog} = useSelector(state => state.photos)

   useEffect(() => {
      dispatch(readMessage())
   }, [])

   if(!localStorage.getItem("isAuthEmail")){
      navigate("/login", { replace: true })
   }

   const addBtn = (el) => {
      if(el && !favoriteBtn.current.includes(el)){
         favoriteBtn.current.push(el)
      }
   }

   if(photosLoadingStatus === "loading"){
      return <Spinner/>
   } else if(photosLoadingStatus === "error"){
      return <ErrorMessage/>
   }

   function renderItems (arr){
      const items = arr.map((item, index) => {
            return(
               <li 
                  className="char__item"
                  key={item.id}>
                     <img  src={item.src} alt={item.title}/>
                     <div className="char__content">
                        <div className="char__name">{item.title.length < 20 ? item.title : `${item.title.slice(0, 28)}...`}</div>
                        <div className="char__album">№{item.album}</div>
                     </div>
                     <div className='char__buttons'>
                        <Link onClick={() => dispatch(singlePhoto(photosList[index]))} to={`/${item.id}`} className="char__button">details</Link>
                        <button ref={addBtn} onClick={(e) => addFavorite(index, photosList, favoriteBtn)} className='char__add'>favorites</button>
                     </div>
               </li>
            )
      })
      return(
            <ul className="char__grid">
               {items}
            </ul>
      )
   } 

   const items = renderItems(photosList)
   const filterItems = renderItems(filterPhotos)

   return(
      <div className='main-back'>
         <div className="char__list">
               {term || activeCatalog ? filterItems : items}
         </div>
      </div>
   )
}

export default MainPage