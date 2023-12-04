/* eslint-disable semi */
export async function getResponse(url, method) {
  const res = await fetch(`https://blog.kata.academy/api/${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res;
}

export async function getResponseToken(url, method, token) {
  const res = await fetch(`https://blog.kata.academy/api/${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
}

export async function getResponseBody(url, method, body) {
  const res = await fetch(`https://blog.kata.academy/api/${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return res;
}

export async function getResponseBodyToken(url, method, body, token) {
  const res = await fetch(`https://blog.kata.academy/api/${url}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return res;
}
