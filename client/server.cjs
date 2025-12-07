const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Bind the router db to the app
server.db = router.db;

// 1. Setup Middleware
server.use(middlewares);

// Maps localhost:8080/api/auth/login -> internal /login logic
server.use(jsonServer.rewriter({
  "/api/auth/register": "/register",
  "/api/auth/login": "/login",
  "/api/citizen/*": "/citizens/$1",
  "/api/admin/*": "/admins/$1"
}));

// 3. Apply Auth Rules
server.use(auth);
server.use(router);

// 4. Start Server
server.listen(8080, () => {
  console.log('Mock Backend running on http://localhost:8080');
});