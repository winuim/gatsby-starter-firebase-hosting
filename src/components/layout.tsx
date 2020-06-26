/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "../styles/layout.css"
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
    <>
      <Header siteTitle={data.site?.siteMetadata?.title ?? ""} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          ©{data.site?.siteMetadata?.copyright}
          {new Date().getFullYear()}, Built with{` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
