import { useEffect, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import axios from "axios";

function App() {
  const [todo, setTodo] = useState<unknown[]>([]);
  const getData = async () => {
    const listTodo = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/todo`
    );
    setTodo(listTodo.data.data);
  };
  console.log(todo);
  const filterTodo = todo.filter((item) => {
    return item.status === "incompleted";
  });

  useEffect(() => {
    if (!todo[0]) {
      getData();
    }
  }, []);

  return (
    <section className="w-full min-h-screen py-10 lg:px-10 flex flex-col items-center gap-6">
      <AddTodo />
      <Todo todos={filterTodo} />
    </section>
  );
}

export default App;
