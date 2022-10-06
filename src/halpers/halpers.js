
const getLocalPhotos = () => {
   const photosLocal = localStorage.getItem("arr")
   if(photosLocal !== null){
      return JSON.parse(photosLocal)
   }else{
      return []
   }
}

export const addFavorite = (id, photo, btns) => {
   let photos = getLocalPhotos()
   let arr = photo[id]
   let users = photos.find(item => item.id === arr.id)
   let index = photos.indexOf(users)
   if(!users){
      photos.push(arr)
      btns.current[id].classList.add("active")
   }else{
      photos.splice(index, 1)
      btns.current[id].classList.remove("active")
   } 
   localStorage.setItem("arr", JSON.stringify(photos))
}