const express = require("express")
const app = express()
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override")

app.use(express.urlencoded({extended: true}));
app.use(methodOverride ("_method"))

app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

//Posts data created manually as Array of object
let posts = [
    {
        id: uuidv4(),
        username : "apnacollege",
        content : "Love coding"
    },
    {
         id: uuidv4(),
        username : "rahulkumar",
        content : "Got internship"
    },
    {
         id: uuidv4(),
        username : "Shradha Khapra",
        content : "Instructor"
    },
    {
         id: uuidv4(),
        username : "apnacollege",
        content : "Teaching excellence"
    },
    {
         id: uuidv4(),
        username : "Dilshan",
        content : "Pallu Skoop"
    },
    {
         id: uuidv4(),
        username : "Dheeraj",
        content : "slow coding"
    }
];

//Home Page
app.get("/",(req,res) => {
    res.send("Home working")
})

//To get All the Post (Index) and pass the posts variable to index.ejs
app.get("/posts",(req,res) => {
    res.render("index.ejs", { posts });
})

//For Creating new Posts & then sending that data through the "Form tag action="/posts" to the below app.post"
app.get("/posts/new", (req,res) => {
    res.render("new.ejs")
})

//After Creating New Posts for sending that new post data to the main POST Page => (to get All main{Index})
app.post("/posts", (req, res) => {
    let{ username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content })
    res.redirect("/posts")
})


//For getting post by id  & Sending that variable {post} selected by the particular id to the view => (show.ejs) & and passing {post} to (show.ejs ) view.
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id)
    res.render("show.ejs", { post })

 })

 //To Edit the post using id & for edit PATCH is used HTML FORM support only get & post so (method-override )is used with {?_method=PATCH with method post}=> in the view of Form tag
 app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id)
    post.content = newContent;
    console.log(post);
    res.redirect("/posts")
 })

 //used for edit only the content of the posts
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id)
    res.render("edit.ejs", { post })
})

//to delete the post
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id)
    res.redirect("/posts")
});

 //Listens to the 8080 port
app.listen(port, () => {
    console.log("Listening to port", port);
})