export const postData = async (url, data, retries = 0, maxRetries = 3) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await res.json();
      if (!res.ok) throw new Error(result?.error?.[0]?.message || "Request failed");
      return result?.data || result;
    } catch (err) {
      if (retries < maxRetries) {
        console.warn(`Retrying (${retries + 1})...`);
        return postData(url, data, retries + 1, maxRetries);
      }
      throw err;
    }
  };
  