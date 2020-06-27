import React from "react"
import { navigate } from "gatsby"
import { Form, Formik, FormikHelpers } from "formik"

import Layout from "../../components/layout"

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
      <h1>Contact</h1>
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
            <p>
              <label>
                Your name:
                <br />
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </label>
            </p>
            <p>
              <label>
                Your email:
                <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </label>
            </p>
            <p>
              <label>
                Message:
                <br />
                <textarea
                  id="message"
                  name="message"
                  onChange={formik.handleChange}
                  value={formik.values.message}
                />
              </label>
            </p>
            <p>
              <button type="submit">Send</button>
            </p>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}
