const token = "582fc07f-fe23-477a-994d-8aefd966d480";

const config = {
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: token,
    "Content-Type": "application/json"
  }
};

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  }).then(res => res.json());
}

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(res => res.json());
}

export function updateUserInfo({ name, about }) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about })
  }).then(res => res.json());
}
