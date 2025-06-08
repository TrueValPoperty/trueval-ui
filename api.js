export async function logValuation(data) {
  const res = await fetch(import.meta.env.VITE_API_URL + "/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchLogs() {
  const res = await fetch(import.meta.env.VITE_API_URL + "/logs");
  return res.json();
}