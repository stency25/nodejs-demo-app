
const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");

test("app responds with the expected message", async (t) => {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello! My Node.js DevOps CI/CD app is running!\n");
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => server.close());

  const port = server.address().port;

  const response = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}`, (res) => {
      let body = "";

      res.setEncoding("utf8");
      res.on("data", (chunk) => body += chunk);
      res.on("end", () => resolve({ status: res.statusCode, body }));
    }).on("error", reject);
  });

  assert.equal(response.status, 200);
  assert.equal(
    response.body,
    "Hello! My Node.js DevOps CI/CD app is running!\n"
  );
});
