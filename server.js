const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require("cors");
const path = require("path");
const upload = require("./utils/fileUpload");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// SWAGGER
const swaggerOptions = require("./utils/swaggerOptions")
const swaggerSpec = swaggerJsdoc(swaggerOptions)

// Import Controllers
const authController = require("./controllers/authController");
const postsController = require("./controllers/postsController");
const usersController = require("./controllers/usersController");

// Import Midleware
const middleware = require("./middlewares/auth");

// Define Routes

// Testing CI/CD Route
app.get("/testing-ci-cd/:id", usersController.getPostsByID);

// Auth
app.post("/auth/register", upload.single("picture"), authController.register);
app.post("/auth/login", authController.login);
app.get("/auth/me", middleware.authenticate, authController.currentUser);

app.post("/auth/login-google", authController.loginGoogle);

// Posts
app.post("/posts", middleware.authenticate, postsController.create);
app.delete("/posts/:id", middleware.authenticate, postsController.deleteByID);
app.put("/posts/:id", middleware.authenticate, postsController.updateByID);

app.get("/users/:id/posts", usersController.getPostsByID);
app.delete(
  "/users/:id",
  middleware.authenticate,
  middleware.isAdmin,
  usersController.deleteByID
);

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Public File Access
app.use("/public/files", express.static(path.join(__dirname, "/storages")));

app.listen(process.env.PORT || 2000, () => {
  console.log(
    `Server berhasil berjalan di port http://localhost:${
      process.env.PORT || 2000
    }`
  );
});

module.exports = app;
