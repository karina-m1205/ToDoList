const path = require("path");
const express = require("express");
const { Item } = require(path.join(__dirname, "../core/postgresDb.js"));
const { validate } = require(path.join(__dirname, "../core/validation.js"));
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const foundItems = await Item.findAll();
        if (!foundItems) {
            return res.status(404).send("Items not found");
        }
        return res.status(200).send(foundItems);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (typeof id !== "string" || id.trim() === "") {
            return res.status(400).send("id is required and must be a string");
        }
        const foundItemById = await Item.findByPk(id);
        if (!foundItemById) {
            return res.status(404).send("Item not found");
        }
        return res.status(200).send(foundItemById);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, start, end } = req.body;
        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).send("title is required and must be a string");
        }

        try {
            validate(start);
            validate(end);
        } catch (err) {
            return res.status(400).send(err.message);
        }

        const foundItem = await Item.findOne({
            where: {
                title: title,
            }
        });
        if (foundItem) {
            return res.status(400).send("Item already exists");
        };
        const newItem = await Item.create({
            title: title,
            start: start,
            end: end,
        });
        return res.status(200).send(newItem);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (typeof id !== "string" || id.trim() === "") {
            return res.status(400).send("id is required and must be a string");
        }
        const { title, start, end } = req.body;

        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).send("title is required and must be a string");
        }

        try {
            validate(start);
            validate(end);
        } catch (err) {
            return res.status(400).send(err.message);
        }

        const foundItemById = await Item.findByPk(id);
        if (!foundItemById) {
            return res.status(404).send("Item not found");
        }
        foundItemById.title = title;
        foundItemById.start = start;
        foundItemById.end = end;
        const updatedItem = await foundItemById.save();
        return res.status(200).send(updatedItem);
    } catch (err) {
        return res.status(505).send(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (typeof id !== "string" || id.trim() === "") {
            return res.status(400).send("id is required and must be a string");
        }
        const deletedItem = await Item.destroy({ // returns deleted items count
            where: { id: parseInt(id) }
        })
        return res.status(200).send(`${deletedItem}`); 
    } catch (err) {
        return res.status(505).send(err);
    }
});

module.exports.todoList = router;