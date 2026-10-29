import { getTodosCollection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

// GET /api/todos -> lista todas as tarefas
export async function GET() {
  const todos = await getTodosCollection();
  const items = await todos.find().sort({ createdAt: -1 }).toArray();
  return Response.json(items);
}

// POST /api/todos -> cria uma tarefa { title }
export async function POST(request) {
  const { title } = await request.json();
  if (!title || !title.trim()) {
    return Response.json({ error: "O título é obrigatório" }, { status: 400 });
  }

  const todo = { title: title.trim(), done: false, createdAt: new Date() };
  const todos = await getTodosCollection();
  const { insertedId } = await todos.insertOne(todo);
  return Response.json({ _id: insertedId, ...todo }, { status: 201 });
}
