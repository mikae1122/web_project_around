const token = "582fc07f-fe23-477a-994d-8aefd966d480";

const config = {
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
};

export function addCard({ name, link }) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Erro ao adicionar card: ${res.status}`);
    }
    return res.json();
  });
}

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Erro ao buscar informações do usuário");
    }
    return res.json();
  });
}

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Erro ao buscar cards iniciais");
    }
    return res.json();
  });
}

export function updateUserInfo({ name, about }) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Erro ao atualizar perfil");
    }
    return res.json();
  });
}
export function handledelete({ cardid }) {
  return fetch(`${config.baseUrl}/cards/${cardid}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Erro ao deletar o card: ${res.status}`);
    }
    return res.json();
  });
}
