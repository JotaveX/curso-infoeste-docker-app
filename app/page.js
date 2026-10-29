"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  async function loadTodos() {
    const res = await fetch("/api/todos");
    setTodos(await res.json());
  }

  useEffect(() => {
    loadTodos();
  }, []);

  async function createTodo(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    loadTodos();
  }

  async function updateTodo(id, data) {
    await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    loadTodos();
  }

  async function deleteTodo(id) {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    loadTodos();
  }

  function startEditing(todo) {
    setEditingId(todo._id);
    setEditingTitle(todo.title);
  }

  async function saveEditing(e) {
    e.preventDefault();
    await updateTodo(editingId, { title: editingTitle });
    setEditingId(null);
  }

  return (
    <main className="container">
      <h1>📝 Todo List</h1>

      <form onSubmit={createTodo} className="row">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="O que precisa ser feito?"
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul className="list">
        {todos.length === 0 && <li className="empty">Nenhuma tarefa ainda.</li>}

        {todos.map((todo) => (
          <li key={todo._id} className="item">
            {editingId === todo._id ? (
              <form onSubmit={saveEditing} className="row">
                <input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  autoFocus
                />
                <button type="submit">Salvar</button>
                <button type="button" className="secondary" onClick={() => setEditingId(null)}>
                  Cancelar
                </button>
              </form>
            ) : (
              <>
                <label className={todo.done ? "done" : ""}>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => updateTodo(todo._id, { done: !todo.done })}
                  />
                  {todo.title}
                </label>
                <div className="actions">
                  <button className="secondary" onClick={() => startEditing(todo)}>
                    Editar
                  </button>
                  <button className="danger" onClick={() => deleteTodo(todo._id)}>
                    Excluir
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
