const express = require("express");
const router = express.Router();

router.get("/:page", (req, res) => {
    // Get the page name
    let page = req.params.page;

    if (page === "clients") {
        res.render("clients");
    } else if (page === "investors") {
        res.render("about-investors");
    } else if (page === "management-team") {
        res.render("about-team");
    } else if (page === "testimonal") {
        res.render("about-testimonal");
    } else {
        res.render("404");
    }

});

router.get("/", (req, res) => {
    res.render("about");
});

module.exports = router;