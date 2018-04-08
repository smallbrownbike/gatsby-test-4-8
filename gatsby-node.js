const path = require('path')

// Create pages from Contentful API

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve(`src/templates/post.js`)
    // Query for markdown nodes to use in creating pages
    resolve(
      graphql(
        `
          {
            allContentfulPost {
              edges {
                node {
                  id
                  title
                  slug
                  content {
                    content
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        console.log(result)
        if (result.errors) {
          reject(result.errors)
        } else {
          // Create posts
          result.data.allContentfulPost.edges.forEach(edge => {
            createPage({
              path: `${edge.node.slug}`,
              component: postTemplate,
              context: edge.node,
            })
          })
        }

        return
      })
    )
  })
}
