const express = require("express");
const router = express.Router();

router.get("/:page", (req, res) => {
    // Get the page name
    let page = req.params.page;

    if (page === "operations") {
        res.render("sustainability-operations", {
            page: page
        });
    } else if (page === "production") {
        res.render("sustainability-production", {
            page: page
        });
    } else if (page === "health-safety") {
        res.render("sustainability-health", {
            page: page
        });
    } else if (page === "risk-management") {
        res.render("sustainability-risk", {
            page: page
        });
    } else {
        res.render("404");
    }

});

router.get("/", (req, res) => {
    res.redirect("/operations")
});

module.exports = router;