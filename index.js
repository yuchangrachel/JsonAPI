const express = require("express");
const app = express();

app.set("json spaces", 2);
const port = process.env.PORT || 5000;

//0STEP:main page
app.get("/", (_, res) => {
  res.send("Hello, This main page");
});

//Fetch posts array
const posts = require("./api.js");

//1 ROUTES
app.get("/api/ping", (req, res) => {
  res.status(200).send({ success: true });
});

//2 ROUTES
app.get("/api/posts", (req, res) => {
  if (!req.query.hasOwnProperty("tags"))
    res.status(400).send({ error: "Tags parameter is required" });

  const tagsArray = req.query.tags.split(",");

  const filterPosts = (post) => {
    for (i = 0; i < tagsArray.length; i++) {
      if (post.tags.includes(tagsArray[i])) return true;
    }
  };
  const filteredPosts = posts.filter(filterPosts);

  //remove duplicate posts
  const uniquePosts = [...new Set(filteredPosts)];

  //sort posts by ID(default)
  uniquePosts.sort((a, b) => {
    if (a.id > b.id) return 1;
    else if (a.id < b.id) return -1;
    else return 0;
  });

  if (req.query.hasOwnProperty("sortBy")) {
    if (
      req.query.hasOwnProperty("direction") &&
      req.query.direction == "desc"
    ) {
      if (req.query.sortBy == "reads") {
        uniquePosts.sort((a, b) => {
          if (a.reads < b.reads) return 1;
          else if (a.reads > b.reads) return -1;
          else return 0;
        });
        res.status(200).send(uniquePosts);
        res.end();
      } else if (req.query.sortBy == "likes") {
        uniquePosts.sort((a, b) => {
          if (a.likes < b.likes) return 1;
          else if (a.likes > b.likes) return -1;
          else return 0;
        });
        res.status(200).send(uniquePosts);
        res.end();
      } else if (req.query.sortBy == "popularity") {
        uniquePosts.sort((a, b) => {
          if (a.popularity < b.popularity) return 1;
          else if (a.popularity > b.popularity) return -1;
          else return 0;
        });
        res.status(200).send(uniquePosts);
        res.end();
      } else {
        res.status(400).send({ error: "sortBy parameter is invalid" });
      }
    } else if (
      req.query.hasOwnProperty("direction") ||
      !req.query.hasOwnProperty("direction")
    ) {
      if (req.query.sortBy == "reads") {
        uniquePosts.sort((a, b) => {
          if (a.reads > b.reads) return 1;
          else if (a.reads < b.reads) return -1;
          else return 0;
        });
        res.status(200).send(uniquePosts);
        res.end();
      } else if (req.query.sortBy == "likes") {
        uniquePosts.sort((a, b) => {
          if (a.likes > b.likes) return 1;
          else if (a.likes < b.likes) return -1;
          else return 0;
        });
        res.status(200).send(uniquePosts);
        res.end();
      } else if (req.query.sortBy == "popularity") {
        uniquePosts.sort((a, b) => {
          if (a.popularity < b.popularity) return 1;
          else if (a.popularity > b.popularity) return -1;
          else return 0;
        });
        res.status(200).send(uniquePosts);
        res.end();
      } else {
        res.status(400).send({ error: "sortBy parameter is invalid" });
      }
    } else {
      res.status(400).send({ error: "direction parameter is invalid" });
    }
  }
  res.status(200).send(uniquePosts);
});

app.listen(port, () => {
  console.log(`Web server is running on: http://localhost:${port}`);
});
