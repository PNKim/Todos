import DatePicker from "react-datepicker";
import axios from "axios";

export default function Complete({ todos, handleDelete }) {
  const handleClick = async (id) => {
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
        return (
          <div
            key={item.id}
            className="w-[90%] lg:w-[50%] h-fit py-4 px-8 bg-white rounded-xl border-2 drop-shadow-md flex justify-between items-center relative"
          >
            <div className="w-full flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
              <div className=" flex gap-4 items-center justify-center">
                <input
                  checked={true}
                  type="checkbox"
                  value={item.title}
                  className="checkbox checkbox-success [--chkfg:white] rounded-full"
                />
                <p className="sm:w-full text-2xl">{item.title}</p>
              </div>
              <DatePicker
                disabled
                className="w-full sm:w-32 text-center text-2xl"
                selected={item.set_time}
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
