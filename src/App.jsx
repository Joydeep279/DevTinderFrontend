import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body.jsx";

function App() {


  return (<BrowserRouter basename="/">
    <Routes >
      <Route path="/" element={<Body />}>
        <Route path="/login" element={<div>LOGIN </div>}></Route>
        <Route path="/profile" element={<div>profile</div>} ></Route>
      </Route>

    </Routes>
  </BrowserRouter>);
}

export default App;