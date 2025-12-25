import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

function connectSocket() {
  return io(BASE_URL);
}
export default connectSocket;
