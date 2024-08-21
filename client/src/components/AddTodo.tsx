import axios from "axios";
import { useState } from "react";

export default function AddTodo({ addNewTodo }) {
  const [input, setInput] = useState<string | number>("");

  const handleClick = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/todo`, {
        title: input,
      });
      setInput("");
      addNewTodo();
    } catch {
      alert("Can't add Todo");
    }
  };

  return (
    <div className="w-[90%] lg:w-[50%] h-fit py-4 px-8 rounded-full bg-gray-300 flex justify-between items-center">
      <input
        className="w-full bg-gray-300 outline-none text-black text-2xl"
        placeholder="Add item"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
      />
      <button
        onClick={handleClick}
        className="text-2xl text-white py-4 px-6 rounded-full bg-slate-500"
      >
        +
      </button>
    </div>
  );
}
