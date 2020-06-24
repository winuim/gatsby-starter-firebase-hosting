/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
"use strict"
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "esnext",
  },
})

exports.onCreateNode = require("./src/gatsby-node/onCreateNode").onCreateNode
exports.createPages = require("./src/gatsby-node/createPages").createPages
