const base = '/muestra/tilbury2/';
const host = 'web-by-elie.com';
const expiry = Date.parse('2026-12-02T23:00:00Z');
const version = 'v322.4';
const privacyHeaders = {
  'Cache-Control': 'private, no-store',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'X-Watch-Routing': 'private-storage',
  'Content-Security-Policy': "default-src 'none'; style-src 'self'; script-src 'self'; img-src 'self'; media-src 'self'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
};

function reply(body, status, extra = {}) {
  return new Response(body, { status, headers: { ...privacyHeaders, ...extra } });
}

function html(title, content, version) {
  return `<!doctype html>
<html lang="es" data-theme="system">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow,noarchive">
<title>${title} | Web By Elie</title>
<link rel="stylesheet" href="/assets/tilbury2-watch/estilo.css">
<script src="/assets/tilbury2-watch/ajustes.js" defer></script>
</head>
<body>
<header><a href="https://web-by-elie.com/" aria-label="Web By Elie, inicio"><img width="38" height="38" src="/assets/web-by-elie-logo.svg" alt="">Web By Elie</a><button type="button" id="ajustes" aria-label="Abrir ajustes" aria-haspopup="dialog"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7.4-.5 1.7 1.5-2 3.4-2.2-.7-1.6 1-0.5 2.3h-4l-.5-2.3-1.6-1-2.2.7-2-3.4 1.6-1.5v-2l-1.6-1.5 2-3.4 2.2.7 1.6-1 .5-2.3h4l.5 2.3 1.6 1 2.2-.7 2 3.4-1.7 1.5Z" transform="translate(0 -2)"/></svg></button></header>
<main>${content}</main>
<dialog id="panel" aria-labelledby="titulo-ajustes"><form method="dialog">
<div class="panel-heading"><h2 id="titulo-ajustes">Ajustes</h2><button type="submit" aria-label="Cerrar ajustes">×</button></div>
<p class="about"><span>Acerca de</span><strong>${version}</strong></p>
<label>Tema<select id="tema"><option value="system">Sistema</option><option value="day">Día</option><option value="night">Noche</option></select></label>
<label>Opacidad<input id="opacidad" type="range" min="86" max="100" value="96"></label>
<label>Desenfoque<input id="desenfoque" type="range" min="0" max="22" value="14"></label>
</form></dialog>
<span class="version" aria-label="Versión ${version}">${version}</span>
</body></html>`;
}

function mediaRange(header, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header);
  if (!match || (!match[1] && !match[2])) return null;
  const suffix = match[1] === '';
  const start = suffix ? Math.max(size - Number(match[2]), 0) : Number(match[1]);
  const end = !suffix && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end) return null;
  return { start, end };
}

function escapeTitle(title) {
  return title.replace(/[&<>"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;",
  }[character]));
}

async function videoResponse(request, bucket, key) {
  const range = request.headers.get('Range');
  const { method } = request;
  const mediaType = { 'Content-Type': 'video/mp4', 'Accept-Ranges': 'bytes' };
  if (method === 'HEAD' || range) {
    const info = await bucket.head(key);
    if (!info) return reply(null, 404);
    if (method === 'HEAD') return reply(null, 200, { ...mediaType, 'Content-Length': String(info.size) });
    const span = mediaRange(range, info.size);
    if (!span) return reply(null, 416, { ...mediaType, 'Content-Range': `bytes */${info.size}` });
    const length = span.end - span.start + 1;
    const clip = await bucket.get(key, { range: { offset: span.start, length } });
    if (!clip) return reply(null, 404);
    return reply(clip.body, 206, {
      ...mediaType,
      'Content-Length': String(length),
      'Content-Range': `bytes ${span.start}-${span.end}/${info.size}`,
    });
  }

  const clip = await bucket.get(key);
  if (!clip) return reply(null, 404);
  return reply(clip.body, 200, { ...mediaType, 'Content-Length': String(clip.size) });
}

export async function onRequest({ request, env }) {
  const { hostname, pathname } = new URL(request.url);
  const route = /^([a-f0-9]{24})\/(video\.mp4)?$/.exec(pathname.slice(base.length));
  if (hostname !== host || !pathname.startsWith(base) || !route) return reply('No encontrado.', 404);
  const { method } = request;
  if (method !== 'GET' && method !== 'HEAD') return reply(null, 405, { Allow: 'GET, HEAD' });

  const [, token, video] = route;
  if (Date.now() >= expiry) return reply(method === 'HEAD' ? null : 'La muestra ha caducado.', 410);
  const files = env.PROSPECT_MEDIA;
  if (video) return videoResponse(request, files, token + '.mp4');
  const manifest = await files.get('titles.json');
  if (!manifest) return reply('No se pudo cargar el vídeo. Inténtalo de nuevo.', 502);
  const titles = await manifest.json();
  if (!Object.hasOwn(titles, token) || typeof titles[token] !== 'string') return reply('No encontrado.', 404);
  const content = `<section class="panel"><h1>${escapeTitle(titles[token])}</h1><video src="${pathname}video.mp4" controls playsinline preload="metadata" aria-label="Muestra de vídeo"></video><p>Muestra de vídeo para vuestras redes.</p></section>`;
  const markup = method === 'HEAD' ? null : html('Muestra de vídeo', content, version);
  return reply(markup, 200, { 'Content-Type': 'text/html; charset=utf-8' });
}
