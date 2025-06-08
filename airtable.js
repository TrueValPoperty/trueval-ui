export async function fetchValuationLogs() {
  const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
  const apiKey = import.meta.env.VITE_AIRTABLE_KEY;
  const tableName = "TrueVal_1";
  const url = `https://api.airtable.com/v0/${baseId}/${tableName}?pageSize=100`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch from Airtable");
  }

  const data = await res.json();
  return data.records;
}
