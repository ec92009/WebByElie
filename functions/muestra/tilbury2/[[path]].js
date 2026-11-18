const upstreamOrigin = "https://muestras.web-by-elie.com";
const pathPattern = /^\/muestra\/tilbury2\/(?:[a-f0-9]{24}\/(?:video\.mp4)?|estilo\.css|ajustes\.js|logo\.svg)$/;
const privateResponse = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "X-Watch-Routing": "service-binding",
};

export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  if (url.hostname !== "web-by-elie.com" || !pathPattern.test(url.pathname)) {
    return new Response("No encontrado.", { status: 404, headers: privateResponse });
  }
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response(null, {
      status: 405, headers: { ...privateResponse, Allow: "GET, HEAD" },
    });
  }

  const range = request.headers.get("Range");
  const upstream = new URL(url.pathname, upstreamOrigin);
  try {
    const upstreamRequest = new Request(upstream, {
      method: request.method,
      headers: range ? { Range: range } : {},
      redirect: "error",
    });
    const response = await env.PROSPECT_PREVIEWS.fetch(upstreamRequest);
    const headers = new Headers(response.headers);
    for (const [key, value] of Object.entries(privateResponse)) headers.set(key, value);
    return new Response(response.body, { status: response.status, headers });
  } catch {
    return new Response("No se pudo cargar el vídeo. Inténtalo de nuevo.", {
      status: 502, headers: privateResponse,
    });
  }
}
