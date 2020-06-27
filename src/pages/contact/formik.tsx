import * as React from "react"
import * as Yup from "yup"
import { Formik, Field } from "formik"
import { TextField } from "formik-material-ui"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import LinearProgress from "@material-ui/core/LinearProgress"
import MenuItem from "@material-ui/core/MenuItem"
import Typography from "@material-ui/core/Typography"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(1),
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  })
)

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

interface Props {
  handleSubmit: (v: States) => void
}

export interface States {
  fullname: string
  kananame: string
  organization: string
  tel: string
  email: string
  inquiryType: string
  inquiryText: string
}

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
    inquiryType: Yup.string().required("必須項目です"),
    inquiryText: Yup.string().required("必須項目です"),
  })

export default function FormikPage({ handleSubmit }: Props) {
  const classes = useStyles()
  const initValues: States = {
    fullname: "",
    kananame: "",
    organization: "",
    tel: "",
    email: "",
    inquiryType: "",
    inquiryText: "",
  }

  return (
    <Layout>
      <SEO title="Form" />
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              お問い合わせフォーム
            </Typography>
            <img
              className={classes.img}
              src="https://source.unsplash.com/random/400x200"
              alt=""
            />
          </Grid>
        </Grid>
        <br />
        <Formik
          initialValues={initValues}
          validationSchema={validation()}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false)
              handleSubmit(values)
              alert(JSON.stringify(values, null, 2))
            }, 500)
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <form
              name="formik"
              method="post"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              {/* You still need to add the hidden input with the form name to your JSX form */}
              <input type="hidden" name="form-name" value="formik" />
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    id="fullname"
                    name="fullname"
                    type="fullname"
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
                    type="kananame"
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
                    type="organization"
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
                    type="tel"
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
                    id="inquiry-type"
                    name="inquiryType"
                    type="inquiryType"
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
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    id="inquiry-text"
                    name="inquiryText"
                    type="inquiryText"
                    label="お問い合わせ内容"
                    variant="outlined"
                    required={true}
                    fullWidth={true}
                    multiline={true}
                    rows={4}
                  />
                </Grid>
                {isSubmitting && <LinearProgress />}
                <br />
                <Grid container justify="center">
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    type="submit"
                  >
                    {"送信する"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
      <br />
    </Layout>
  )
}
