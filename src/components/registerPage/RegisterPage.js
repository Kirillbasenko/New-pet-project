import { useFormik } from "formik";
import * as Yup from "yup";
import {useNavigate, Link} from 'react-router-dom' 
import { useDispatch} from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useRef} from 'react';
import {setUser} from "../../store/slices/userSlise"

const RegisterPage = () => {

   let navigate = useNavigate() 
   const dispatch = useDispatch();

   const error = useRef("")
   const success = useRef("")

   const hendlerRegister = () => {
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password)
      .then(({user}) => {
         success.current.style.display = "block"
         error.current.style.display = "none"
         dispatch(setUser({
               email: user.email, 
               id: user.uid, 
               token: user.accessToken, 
            }))
         navigate("/")
      })
      .catch(() => {
         error.current.style.display = "block"
         success.current.style.display = "none"
      });
   }

   const formik = useFormik({
      initialValues:{
         email: "",
         password: ""
      },
      validationSchema: Yup.object({
         email: Yup.string()
                  .email("Неправильный email адрес")
                  .required("Обязательное поле"),
         password: Yup.string()
                  .min(5, "Минимум 5 символа")
                  .required("Обязательное поле"),
      }),
      onSubmit: hendlerRegister
   })

   return(
      <div className='back'>
         <div className="login-page">
            <div className="form">
               <form onSubmit={formik.handleSubmit}  className="login-form">
                  <input type="email" 
                     placeholder="email"
                     onChange={formik.handleChange} 
                     value={formik.values.email} 
                     name="email"
                     id="inputEmail"
                     onBlur={formik.handleBlur}/>
                     {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
                  <input type="password" 
                     placeholder="password"
                     onChange={formik.handleChange} 
                     value={formik.values.password} 
                     name="password" 
                     id="inputPassword"
                     onBlur={formik.handleBlur}/>
                     {formik.errors.password && formik.touched.password  ? <div>{formik.errors.password}</div> : null}
                  <button type='submit'>login</button>
                  <div ref={error} className="not-user">Пользователь уже зерегистрирован</div>
                  <div ref={success} className="yes-user">Успешно</div>
                  <p className="message">Not registered? <Link to="/login">Create an account</Link></p>
               </form>
            </div>
         </div>
      </div>
   )
}

export default RegisterPage