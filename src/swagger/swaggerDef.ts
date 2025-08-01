// src/swagger/swaggerDef.js
export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventory Management API",
      version: "1.0.0",
      description:
        "API documentation for managing users, products, and inventory.",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            firstname: { type: "string" },
            lastname: { type: "string" },
            phone: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        UserUpdate: {
          type: "object",
          properties: {
            firstname: { type: "string", minLength: 2 },
            lastname: { type: "string", minLength: 2 },
            phone: { type: "string", minLength: 10 },
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
            roleName: { type: "string", enum: ["admin", "owner", "buyer"] },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apis: ["./src/controllers/user.controller.ts", "./src/routes/user.routes.ts"], // You document here with JSDoc comments
};
