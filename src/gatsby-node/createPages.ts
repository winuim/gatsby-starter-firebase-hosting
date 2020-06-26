import path from "path"
import { GatsbyNode } from "gatsby"

interface ResultEdge {
  node: {
    id: string
    fields: {
      slug: string
    }
    frontmatter: {
      templateKey: string
    }
  }
}

interface QueryResult {
  allMarkdownRemark: {
    edges: ResultEdge[]
  }
}

export interface PageContext {
  id: string
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions: { createPage },
}) => {
  const result = await graphql<QueryResult>(`
    query MarkdownPages {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `)
  if (result.errors || !result.data) {
    throw result.errors
  }
  const edges = result.data.allMarkdownRemark.edges
  edges.map((edge: ResultEdge) => {
    const postId = edge.node.id
    const slug = edge.node.fields.slug
    const templateKey = edge.node.frontmatter.templateKey
    console.log(
      `createPages id=${postId}, slug=${slug}, templateKey=${templateKey}`
    )
    createPage<PageContext>({
      path: slug,
      component: path.resolve(`src/templates/${templateKey}.tsx`),
      context: { id: postId },
    })
  })
}
