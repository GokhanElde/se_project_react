const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.ciddancode.ignorelist.com"
    : "http://localhost:3001";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
};

export function signup(userData) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then(checkResponse);
}

export function signin(userData) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then(checkResponse);
}

export function checkToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
