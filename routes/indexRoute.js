const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("homepage", {
        page: "Solid Mineral, Gold, Copper, Zinc, lead"
    });
});

router.get("/metal-prices", (req, res) => {
    res.render("metal-prices", {
        page: "Base Metal Prices"
    });
});


router.get("/contact-us", (req, res) => {
    res.render("contact-page", {
        page: "Contact Us | Info | Inquiry"
    });
});



module.exports = router;