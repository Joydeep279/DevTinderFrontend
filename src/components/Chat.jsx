import { useEffect, useState } from "react";
import connectSocket from "../utils/Socket";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addChatData, clearChatData } from "../utils/chatSlice";

const ChatInterface = () => {
  const { data } = useSelector((store) => store?.user);
  const chatData = useSelector((store) => store?.chat);
  const { toUserId } = useParams();
  const [sendMsg, setSendMsg] = useState("");
  const dispatch = useDispatch();
  const fromUserId = data._id;

  useEffect(() => {
    const socket = connectSocket();
    socket.emit("joinChat", { toUserId, fromUserId });

    socket.on("roomMsg", (messagePacket) => {
      dispatch(addChatData(messagePacket));
    });

    return () => {
      socket.disconnect();
      dispatch(clearChatData());
    };
  }, [dispatch]);

  function sendSocketMsg() {
    const socket = connectSocket();
    socket.emit("sendMsg", {
      name: data.firstName,
      toUserId,
      fromUserId,
      sendMsg,
    });
    setSendMsg("");
  }

  return (
    <form
      className="flex flex-col items-center w-full max-w-3/5 mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        sendSocketMsg();
      }}>
      <div className="w-full bg-base-300 p-4 rounded-t-xl border-b border-base-100">
        <h2 className="font-bold text-lg text-white">
          {chatData.fromUserDetails
            ? chatData.fromUserDetails.firstName +
              " " +
              chatData.fromUserDetails.lastName +
              "'s  Chat"
            : "Chat"}
        </h2>
      </div>
      <div className="w-full h-[500px] bg-base-200 overflow-y-auto p-4 flex flex-col-reverse gap-2">
        {chatData.data.map((msg, index) => {
          const isMe = msg.name === data.firstName; // Let's pretend we are Obi-Wan
          return (
            <div
              key={index}
              className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
              <div className="chat-image avatar"></div>
              <div
                className={`chat-bubble ${
                  isMe ? "chat-bubble-primary" : "chat-bubble-neutral"
                }`}>
                {msg.sendMsg}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full bg-base-300 p-3 rounded-b-xl">
        <div className="join w-full">
          <input
            onChange={(e) => setSendMsg(e.target.value)}
            value={sendMsg}
            className="input input-bordered join-item w-full focus:outline-none"
            type="text"
            placeholder="Type a message..."
          />
          <button className="btn btn-primary join-item">Send</button>
        </div>
      </div>
    </form>
  );
};

export default ChatInterface;