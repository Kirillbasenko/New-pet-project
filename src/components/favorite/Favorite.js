import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { favoriteFetched } from "../../store/slices/photosSlice";


const Favorites = () => {
   const {favorites, filterPhotos, term} = useSelector(state => state.photos)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(favoriteFetched())
   }, [])

   function renderItems (arr){
         const items = arr.map((item) => {
            return(
               <li 
                  className="char__item"
                  key={item.id}>
                     <img  src={item.src} alt={item.title}/>
                     <div className="char__content">
                        <div className="char__name">{item.title}</div>
                        <div className="char__album">№{item.album}</div>
                     </div>
                     <div className='char__buttons'>
                        <Link to={`/${item.id}`} className="char__button">details</Link>
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
   const items = renderItems(favorites) 
   const filterItems = renderItems(filterPhotos) 

   return(
      <div className="page-other">
         <div className="char__list">
            {term && filterItems ? filterItems : items}
         </div>
      </div>
   )
}

export default Favorites