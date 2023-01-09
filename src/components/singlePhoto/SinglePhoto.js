import "./singlePhoto.scss"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";

const SinglePhoto = () => {
   const {photo} = useSelector(state => state.photos)

   const renderItem = (item) => {
      return(
         <div className="single">
            <img className="single__image" src={item.src} alt={item.title} />
            <div className="single__title">{item.title}</div>
            <div className="single__id">ID: {item.id}</div>
            <div className="single__album">Album: {item.album}</div>
            <Link to=".." className="single__button">
               <img className="single__back" src="https://cdn-icons-png.flaticon.com/512/93/93634.png" alt="" />
               <div className="">Back</div> 
            </Link>
         </div>
      )
   }

   const items = renderItem(photo)
   return(
      <div className="page-other">
         {items}
      </div>
   )
}

export default SinglePhoto