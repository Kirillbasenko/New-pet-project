import { useState, useRef } from "react"
import { addDoc, collection } from "firebase/firestore";
import * as Yup from "yup";
import { useFormik } from "formik";

import {db} from "../../fireBase"
import "./createPhoto.scss"

const CreatePhoto = () => {
   const file = useRef(null)
   const [src, setSrc] = useState(null)

   const douwload = async () => {
      let reader = new FileReader()
      reader.readAsDataURL(file.current.files[0])
      reader.onload = function (){
         setSrc(reader.result)
      }
   }

   const savePhoto = async () => {
      const docRef = await addDoc(collection(db, "photos"), {
         album: formik.values.album,
         title: formik.values.title,
         src: src,
         catalog: formik.values.catalog
      });
      formik.values.album = ""
      formik.values.title = ""
      formik.values.catalog = ""
      setSrc("")
      file.current.value = ""
      console.log(docRef.id);
   }

const formik = useFormik({
      initialValues:{
         id: "",
         album: "",
         title: "",
         src: src,
         catalog: "Nature"
      },
      validationSchema: Yup.object({
         album: Yup.number()
                  .required("Required field"),
         title: Yup.string()
                  .min(3, "Min 3 symbols")
                  .required("Required field"),
      }),
      onSubmit: savePhoto
   })

   return(
      <div className="page-other">
         <form className="content" onSubmit={formik.handleSubmit}>
            <img className="content__image" src={src} alt="" />
            <input onChange={formik.handleChange}
               placeholder="Title" 
               className="content__title" 
               value={formik.values.title} 
               type="title" 
               name="title"
               id="inputTitle"
               onBlur={formik.handleBlur}/>
               {formik.errors.title && formik.touched.title  ? <div className="div error">{formik.errors.title}</div> : null}
            <input onChange={formik.handleChange}
               placeholder="Album" 
               className="content__album" 
               value={formik.values.album}  
               type="album" 
               name="album"
               id="inputAlbum"
               onBlur={formik.handleBlur}/>
               {formik.errors.album && formik.touched.album  ? <div className="div error">{formik.errors.album}</div> : null}
               <select 
                  className="content__select"
                  id="cal"
                  onChange={formik.handleChange}
                  value={formik.values.catalog} 
                  style={{ background: formik.values.catalog === "Nature" ? "green" : "blue", color: "white"}}
                  name="catalog"
                  onBlur={formik.handleBlur}>
                     <option style={{background: "green", color: "white"}} value="Nature">Nature</option>
                     <option style={{background: "blue", color: "white"}} value="Sport">Sport</option>
               </select>
            <input  
               ref={file} 
               onChange={() => douwload()} 
               className="content__file" 
               type="file"
               id="file"
               value={formik.values.src}
               onBlur={formik.handleBlur}
               name="src"/>
            {formik.errors.src && formik.touched.src  ? <div className="div error">{formik.errors.src}</div> : null}
            <label className="content__labelFile" htmlFor="file">Add file</label>
            <button 
               className="content__button" 
               disabled={src === null}
               type="submit">Submit</button>
         </form>
      </div>
      )
}

export default CreatePhoto