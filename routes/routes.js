const express = require("express");
const controllers = require("../controllers/controllers");
const router = express.Router();
router.route("/api/blog-stats").get(controllers.getBlogsController);

// **Blog Search Endpoint**:
router.route("/api/blog-search").post(controllers.searchBlogController);

module.exports = router;
