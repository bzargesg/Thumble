const router = require("express").Router();

router.post("/login", (req, res) => {
    console.log(`login: `);
    console.table(req.body);
    res.status(200);
    res.json({
        key: "12345abcdef",
        scopes: ["calendar.use", "calendar.modify"]
    });
});

// router.get("/", (req, res) => {});

module.exports = router;
