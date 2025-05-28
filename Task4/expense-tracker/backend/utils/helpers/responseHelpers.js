export const sendResponse = (res, { status = 200, data = null, error = null, headers = {} }) => {
  // Apply headers
  Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));

  const handlers = new Map([
    ['1xx', () => res.status(status).json({ info: data || "Informational response" })],

    ['2xx', () =>
      Buffer.isBuffer(data)
        ? res.status(status).send(data)
        : res.status(status).json({ data })
    ],

    ['3xx', () => res.redirect(status, data || '/')],

    ['4xx', () => res.status(status).json({ error: error || "Client error occurred" })],

    ['5xx', () => res.status(status).json({ error: error || "Internal server error" })],
  ]);

  // Get the series: 1xx, 2xx, etc.
  const statusSeries = Math.floor(status / 100) + 'xx';

  const handler = handlers.get(statusSeries);

  return handler ? handler() : res.status(500).json({ error: "Unknown status code" });
};
