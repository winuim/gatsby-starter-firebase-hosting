import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const pageQuery = graphql`
  query BlogPost($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
      excerpt(pruneLength: 250)
    }
  }
`

interface Props {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        date: string
        path: string
        title: string
      }
      excerpt: string
    }
  }
}

const BlogPost: React.FC<Props> = ({ data }) => {
  const { frontmatter, html, excerpt } = data.markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} description={excerpt} />
      <h1>{frontmatter.title}</h1>
      <h2>{frontmatter.date}</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export default BlogPost
