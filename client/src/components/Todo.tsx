import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Todo({ todos, handleDelete }) {
  const [dateTime, setDateTime] = useState(new Date());
  const [dateUI, setDateUI] = useState({});

  const updateTodo = async (data) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/todo`, data);
    } catch {
      alert("Can't change Date");
    }
  };

  const handleClick = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/todo/${id}`);
      handleDelete(id);
    } catch {
      alert("Can't add Todo");
    }
  };

  useEffect(() => {}, [dateTime, updateTodo]);
  return (
    <>
      <div className="w-[90%] lg:w-[50%] text-2xl text-gray-500">To Do</div>
      {todos.map((item) => {
        return (
          <div
            key={item.id}
            className={
              dateUI[item.id] === item.id
                ? "w-[90%] lg:w-[50%] h-fit py-4 px-8 mb-60 bg-white rounded-xl border-2 drop-shadow-md flex justify-between items-center relative z-1"
                : "w-[90%] lg:w-[50%] h-fit py-4 px-8 bg-white rounded-xl border-2 drop-shadow-md flex justify-between items-center relative z-1"
            }
          >
            <div className="w-full flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
              <div className="w-full flex gap-4 items-center justify-center">
                <input
                  onClick={(e) => {
                    item.status = "completed";
                    updateTodo(item);
                  }}
                  type="checkbox"
                  value={item.title}
                  className="checkbox checkbox-success [--chkfg:white] rounded-full"
                />
                <p className="sm:w-full text-2xl">{item.title}</p>
              </div>
              <DatePicker
                className="w-full sm:w-32 text-center text-2xl"
                selected={item.set_time}
                onFocus={(e) => {
                  setDateUI({ [item.id]: item.id });
                }}
                onClickOutside={(e) => {
                  setDateUI({});
                }}
                onChange={(date) => {
                  setDateTime(date);
                  item.set_time = date;
                  updateTodo(item);
                  setDateUI({});
                }}
              />
            </div>
            <button
              onClick={() => {
                handleClick(item.id);
              }}
              className="text-white py-2 px-4 rounded-full bg-slate-500 absolute right-[-20px] top-[-20px]"
            >
              X
            </button>
          </div>
        );
      })}
    </>
  );
}
