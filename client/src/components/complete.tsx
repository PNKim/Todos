import DatePicker from "react-datepicker";
import axios from "axios";

interface MyComplete {
  todos: unknown[];
  handleDelete: (id: number) => void;
}

export default function Complete({ todos, handleDelete }: MyComplete) {
  const handleClick = async (id: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/todo/${id}`);
      handleDelete(id);
    } catch {
      alert("Can't add Todo");
    }
  };

  return (
    <>
      <div className="w-[90%] lg:w-[50%] text-2xl text-gray-500">Complete</div>
      {todos.map((item) => {
        const todoItem = item as {
          id: number;
          status: string;
          title: string;
          set_time: Date;
        };
        return (
          <div
            key={todoItem.id}
            className="w-[90%] lg:w-[50%] h-fit py-4 px-8 bg-white rounded-xl border-2 drop-shadow-md flex justify-between items-center relative"
          >
            <div className="w-full flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
              <div className=" flex gap-4 items-center justify-center">
                <input
                  checked={true}
                  type="checkbox"
                  value={todoItem.title}
                  className="checkbox checkbox-success [--chkfg:white] rounded-full"
                />
                <p className="sm:w-full text-2xl">{todoItem.title}</p>
              </div>
              <DatePicker
                disabled
                className="w-full sm:w-32 text-center text-2xl"
                selected={todoItem.set_time}
              />
            </div>
            <button
              onClick={() => {
                handleClick(todoItem.id);
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
