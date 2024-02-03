/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { setNotification } from "../toolkit/notificationSlice";
import { useDispatch } from "react-redux";

const Notification = ({ message, type }) => {
  const [show, setShow] = useState(true);
  const [progressWidth, setProgressWidth] = useState("100%");

  const dispatch = useDispatch();

  useEffect(() => {
    const duration = 3000; // Duration in milliseconds
    const interval = 100; // Update interval for the progress bar

    const timer = setInterval(() => {
      const elapsed = duration - (Date.now() - startTime);
      const percentage = (elapsed / duration) * 100;
      setProgressWidth(`${percentage}%`);

      if (elapsed <= 0) {
        clearInterval(timer);
        setShow(false);
        dispatch(setNotification(null));
      }
    }, interval);

    const startTime = Date.now();

    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  return (
    <div
      className={`fixed bottom-10 right-10 p-4 rounded-md shadow-lg flex items-center justify-between gap-4 border border-purple-300 ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      } ${show ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
    >
      <p>{message}</p>
      <i
        onClick={() => dispatch(setNotification(null))}
        className="fas fa-xmark cursor-pointer"
      ></i>

      <div
        style={{ width: progressWidth }}
        className={`left-0 bottom-0 absolute shadow-lg rounded-lg h-[3px] ${
          type === "success" ? "bg-green-300" : "bg-red-300"
        }`}
      ></div>
    </div>
  );
};

export default Notification;
