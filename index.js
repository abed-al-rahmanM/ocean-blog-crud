import express from "express";

const app = express();
const port = 3000;

let posts = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.post("/posts", (req, res) => {
  const newPost = {
    id: Date.now(),
    title: req.body["title"],
    author: req.body["author"],
    content: req.body["content"],
    createdAt: new Date().toLocaleDateString(),
  };
  posts.push(newPost);
  res.redirect("/");
});

app.get("/posts/:id/edit", (req, res) => {
  const postId = Number(req.params.id);

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("edit.ejs", { post });
});

app.post("/posts/:id/edit", (req, res) => {
  const postId = Number(req.params.id);

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  post.title = req.body["title"];
  post.author = req.body["author"];
  post.content = req.body["content"];

  res.redirect("/");
});

app.post("/posts/:id/delete", (req, res) => {
  const postId = Number(req.params.id);

  posts = posts.filter((post) => post.id !== postId);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
