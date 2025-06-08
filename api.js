export async function logValuation(data) {
  const res = await fetch(import.meta.env.VITE_API_URL + "/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
