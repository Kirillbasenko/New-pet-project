import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "../mainPage/MainPage";
import LoginPage from "../loginPage/LoginPage";
import AppHeader from "../AppHeader/AppHeader";
import RegisterPage from "../registerPage/RegisterPage"
import SinglePhoto from "../singlePhoto/SinglePhoto";
import Favorites from "../favorite/Favorite";
import CreatePhoto from "../createPhoto/CreactePhoto";

function App() {
  return (
    <Router>
      <AppHeader/>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="register" element={<RegisterPage/>}/>
          <Route path="photo/:photoId/" element={<SinglePhoto/>}/>
          <Route path="favorit" element={<Favorites/>}/>
          <Route path="create" element={<CreatePhoto/>}/>
        </Routes>
      </Router>
  );
}

export default App;
