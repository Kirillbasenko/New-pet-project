import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { favoriteFetched } from "../../store/slices/favoritesSlice";
import { singlePhoto } from "../../store/slices/photosSlice";

import "./favorite.scss"

const Favorites = () => {
   const {term, photosList} = useSelector(state => state.photos)
   const {favorites, activeCatalog, filterPhotos} = useSelector(state => state.favorite)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(favoriteFetched())
   }, [])

   function renderItems (arr){
         const items = arr.map((item, index) => {
            return(
               <div className="favorite">
                  <Link className="favorite__wrap"
                     onClick={() => dispatch(singlePhoto(favorites[index]))} 
                     to={`/${item.key}`}>
                     <li 
                        className="favorite__item"
                        key={item.key}>
                           <img className="favorite__image" src={item.src} alt={item.title}/>
                           <div className="favorite__content">
                              <div className="favorite__name">{item.title.length < 20 ? item.title : `${item.title.slice(0, 28)}...`}</div>
                              <div className="favorite__album">№{item.album}</div>
                              <img 
                                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Love_Heart_symbol.svg/1125px-Love_Heart_symbol.svg.png" 
                                 alt="heart" 
                                 className="favorite__heart"/>
                           </div>
                     </li>
                  </Link>
               </div>
            )
         })
         return(
            <ul className="favorite__grid">
               {items}
            </ul>
      )
   }
   const items = renderItems(favorites) 
   const filterItems = renderItems(filterPhotos) 

   return(
      <div className="favorite-back">
         <div className="char__list">
            {term || activeCatalog ? filterItems : items}
         </div>
      </div>
   )
}

export default Favorites