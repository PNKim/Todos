import { useEffect, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import axios from "axios";
import Complete from "./components/complete";

function App() {
  const [todo, setTodo] = useState<unknown[]>([]);
  const [newTodos, setNewTodos] = useState<boolean>(false);

  const getData = async () => {
    const listTodo = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/todo`
    );
    setTodo(listTodo.data.data);
  };
  const inCompleteTodo = todo.filter((item) => {
    return item.status === "incompleted";
  });

  const completeTodo = todo.filter((item) => {
    return item.status === "completed";
  });

  const handleNewTod = () => {
    setNewTodos(!newTodos);
  };

  const handleDelete = (id) => {
    const filterTodo = todo.filter((item) => {
      return item.id !== id;
    });
    setTodo(filterTodo);
  };

  useEffect(() => {
    getData();
  }, [handleNewTod]);

  return (
    <section className="w-full min-h-screen py-10 lg:px-10 flex flex-col items-center gap-6">
      <AddTodo addNewTodo={handleNewTod} />
      <Todo todos={inCompleteTodo} handleDelete={handleDelete} />
      {/* <Complete todos={completeTodo} handleDelete={handleDelete} /> */}
    </section>
  );
}

export default App;
