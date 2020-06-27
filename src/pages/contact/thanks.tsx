import React from "react"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"

import Layout from "../../components/layout"

export default function Thanks() {
  return (
    <Layout>
      <Typography>
        お問い合わせありがとうございます。
        <br />
        担当者より返信させて頂きますので、暫くお待ちください。
      </Typography>
      <Link href="/contact/">戻る</Link>
    </Layout>
  )
}
