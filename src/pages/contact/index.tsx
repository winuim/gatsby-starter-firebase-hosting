import React from "react"
import { navigate } from "gatsby"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { TextField } from "formik-material-ui"
import * as Yup from "yup"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import LinearProgress from "@material-ui/core/LinearProgress"
import MenuItem from "@material-ui/core/MenuItem"
import Typography from "@material-ui/core/Typography"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

interface Props {
  addHandle?: (valuse: State) => void
}

export interface State {
  fullname: string
  kananame: string
  organization: string
  tel: string
  email: string
  inquiry: string
  message: string
}

const encode = (data: any) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const menuInquiry = [
  {
    value: "選択1",
    label: "選択1",
  },
  {
    value: "選択2",
    label: "選択2",
  },
  {
    value: "選択3",
    label: "選択3",
  },
]

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validation = () =>
  Yup.object().shape({
    fullname: Yup.string().required("必須項目です"),
    kananame: Yup.string().required("必須項目です"),
    organization: Yup.string().required("必須項目です"),
    tel: Yup.string()
      .matches(phoneRegExp, "電話番号の形式に誤りがあります")
      .required("必須項目です"),
    email: Yup.string()
      .email("メールアドレスの形式で入力してください")
      .required("必須項目です"),
    inquiry: Yup.string().required("必須項目です"),
    message: Yup.string().required("必須項目です"),
  })

export default function Contact({ addHandle }: Props) {
  const initState: State = {
    fullname: "",
    kananame: "",
    organization: "",
    tel: "",
    email: "",
    inquiry: "",
    message: "",
  }
  const handleSubmit = (values: State, actions: FormikHelpers<State>) => {
    // alert(JSON.stringify(values, null, 2))
    if (addHandle) {
      addHandle(values)
    }
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
      .finally(() => actions.setSubmitting(false))
  }

  return (
    <Layout>
      <SEO title="Contact" />
      <Typography variant="h4" component="h1" gutterBottom align="center">
        お問い合わせフォーム
      </Typography>
      <Formik
        initialValues={initState}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >
        {formik => (
          <Form
            name="contact"
            method="post"
            action="/contact/thanks/"
            data-netlify={true}
            data-netlify-honeypot="bot-field"
            data-netlify-recaptcha={true}
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
                  id="fullname"
                  name="fullname"
                  label="ご氏名"
                  variant="outlined"
                  required={true}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  id="kananame"
                  name="kananame"
                  label="ご氏名【カナ】"
                  variant="outlined"
                  required={true}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  id="organization"
                  name="organization"
                  label="会社名"
                  variant="outlined"
                  required={true}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  id="tel"
                  name="tel"
                  label="電話番号"
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
                  id="inquiry"
                  name="inquiry"
                  label="お問い合わせ項目"
                  variant="outlined"
                  required={true}
                  fullWidth={true}
                  select={true}
                >
                  {menuInquiry.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
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
              {formik.isSubmitting && <LinearProgress />}
              <br />
              <Grid container justify="center">
                <div data-netlify-recaptcha="true"></div>
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
