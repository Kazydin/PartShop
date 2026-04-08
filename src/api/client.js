// Базовый HTTP-клиент: все запросы к /api идут через Vite-прокси на C# бэкенд

async function request(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json();
}

export default request;
