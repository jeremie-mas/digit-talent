const serverModule = await import('../dist/server/server.js');
const server = serverModule.default;

export default {
  fetch(request) {
    return server.fetch(request, {}, {});
  },
};
