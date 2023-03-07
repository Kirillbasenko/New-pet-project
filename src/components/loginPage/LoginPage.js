import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch} from "react-redux"; 
import { useRef } from 'react';
import {useNavigate, Link} from 'react-router-dom' 
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

import {setUser} from "../../store/slices/userSlise"
import "./loginPage.scss"
import { app } from "../../fireBase";

const LoginPage = () => {
   const dispatch = useDispatch(); 
   let navigate = useNavigate() 
   const error = useRef("")
   const success = useRef("")

   async function signIn() {
      const auth = getAuth(app);
      let provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider)
      onAuthStateChanged(auth, (users) => {
         if (users) {
            dispatch(setUser({
               email: users.email, 
               id: users.uid, 
               token: users.accessToken, 
            }))
            navigate('/New-pet-project/')
         } else{
            error.current.style.display = "block"
         }
      });
   }

   const hendlerLodin = () => {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
      .then(({user}) => { 
         dispatch(setUser({ 
               email: formik.values.email, 
               id: user.uid, 
               token: user.accessToken, 
            })); 
         success.current.style.display = "block"
         navigate('/New-pet-project/')
      })
      .catch(() => {
         error.current.style.display = "block"
      });
   }

   const formik = useFormik({
      initialValues:{
         email: "",
         password: ""
      },
      validationSchema: Yup.object({
         email: Yup.string()
                  .email("Wrong email address")
                  .required("Required field"),
         password: Yup.string()
                  .required("Required field"),
      }),
      onSubmit: hendlerLodin
   })

   return(
      <div className='back'>
         <div className="login-page">
            <div className="form">
               <div className="title">LOGIN</div>
               <button id='google-button' >
                  <img 
                     onClick={() => signIn()} 
                     className="image" 
                     src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK"
                     alt="google" />
               </button>
               <form onSubmit={formik.handleSubmit}  className="login-form">
                  <div className="upInput">Email</div>
                  <input type="email" 
                     placeholder="email"
                     onChange={formik.handleChange} 
                     value={formik.values.email} 
                     name="email"
                     id="inputEmail"
                     onBlur={formik.handleBlur}/>
                     {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
                  <div className="upInput">Password</div>
                  <input type="password" 
                     placeholder="password"
                     onChange={formik.handleChange} 
                     value={formik.values.password} 
                     name="password" 
                     id="inputPassword"
                     onBlur={formik.handleBlur}/>
                     {formik.errors.password && formik.touched.password  ? <div>{formik.errors.password}</div> : null}
                  <button className="login" type='submit'>login</button>
                  <div ref={error} className="not-user">User is not found</div>
                  <div ref={success} className="yes-user">Success</div>
                  <p className="message">Need an account? <Link to="/register">SIGN UP</Link></p>
               </form>
            </div>
         </div>
      </div>
   )
}

export default LoginPage