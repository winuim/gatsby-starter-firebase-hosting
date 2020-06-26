import React from "react"
import { graphql } from "gatsby"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

import Content, { HTMLContent } from "../components/content"
import Layout from "../components/layout"
import { MarkdownRemark } from "types/graphql-types"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  })
)

interface AboutPageTemplateProps {
  title?: string | null
  content?: string | null
  contentComponent?: React.FC<any>
}

export const AboutPageTemplate: React.FC<AboutPageTemplateProps> = ({
  title,
  content,
  contentComponent,
}) => {
  const classes = useStyles()
  const PageContent = contentComponent || Content

  return (
    <>
      <Typography className={classes.root} variant="h3">
        {title}
      </Typography>
      <PageContent className="content" content={content} />
    </>
  )
}

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`

interface AboutPageProps {
  data: {
    markdownRemark: MarkdownRemark
  }
}

const AboutPage: React.FC<AboutPageProps> = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter?.title}
        content={post.html}
      />
    </Layout>
  )
}

export default AboutPage
