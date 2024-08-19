import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Todo({ todos }) {
  const [dateTime, setDateTime] = useState(new Date());

  const updateTodo = async (data) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/todo`, data);
    } catch {
      console.log("error");
    }
  };
  useEffect(() => {}, [dateTime]);
  return (
    <>
      <div className="w-[90%] lg:w-[50%] text-2xl text-gray-500">To Do</div>
      {todos.map((item) => {
        return (
          <div
            key={item.id}
            className="w-[90%] lg:w-[50%] h-fit py-4 px-8 bg-white rounded-xl border-2 drop-shadow-md flex justify-between items-center"
          >
            <div className="w-full flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
              <div className="flex gap-4 items-center justify-center">
                <input
                  onClick={(e) => {
                    console.log(e.target.value);
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
                onChange={(date) => {
                  setDateTime(date);
                  item.set_time = date;
                  updateTodo(item);
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
