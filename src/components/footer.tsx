import React from "react"
import Typography from "@material-ui/core/Typography"

interface Props {
  copyright?: string
}

interface State {}

const Footer = ({ copyright = "" }: Props) => (
  <footer>
    <br />
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright ©"}
      {copyright}
      {new Date().getFullYear()}
      {". "}Built with{` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>{" "}
    </Typography>
  </footer>
)

export default Footer
