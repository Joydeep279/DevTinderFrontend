import { useEffect, useState, useRef } from "react";
import connectSocket from "../utils/Socket";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addChatData } from "../utils/chatSlice";

const ChatInterface = () => {
  const { data } = useSelector((store) => store?.user);
  const chatData = useSelector((store) => store?.chat);
  const { toUserId } = useParams();
  const [sendMsg, setSendMsg] = useState("");
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  const sendSocketMsg = () => {
    if (sendMsg.length === 0) {
      return;
    }
    if (socketRef.current) {
      socketRef.current.emit("sendMsg", {
        fromUserName: data.firstName,
        fromUserId: data._id,
        toUserId,
        msg: sendMsg,
      });
      setSendMsg("");
    }
  };

  useEffect(() => {
    const socket = connectSocket();
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("joinChat", { fromUserId: data._id, toUserId });
    });

    socket.on("RecievedMsg", ({ name, msg }) => {
      dispatch(addChatData({ name, msg }));
    });

    return () => {
      if (socket.connected) {
        socket.emit("leaveChat", { fromUserId: data._id, toUserId });
      }
      socket.off("RecievedMsg");
      socket.off("connect");
      socket.disconnect();
    };
  }, [toUserId, data._id, dispatch]);

  return (
    // Main Card Container
    <form
      className="flex flex-col items-center w-full max-w-3/5 mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        sendSocketMsg();
      }}>
      {/* Header / Title (Optional but looks nice) */}
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
                {msg.msg}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="w-full bg-base-300 p-3 rounded-b-xl">
        <div className="join w-full">
          <input
            onChange={(e) => setSendMsg(e.target.value)}
            value={sendMsg}
            className="input input-bordered join-item w-full focus:outline-none"
            type="text"
            placeholder="Type a message..."
          />
          <button className="btn btn-primary join-item" >
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInterface;
