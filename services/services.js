const request = require("request");
const lodash = require("lodash");
var options = {
  method: "GET",
  url: "https://intent-kit-16.hasura.app/api/rest/blogs",
  headers: {
    "x-hasura-admin-secret":
      "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
  },
};
module.exports.getBlogsService = () => {
  return new Promise(function service(resolve, reject) {
    try {
      request(options, function (error, response, body) {
        if (error) {
          reject({
            status: false,
            msg: error,
          });
        } else {
          var blogs = JSON.parse(response.body).blogs;
          //- Total number of blogs.

          var totalBlogs = lodash.memoize((blogs) => {
            return lodash.size(blogs);
          });

          //- The title of the longest blog.

          var longestTitleBlog = lodash.memoize((blogs) => {
            return lodash.maxBy(blogs, function (blog) {
              return blog.title.length;
            });
          });

          //- Number of blogs with "privacy" in the title.
          var search = "privacy";
          var titleWithPrivacyArr = [];
          var titleWithPrivacy = lodash.memoize((blogs) => {
            blogs.map((blog) => {
              if (
                lodash.includes(blog.title.toLowerCase(), search.toLowerCase())
              ) {
                titleWithPrivacyArr.push(blog);
              }
            });
            return titleWithPrivacyArr;
          });

          //- An array of unique blog titles.
          var uniqueBlogs = lodash.memoize((blogs) => {
            return lodash.uniqBy(blogs, function (blog) {
              return blog.title;
            });
          });

          //blog Analytics
          var blogAnalytics = [
            {
              totalBlogs: totalBlogs(blogs),
              longestTitleBlog: longestTitleBlog(blogs),
              titleWithPrivacy: titleWithPrivacy(blogs),
              uniqueBlogs: uniqueBlogs(blogs),
            },
          ];
          resolve({
            status: true,
            msg: "Blogs fetched successfully!",
            blogAnalytics: blogAnalytics,
            blogDetails: blogs,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports.searchBlogService = (searchQuery) => {
  var query = searchQuery.query;
  return new Promise(function service(resolve, reject) {
    try {
      request(options, function (error, response, body) {
        if (error) {
          reject({
            status: false,
            msg: error,
          });
        } else {
          var blogs = JSON.parse(response.body).blogs;

          var filteredBlogsArr = [],
            msg = "";
          var filteredBlogs = lodash.memoize((blogs) => {
            blogs.map((blog) => {
              if (
                lodash.includes(blog.title.toLowerCase(), query.toLowerCase())
              ) {
                filteredBlogsArr.push(blog);
              }
            });
            return filteredBlogsArr;
          });

          if (filteredBlogsArr.length == 0) {
            msg = "No search data found";
          } else {
            msg = "Search data found";
          }
          resolve({
            status: true,
            msg: msg,
            filteredBlogs: filteredBlogs(blogs),
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
};
