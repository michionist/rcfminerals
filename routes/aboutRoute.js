const express = require("express");
const router = express.Router();

router.get("/:page", (req, res) => {
    // Get the page name
    let page = req.params.page;

    if (page === "investors") {
        res.render("about-investors", {
            page: page
        });
    } else if (page === "technical-partners") {
        res.render("about-partners", {
            page: page
        });
    } else if (page === "management-team") {
        res.render("about-team", {
            page: page
        });
    } else if (page === "testimonal") {
        res.render("about-testimonal", {
            page: page
        });
    } else {
        res.render("404");
    }

});

router.get("/", (req, res) => {
    res.render("about", {
        page: "About Page"
    });
});

module.exports = router;