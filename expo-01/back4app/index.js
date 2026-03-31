import axios from "axios";

const urlBase = "https://parseapi.back4app.com/classes/Tarefa";
const headers = {
  "X-Parse-Application-Id": "ztTBDtY0mFEN3YdHhbu7EsnosXk4wucDZ4P3U6NU",
  "X-Parse-JavaScript-Key": "VHTVAPxrMO7XSJWiTcSB5Oxu7vDbLx8HM2bWbTSN",
  "X-Parse-REST-API-Key": "vYW6VL465v373VxgaMtzgOH0NJ5KJsLdZnk3d1XR",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

export async function getTarefas() {
  const response = await axios.get(urlBase, {
    headers: headers,
  });
  return response.data.results;
}

export async function adicionarTarefa(novaTarefa) {
  const response = await axios.post(urlBase, novaTarefa, {
    headers: headersJson,
  });
  return response.data;
}

export async function atualizarTarefa(objectId, dados) {
  const response = await axios.put(
    `${urlBase}/${objectId}`,
    dados,
    {
      headers: headersJson,
    }
  );
  return response.data;
}

export async function deletarTarefa(objectId) {
  const response = await axios.delete(
    `${urlBase}/${objectId}`,
    {
      headers: headers,
    }
  );
  return response.data;
}