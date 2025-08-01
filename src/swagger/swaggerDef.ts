// src/swagger/swaggerDef.ts
export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventory Management API",
      version: "1.0.0",
      description:
        "API documentation for managing users, products, categories, and inventory.",
    },
    servers: [
      {
        url: "http://localhost:5000",
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
        // Category Schemas
        Category: {
          type: "object",
          required: ["id", "name", "status", "createdAt", "updatedAt"],
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "Unique identifier for the category",
              example: "123e4567-e89b-12d3-a456-426614174000",
            },
            name: {
              type: "string",
              minLength: 2,
              maxLength: 100,
              description: "Category name",
              example: "Electronics",
            },
            description: {
              type: "string",
              maxLength: 500,
              nullable: true,
              description: "Category description",
              example: "Electronic devices and gadgets",
            },
            status: {
              type: "string",
              enum: ["active", "inactive"],
              default: "active",
              description: "Category status",
              example: "active",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Category creation timestamp",
              example: "2025-01-31T12:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Category last update timestamp",
              example: "2025-01-31T12:00:00.000Z",
            },
          },
        },
        CategoryInput: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 100,
              description: "Category name",
              example: "Electronics",
            },
            description: {
              type: "string",
              maxLength: 500,
              nullable: true,
              description: "Category description",
              example: "Electronic devices and gadgets",
            },
            status: {
              type: "string",
              enum: ["active", "inactive"],
              default: "active",
              description: "Category status",
              example: "active",
            },
          },
        },
        CategoryUpdate: {
          type: "object",
          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 100,
              description: "Category name",
              example: "Electronics",
            },
            description: {
              type: "string",
              maxLength: 500,
              nullable: true,
              description: "Category description",
              example: "Electronic devices and gadgets",
            },
            status: {
              type: "string",
              enum: ["active", "inactive"],
              description: "Category status",
              example: "active",
            },
          },
        },
        // Response Schemas
        CategoryResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              $ref: "#/components/schemas/Category",
            },
            message: {
              type: "string",
              example: "Category created successfully",
            },
          },
        },
        CategoryListResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Category",
              },
            },
            count: {
              type: "integer",
              example: 10,
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "Validation failed",
            },
            details: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                    example: "name",
                  },
                  message: {
                    type: "string",
                    example: "String must contain at least 2 character(s)",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [
    "./src/controllers/user.controller.ts",
    "./src/routes/user.routes.ts",
    "./src/controllers/category.controller.ts",
    "./src/routes/category.routes.ts",
  ],
};
