import { createServer, Model } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", { id: "1", name: "Bob Jhon" });
      server.create("user", { id: "2", name: "Alice" });
    },

    routes() {
      this.namespace = "api";

      this.get("/users", (schema) => schema.users.all());

      this.post("/users", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        return schema.users.create(attrs);
      });

      this.delete("/users/:id", (schema, request) => {
        const id = request.params.id;

        return schema.users.find(id).destroy();
      });
    },
  });

  return server;
}
