import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import { Provider } from "react-redux";
import { store } from "./utils/store.js";

function App() {


  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes >
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile />} ></Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>);
}

export default App;