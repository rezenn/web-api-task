import express, { Application } from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/user.route";

const app: Application = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/api/users", userRouter);

// In-memory storage -
let users: any[] = [
  {
    id: "user1",
    username: "john_doe",
    email: "john@example.com",
    name: "John Doe",
    age: 30,
  },
  {
    id: "user2",
    username: "jane_smith",
    email: "jane@example.com",
    name: "Jane Smith",
    age: 25,
  },
];

// GET all users -
app.get("/api/users", (req, res) => {
  return res.json(users);
});

// GET single user -
app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json(user);
});

// POST new user -
app.post("/api/users", (req, res) => {
  const { id, username, email, name, age } = req.body;

  if (!id || !username || !email || !name) {
    return res
      .status(400)
      .json({ error: "Id, Username, email, and name are required" });
  }

  const existingUserById = users.find((u) => u.id === id);
  if (existingUserById) {
    return res.status(409).json({ error: "User ID already exists" });
  }
  const existingUserByEmail = users.find((u) => u.email === email);
  if (existingUserByEmail) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const existingUserByUsername = users.find((u) => u.username === username);
  if (existingUserByUsername) {
    return res.status(409).json({ error: "Username already exists" });
  }

  const newUser = {
    id: id,
    username,
    email,
    name,
    age: age || null,
  };

  users.push(newUser);
  return res.status(201).json(newUser);
});

// PUT update user -
app.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const { username, email, name, age } = req.body;

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!username || !email || !name) {
    return res
      .status(400)
      .json({ error: "Username, email, and name are required" });
  }

  const existingUserByEmail = users.find(
    (u) => u.email === email && u.id !== id
  );
  if (existingUserByEmail) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const existingUserByUsername = users.find(
    (u) => u.username === username && u.id !== id
  );
  if (existingUserByUsername) {
    return res.status(409).json({ error: "Username already exists" });
  }

  users[userIndex] = {
    id,
    username,
    email,
    name,
    age: age || users[userIndex].age,
  };

  return res.json(users[userIndex]);
});

// DELETE user -
app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(userIndex, 1);
  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
