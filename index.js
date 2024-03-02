import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var blogs = [];
function createBlog(req, res, next)
{
    var newBlog = 
    {
        title: req.body["postTitle"],
        desc: req.body["postBody"]
    }
    blogs.push(newBlog);
    next();
}

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/home", (req, res) => {
    res.render("home.ejs");
});

app.get("/createview", (req, res) => {
    res.render("createview.ejs");
});

app.post("/create", createBlog, function(req, res){
    res.render("createview.ejs", {result: blogs});
});

app.get("/post/:title", (req, res) => {
    const pTitle = req.params.title;
    for (var i=0; i<blogs.length; i++)
    {
        var postTitle = blogs[i].title;
        var postDesc = blogs[i].desc;
        if (pTitle === postTitle)
        {
            res.render("post.ejs", {pTitle: postTitle, pBody: postDesc}); 
        }
    }  
});

app.get("/delete/:title", (req, res) => {
    const pTitle = req.params.title;
    for (var i=0; i<blogs.length; i++)
    {
        var postTitle = blogs[i].title;
        var index = blogs.indexOf(blogs[i]);
        if (pTitle === postTitle)
        {
            blogs.splice(index,1);
        }
    }
    res.render("createview.ejs", {result: blogs});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});