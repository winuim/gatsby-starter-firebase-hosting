import React from "react"
import { navigate } from "gatsby"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { TextField } from "formik-material-ui"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const encode = (data: any) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

interface States {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const initStates: States = {
    name: "",
    email: "",
    message: "",
  }
  const handleSubmit = (values: States, actions: FormikHelpers<States>) => {
    alert(JSON.stringify(values, null, 2))
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...values,
      }),
    })
      .then(() => navigate("/contact/thanks/"))
      .catch(error => alert(error))
  }

  return (
    <Layout>
      <SEO title="Contact" />
      <Typography variant="h4" component="h1" gutterBottom align="center">
        お問い合わせフォーム
      </Typography>
      <Formik initialValues={initStates} onSubmit={handleSubmit}>
        {formik => (
          <Form
            name="contact"
            method="post"
            action="/contact/thanks/"
            data-netlify={true}
            data-netlify-honeypot="bot-field"
            onSubmit={formik.handleSubmit}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  id="name"
                  name="name"
                  label="ご氏名"
                  variant="outlined"
                  required={true}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  id="email"
                  name="email"
                  type="email"
                  label="メールアドレス"
                  variant="outlined"
                  required={true}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  id="message"
                  name="message"
                  label="お問い合わせ内容"
                  variant="outlined"
                  required={true}
                  fullWidth={true}
                  multiline={true}
                  rows={4}
                />
              </Grid>
              <Grid container justify="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={formik.isSubmitting}
                >
                  {"送信する"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}
