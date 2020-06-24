import path from "path"
import { GatsbyNode } from "gatsby"

interface Author {
  name: string
  slug: string
}

interface AuthorResult {
  site: {
    siteMetadata: {
      title: string
      authors: Author[]
    }
  }
}

export interface AuthorPageContext {
  author: Author
}

interface Post {
  node: {
    fields: {
      slug: string
    }
  }
}

interface PostsResult {
  allMarkdownRemark: {
    edges: Post[]
  }
}

export interface PostPageContext {
  slug: string
}

interface Blog {
  node: {
    excerpt: string
    html: string
    id: string
    frontmatter: {
      date: string
      path: string
      title: string
    }
  }
}

interface BlogResult {
  allMarkdownRemark: {
    edges: Blog[]
  }
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions: { createPage },
}) => {
  const result = await graphql<AuthorResult>(`
    query AuthorPage {
      site {
        siteMetadata {
          title
          authors {
            name
            slug
          }
        }
      }
    }
  `)
  if (result.errors || !result.data) {
    throw result.errors
  }
  const { siteMetadata } = result.data.site
  if (!siteMetadata || !siteMetadata.authors) {
    throw new Error("undefined authors")
  }

  for (let author of siteMetadata.authors) {
    if (author) {
      console.log(JSON.stringify(author))
      createPage<AuthorPageContext>({
        path: `/authors/${author.slug}/`,
        component: path.resolve("src/templates/author.tsx"),
        context: { author },
      })
    }
  }

  const postsResult = await graphql<PostsResult>(`
    query PostsPage {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  if (postsResult.errors || !postsResult.data) {
    throw postsResult.errors
  }
  const posts = postsResult.data.allMarkdownRemark.edges
  posts.map((post: Post) => {
    const slug = post.node.fields.slug
    console.log(slug)
    createPage<PostPageContext>({
      path: `/posts${slug}`,
      component: path.resolve("./src/templates/blogPost.tsx"),
      context: { slug },
    })
  })

  const blogsResult = await graphql<BlogResult>(`
    query BlogPage {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
            frontmatter {
              date
              path
              title
            }
          }
        }
      }
    }
  `)
  if (blogsResult.errors || !blogsResult.data) {
    throw blogsResult.errors
  }
  const blogs = blogsResult.data.allMarkdownRemark.edges
  blogs.map((blog: Blog) => {
    console.log(blog.node.frontmatter.path)
    createPage({
      path: blog.node.frontmatter.path,
      component: path.resolve("./src/templates/blogTemplate.tsx"),
      context: {},
    })
  })
}
