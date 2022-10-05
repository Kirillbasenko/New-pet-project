import { useState, useRef } from "react"
import { addDoc, collection } from "firebase/firestore";
import {db} from "../../fireBase"
import * as Yup from "yup";
import { useFormik } from "formik";

import "./createPhoto.scss"

const CreatePhoto = () => {
   const file = useRef(null)
   const [src, setSrc] = useState("")

   const douwload = async () => {
      let reader = new FileReader()
      reader.readAsDataURL(file.current.files[0])
      reader.onload = function (){
         setSrc(reader.result)
      }
   }

   const savePhoto = () => {
      addDoc(collection(db, "photos"), {
         id: formik.values.id,
         album: formik.values.album,
         title: formik.values.title,
         src: src,
         catalog: formik.values.catalog
      });
      formik.values.id = ""
      formik.values.album = ""
      formik.values.title = ""
      formik.values.catalog = ""
      setSrc("")
      file.current.value = ""
   }

const formik = useFormik({
      initialValues:{
         id: "",
         album: "",
         title: "",
         catalog: "All"
      },
      validationSchema: Yup.object({
         id: Yup.string()
                  .required("Обязательное поле"),
         album: Yup.string()
                  .required("Обязательное поле"),
         title: Yup.string()
                  .min(5, "Минимум 5 символа")
                  .required("Обязательное поле"),
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
               placeholder="Id" 
               className="content__id"  
               value={formik.values.id} 
               type="id" 
               name="id"
               id="inputId"
               onBlur={formik.handleBlur}/>
               {formik.errors.id && formik.touched.id  ? <div className="div error">{formik.errors.id}</div> : null}
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
                  name="catalog"
                  onBlur={formik.handleBlur}>
                     <option value="All">All</option>
                     <option value="Nature">Nature</option>
                     <option value="Sport">Sport</option>
               </select>
            <input  ref={file} onChange={() => douwload()} className="content__file" type="file" />
            <button className="content__button" type="submit">Отправить</button>
         </form>
      </div>
      )
}

export default CreatePhoto