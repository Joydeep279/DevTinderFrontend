import { Outlet } from "react-router-dom";
import Navbar from "./components/Nav";

function Body() {

    return <>
        <Navbar />
        <Outlet />
    </>
}
export default Body;