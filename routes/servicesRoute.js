const express = require("express");
const router = express.Router();

router.get("/:page", (req, res) => {
    // Get the page name
    let page = req.params.page;

    if (page === "minerals-mining") {
        res.render("services-mining", {
            page: page
        });
    } else if (page === "investors") {
        res.render("about-investors", {
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
    res.redirect("/minerals-mining")
});

module.exports = router;