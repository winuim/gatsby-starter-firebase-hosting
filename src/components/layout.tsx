/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"

import Header from "./header"
import Footer from "./footer"
import { SiteTitleIndexQuery } from "types/graphql-types"

interface Props {
  children: React.ReactNode
}

interface State {}

const Layout = ({ children }: Props) => {
  const data = useStaticQuery<SiteTitleIndexQuery>(graphql`
    query SiteTitleIndex {
      site {
        siteMetadata {
          title
          copyright
        }
      }
    }
  `)

  return (
    <React.Fragment>
      <CssBaseline />
      <Header siteTitle={data.site?.siteMetadata?.title ?? ""} />
      <Container>
        <main>{children}</main>
      </Container>
      <Footer copyright={data.site?.siteMetadata?.copyright ?? ""} />
    </React.Fragment>
  )
}

export default Layout
