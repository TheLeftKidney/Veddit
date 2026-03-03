import express from "express";

import db from "../db/connection.js";

import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.getCollection("posts");
    let posts = await collection.find().toArray();
    res.send(posts);
});

router.get("/:postId", async (req, res) => {
    let collection = await db.getCollection("posts");
    let post = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!post) {
        res.send("Post not found").status(404);
    } else {
        res.send(post);
    }
});

router.post("/", async (req, res) => {
    try {
        let newDoc = {
            author: req.body.author,
            title: req.body.title,
            content: req.body.content
        }
        let collection = await db.getCollection("posts");
        let result = await collection.insertOne(newDoc);
        res.send(result).status(204);
    } catch (error) {
        res.status(500).send("Error inserting post");
    }
});

export default router;