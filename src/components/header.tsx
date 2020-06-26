import React from "react"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  })
)

interface Props {
  siteTitle?: string
}

interface State {}

const Header = ({ siteTitle = "" }: Props) => {
  const classes = useStyles()

  return (
    <header>
      <Typography className={classes.root} variant="h3" align="center">
        <Link href="/">{siteTitle}</Link>
      </Typography>
    </header>
  )
}

export default Header
