"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../reusables/Input";
import { Button } from "../reusables/Button";
import { Card } from "../reusables/Card";
import { Checkbox } from "../reusables/Checkbox";
import { Trash, Edit } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import ThemeSwitch from "../reusables/ThemeSwitch";
import { TodosInterface } from "../utils/interface";
import { createTodo, fetchAllTodos } from "@/store/actions";
import { generateId } from "@/lib/utils";
import { FixedSizeList as List } from "react-window";

const TodoLanding = () => {
  const dispatch = useDispatch<AppDispatch>();

  const storedTodos: TodosInterface[] = (() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("todos");
      try {
        return data ? JSON.parse(data) : [];
      } catch {
        return [];
      }
    }
    return [];
  })();

  const [todos, setTodos] = useState<TodosInterface[]>([...storedTodos]);
  const [todo, setTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    if (!storedTodos?.length) {
      handleTodosFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedTodos]);

  const handleTodosFetch = () => {
    try {
      dispatch(fetchAllTodos())
        .unwrap()
        .then((res) => {
          if (res?.length) {
            localStorage.setItem("todos", JSON.stringify(res));
          }
        })
        .catch((err) => err);
    } catch (err) {
      return err;
    }
  };

  const addTodo = () => {
    if (!todo.trim()) return;
    const randomId = generateId(3);
    const randomUser = generateId(1);

    const newTodos = [
      { id: randomId, title: todo, completed: false, userId: randomUser },
      ...todos,
    ];
    setTodos(newTodos);
    setTodo("");
    localStorage.setItem("todos", JSON.stringify(newTodos));

    const payload = {
      title: todo,
      completed: false,
      userId: randomUser,
    };

    dispatch(createTodo(payload));
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((t) => t.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const startEditing = (id: number, title: string) => {
    setEditingTodo(id);
    setEditTitle(title);
  };

  const saveEdit = (id: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((t) =>
        t.id === id ? { ...t, title: editTitle } : t
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });

    setEditingTodo(null);
    setEditTitle("");
  };

  const filteredTodos = todos
    .filter((t) =>
      filter === "completed"
        ? t.completed
        : filter === "pending"
        ? !t.completed
        : true
    )
    .filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const Row = ({
    index,
    style,
    data,
  }: {
    index: number;
    style: React.CSSProperties;
    data: TodosInterface[];
  }) => {
    const t = data[index];

    return (
      <div style={style} key={t.id}>
        <Card className="flex items-center justify-between p-2 my-2 ">
          <div className="flex items-center gap-2 text-[#1A202C]">
            <Checkbox checked={t.completed} onChange={() => toggleTodo(t.id)} />

            {editingTodo === t.id ? (
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={() => saveEdit(t.id)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(t.id)}
                autoFocus
                editing={true}
              />
            ) : (
              <span className={t.completed ? "line-through" : ""}>
                {t.title}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => startEditing(t.id, t.title)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => deleteTodo(t.id)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div
      className={`max-w-md mx-auto p-4 rounded-lg mt-12 ${
        darkMode
          ? "bg-gray-900 text-white border-[1px] border-text-gray-200 "
          : "bg-[#ffffff] text-black  shadow-lg"
      }`}
    >
      <ThemeSwitch />
      <h2
        className={`text-xl font-bold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        To-Do List
      </h2>
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search todos..."
        className="mb-4"
      />
      <div className="flex gap-2 mb-4">
        <Input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add a new todo..."
        />
        <Button onClick={addTodo}>Add</Button>
      </div>

      <div className="flex justify-between mb-2">
        {["all", "completed", "pending"].map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      <div>
        {/* {filteredTodos.map((t) => (
          <Card
            key={t.id}
            className="flex items-center justify-between p-2 my-2"
          >
            <div className="flex items-center gap-2 text-[#1A202C]">
              <Checkbox
                checked={t.completed}
                onChange={() => toggleTodo(t.id)}
              />

              {editingTodo === t.id ? (
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={() => saveEdit(t.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveEdit(t.id);
                    }
                  }}
                  autoFocus
                  editing={true}
                />
              ) : (
                <span className={t.completed ? "line-through" : ""}>
                  {t.title}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => startEditing(t.id, t.title)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => deleteTodo(t.id)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))} */}

        <List
          height={300} // Adjust height based on UI
          itemCount={filteredTodos.length}
          itemSize={100} // Adjust based on item height
          width="100%"
          itemData={filteredTodos} // Pass filtered todos
        >
          {Row}
        </List>
      </div>
    </div>
  );
};

export default TodoLanding;
