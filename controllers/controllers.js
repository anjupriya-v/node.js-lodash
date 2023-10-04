const services = require("../services/services");
var getBlogsController = async (req, res) => {
  var result = null;
  try {
    result = await services.getBlogsService();
    if (result.status) {
      res.send({
        status: true,
        message: result.msg,
        blogAnalytics: result.blogAnalytics,
        blogDetails: result.blogDetails,
      });
    } else {
      res.send({ status: false, message: result.msg });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.msg });
  }
};
var searchBlogController = async (req, res) => {
  var result = null;
  try {
    result = await services.searchBlogService(req.query);
    if (result.status) {
      res.send({
        status: true,
        message: result.msg,
        filteredBlogs: result.filteredBlogs,
      });
    } else {
      res.send({ status: false, message: result.msg });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.msg });
  }
};
module.exports = {
  getBlogsController,
  searchBlogController,
};
