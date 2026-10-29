import { ObjectId } from "mongodb";
import { getTodosCollection } from "@/lib/mongodb";

function toObjectId(id) {
  return ObjectId.isValid(id) ? new ObjectId(id) : null;
}

// PUT /api/todos/:id -> atualiza { title?, done? }
export async function PUT(request, { params }) {
  const _id = toObjectId((await params).id);
  if (!_id) return Response.json({ error: "ID inválido" }, { status: 400 });

  const body = await request.json();
  const update = {};
  if (typeof body.title === "string" && body.title.trim()) update.title = body.title.trim();
  if (typeof body.done === "boolean") update.done = body.done;

  const todos = await getTodosCollection();
  const result = await todos.findOneAndUpdate(
    { _id },
    { $set: update },
    { returnDocument: "after" }
  );
  if (!result) return Response.json({ error: "Tarefa não encontrada" }, { status: 404 });
  return Response.json(result);
}

// DELETE /api/todos/:id -> remove a tarefa
export async function DELETE(request, { params }) {
  const _id = toObjectId((await params).id);
  if (!_id) return Response.json({ error: "ID inválido" }, { status: 400 });

  const todos = await getTodosCollection();
  const { deletedCount } = await todos.deleteOne({ _id });
  if (!deletedCount) return Response.json({ error: "Tarefa não encontrada" }, { status: 404 });
  return new Response(null, { status: 204 });
}
