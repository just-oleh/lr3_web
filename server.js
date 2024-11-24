const express = require('express');
const app = express();
const port = 3000;

let posts = [
  { id: 1, title: 'Post 1', description: 'Description for post 1', author: 'John' },
  { id: 2, title: 'Post 2', description: 'Description for post 2', author: 'Jane' }
];

app.use(express.json());
app.use(express.static('public')); 

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const { title, description, author } = req.body;
  const newPost = {
    id: posts.length + 1,
    title,
    description,
    author
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, description, author } = req.body;

  const post = posts.find(p => p.id === postId);
  if (post) {
    post.title = title;
    post.description = description;
    post.author = author;
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

app.delete('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter(p => p.id !== postId);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
