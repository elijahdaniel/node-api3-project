const server = require('./api/server');
const PORT = 5555;

server.listen(PORT, () => console.log(`Running on port:${PORT}`));
