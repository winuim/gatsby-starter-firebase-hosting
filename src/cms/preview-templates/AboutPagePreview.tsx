import { AboutPageTemplate } from "../../templates/about-page"
import React from "react"

const AboutPagePreview = ({ entry, widgetFor }: PreviewProps) => (
  <AboutPageTemplate
    title={entry.getIn(["data", "title"])}
    content={widgetFor("body")}
  />
)

export default AboutPagePreview
