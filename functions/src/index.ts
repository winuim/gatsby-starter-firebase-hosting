import * as admin from "firebase-admin"
import * as functions from "firebase-functions"
import * as corsLib from "cors"
import * as sgMail from "@sendgrid/mail"

const cors = corsLib()

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://develop-7b39d.firebaseio.com",
})

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    response.json({
      data: {
        text: "Hello from Firebase!",
      },
    })
  })
})

export const echo = functions.https.onCall(async (data, context) => {
  console.log(data)
  const uid = !!context.auth ? context.auth.uid : ""
  console.info(`uid=${uid}`)
  return data
})

export const saveInquiry = functions.https.onCall(async (data, context) => {
  const today = new Date()
  data["createdAt"] = today.toISOString()
  data["createdBy"] = context.rawRequest.ip ?? ""
  data["updatedAt"] = today.toISOString()
  data["updatedBy"] = context.rawRequest.ip ?? ""
  //write
  await admin
    .firestore()
    .collection("Inquiry")
    .add(data)
    .then(result => {
      console.log(`Success, id=${result.id}, path=${result.path}`)
    })
    .catch(err => {
      console.log("Error, data save.")
      console.log(err)
    })

  //read
  const snapshots = await admin.firestore().collection("Inquiry").get()
  const docs = snapshots.docs.map(doc => doc.data())
  return docs.length
})

sgMail.setApiKey(functions.config().sendgrid.apikey)
export const sendMail = functions.https.onCall(async (data, context) => {
  const msg = {
    to: functions.config().sendgrid.to,
    from: functions.config().sendgrid.from,
    templateId: functions.config().sendgrid.templateid,
    dynamic_template_data: data,
  }
  await sgMail
    .send(msg)
    .then(result => {
      console.log(result[0].statusCode)
      console.log(result[0].headers)
      console.log(result[0].body)
      return result[0].statusCode
    })
    .catch(error => {
      console.error(error)
      if (error.response) {
        console.error(error.response.body)
      }
      return error
    })
})
