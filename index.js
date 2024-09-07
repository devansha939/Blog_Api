import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis tortor mauris. Duis at euismod libero, nec tempus magna. Curabitur id orci ut libero fermentum sagittis. Donec velit turpis, fermentum a rhoncus in, finibus in purus. Nunc tristique faucibus metus, ut mollis velit luctus ac. Cras vehicula sit amet dui ac placerat. Nullam in porta mi. Cras efficitur vehicula mattis. Ut laoreet, erat vitae semper porttitor, quam lorem consequat nisi, sit amet porta eros erat non tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis suscipit urna, in bibendum lacus rhoncus non. Praesent lorem mauris, maximus sit amet purus vel, faucibus sollicitudin sem. Suspendisse fringilla consequat arcu, in condimentum ex.",
    author: "Mark",
    date: "02-06-24",
  },
  {
    id: 2,
    title: "Vestibulum vitae tristique leo. Morbi",
    content:
      "Etiam ullamcorper auctor facilisis. Donec cursus lacus metus, at viverra nibh ullamcorper ac. Nam nec turpis placerat, tincidunt ante convallis, placerat orci. Proin faucibus massa at metus gravida, nec sodales urna imperdiet. Mauris maximus iaculis nibh, faucibus dapibus metus tristique efficitur. Vivamus tincidunt sem congue, ullamcorper turpis ut, tempor purus. Pellentesque nec magna tempus, semper quam sit amet, feugiat lorem. Maecenas a faucibus est. Etiam eros est, dignissim id sem sed, lobortis vulputate lorem. Aenean pulvinar erat ut metus porttitor ullamcorper. Pellentesque rhoncus elit vel porta viverra. Vestibulum at mi nec massa gravida imperdiet quis id libero. Etiam varius sed est at iaculis. Vivamus eget elementum tellus. Ut blandit pulvinar porttitor",
    author: "Michael",
    date: "01-06-24",
  },
  {
    id: 3,
    title: "Fusce maximus ante quis erat euismod scelerisque.",
    content:
      "Integer ut maximus quam. Sed ex urna, aliquam non volutpat non, cursus at quam. Phasellus hendrerit sapien sit amet quam congue tempus. Aliquam vitae augue ac est molestie feugiat vitae vel velit. In at ligula vel arcu sagittis auctor. Phasellus id dolor aliquet, imperdiet eros vitae, malesuada lorem. Pellentesque ut dapibus libero. Quisque nisi mi, pellentesque sed rutrum et, aliquam non massa. Aenean pretium dui vitae sem lacinia, vel elementum eros dictum. Maecenas elementum vestibulum ex. Proin odio lectus, egestas quis ex vitae, dignissim porta velit. Nullam sit amet ligula at nisl elementum ultrices vitae id nisl. Donec ac massa at velit euismod fermentum a vitae massa. Mauris nisl est, scelerisque ut est efficitur, consequat auctor sapien. Duis rutrum libero ac odio pretium, eu pellentesque lectus aliquet.",
    author: "Samuel",
    date: "03-06-24",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const date = new Date();
  const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
  const formattedDate = date.toLocaleDateString('en-GB', options).replace(/\//g, '-');
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: formattedDate,
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
