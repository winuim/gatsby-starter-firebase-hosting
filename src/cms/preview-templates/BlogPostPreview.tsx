import { BlogPostTemplate } from "../../templates/blog-post"
import React from "react"

const BlogPostPreview = ({ entry, widgetFor }: PreviewProps) => (
  <BlogPostTemplate
    content={widgetFor("body")}
    description={entry.getIn(["data", "description"])}
    title={entry.getIn(["data", "title"])}
  />
)

export default BlogPostPreview
