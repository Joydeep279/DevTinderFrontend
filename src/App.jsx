import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import { Provider } from "react-redux";
import { store } from "./utils/store.js";
import Feed from "./components/Feed.jsx";
import Connection from "./components/Connection.jsx";
import Request from "./components/Request.jsx";
import Chat from "./components/Chat.jsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/connection" element={<Connection />}></Route>
            <Route path="/requests" element={<Request />}></Route>
            <Route path="/chat/:toUserId" element={<Chat />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
