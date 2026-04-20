import axios from "axios";

// Instância do Axios apontando para o seu backend na Vercel
const api = axios.create({
  baseURL: "https://aos-2026-1-mocha.vercel.app", // 🚨 Troque para a SUA URL do Vercel, se for diferente!
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getTarefas() {
  const response = await api.get("/tarefas");
  return response.data;
}

export async function getTarefa(id) {
  const response = await api.get(`/tarefas/${id}`);
  return response.data;
}

export async function adicionarTarefa(novaTarefa) {
  const response = await api.post("/tarefas", novaTarefa);
  return response.data;
}

// O React Query está mandando (id, dados)
export async function atualizarTarefa(id, tarefaAtualizada) {
  const response = await api.put(`/tarefas/${id}`, tarefaAtualizada);
  return response.data;
}

export async function removerTarefa(id) {
  const response = await api.delete(`/tarefas/${id}`);
  return response.data;
}