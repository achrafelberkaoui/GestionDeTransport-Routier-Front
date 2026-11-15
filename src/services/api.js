const API_BASE_URL = "/api/v1";

export const apiRequest = async (
  endpoint,
  { method = "GET", body } = {},
) => {
  const headers = {};
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    credentials: "include",
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Erreur HTTP : ${response.status}`);
  }

  return data;
};