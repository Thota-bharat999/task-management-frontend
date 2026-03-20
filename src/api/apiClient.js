const BASE_URL = import.meta.env.VITE_API_URL;

const getUrl = (endpoint) => {
  if (!endpoint) return BASE_URL;
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) return endpoint;
  // make sure there is exactly one slash
  const slash = BASE_URL.endsWith("/") || endpoint.startsWith("/") ? "" : "/";
  return `${BASE_URL}${slash}${endpoint}`;
};

export const apiRequest = async (endpoint, options = {}) => {
  const url = getUrl(endpoint);
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {})
    }
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Server error");
  }

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};