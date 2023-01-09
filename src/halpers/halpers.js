
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
   console.log(arr);
   let users = photos.find(item => item.key === arr.key)
   console.log(users);
   let index = photos.indexOf(users)
   console.log(index);
   if(!users){
      photos.push(arr)
      btns.current[id].classList.add("active")
   }else{
      photos.splice(index, 1)
      btns.current[id].classList.remove("active")
   } 
   localStorage.setItem("arr", JSON.stringify(photos))
}