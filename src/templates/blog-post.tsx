import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Content, { HTMLContent } from "../components/content"

interface BlogPostTemplateProps {
  content?: string | null
  contentComponent?: React.FC<any>
  description?: string | null
  title?: string | null
  date?: string | null
  helmet?: React.ReactNode | null
}

export const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({
  content,
  contentComponent,
  description,
  title,
  date,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ""}
      <h1>{title}</h1>
      <h2>{date}</h2>
      <h2>{description}</h2>
      <PostContent content={content} />
    </section>
  )
}

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
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
        title: string
        description: string
      }
      excerpt: string
    }
  }
}

const BlogPost: React.FC<Props> = ({ data }) => {
  const { frontmatter, html, excerpt } = data.markdownRemark
  return (
    <Layout>
      <BlogPostTemplate
        helmet={<SEO title={frontmatter.title} description={excerpt} />}
        title={frontmatter.title}
        date={frontmatter.date}
        description={frontmatter.description}
        contentComponent={HTMLContent}
        content={html}
      />
    </Layout>
  )
}

export default BlogPost
