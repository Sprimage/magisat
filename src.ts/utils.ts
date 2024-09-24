export function constructUrl(
    base: string,
    params: { [key: string]: any }
  ): string {
    const query = Object.entries(params)
      .filter(([_, v]) => v !== undefined && v !== null) // Exclude parameters with undefined or null values.
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&");
    return `${base}?${query}`;
  }

  export function logServerOperation(message, value) {
    const timestamp = new Date();
    const readableDate = timestamp.toLocaleString();
    console.log(`[${readableDate}] ${message}: ${value}`);
  }