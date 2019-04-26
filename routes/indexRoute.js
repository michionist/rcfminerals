const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("homepage", {
        page: "Solid Mineral, Gold, Copper, Zinc, lead"
    });
});




module.exports = router;