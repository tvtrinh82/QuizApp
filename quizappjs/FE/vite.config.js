const { defineConfig } = require('vite');

module.exports = defineConfig({
  plugins: [
    {
      name: 'markdown-utf8',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url.endsWith('.md')) {
            // Ép trình duyệt đọc file .md bằng chuẩn UTF-8
            res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
          }
          next();
        });
      }
    }
  ]
});
