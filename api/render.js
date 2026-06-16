import { createServer } from 'node:http';
import { Readable } from 'node:stream';

const serverModule = await import('../dist/server/server.js');
const server = serverModule.default;

export default async function handler(req, res) {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const url = `${protocol}://${host}${req.url}`;

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value == null) continue;
    if (Array.isArray(value)) {
      value.forEach((v) => headers.append(key, v));
    } else {
      headers.set(key, value);
    }
  }

  const isBodyMethod = !['GET', 'HEAD'].includes((req.method || 'GET').toUpperCase());

  const request = new Request(url, {
    method: req.method,
    headers,
    body: isBodyMethod ? Readable.toWeb(req) : undefined,
    duplex: isBodyMethod ? 'half' : undefined,
  });

  const response = await server.fetch(request, {}, {});

  res.statusCode = response.status;
  for (const [key, value] of response.headers.entries()) {
    res.setHeader(key, value);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  res.end(buffer);
}
