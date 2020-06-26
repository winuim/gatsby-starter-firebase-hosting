import * as React from "react"
import firebase from "gatsby-plugin-firebase"

import FormikPage, { States } from "./formik"

export default function FirebaseFormik() {
  const hadleSubmit = (values: States) => {
    console.log("FirebaseFormik hadleSubmit, " + JSON.stringify(values))
    const functions = firebase.functions()
    // if (process.env.NODE_ENV != "productions") {
    //   functions.useFunctionsEmulator("http://localhost:5001")
    // }
    let saveInquiry = functions.httpsCallable("saveInquiry")
    saveInquiry(values).then(result => {
      console.log(result)
    })
    let sendMail = functions.httpsCallable("sendMail")
    sendMail(values).then(result => {
      console.log(result)
    })
  }

  return <FormikPage handleSubmit={hadleSubmit} />
}
