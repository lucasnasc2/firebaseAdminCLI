const admin = require("firebase-admin");
const prompt = require("prompt");
const serviceAccount = require("./firebaseCredentials.json");

// Initialize Firebase Admin SDK with your credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const schema = {
  properties: {
    email: {
      description: "Enter user email:",
      required: true,
      pattern: /^\S+@\S+\.\S+$/, // Basic email pattern validation
      message: "Please enter a valid email address",
    },
  },
};

prompt.start();

prompt.get(schema, (err, result) => {
  if (err) {
    console.error("Prompt error:", err);
    return;
  }

  const userEmail = result.email;
  admin
    .auth()
    .getUserByEmail(userEmail)
    .then((userRecord) => {
      return admin.auth().setCustomUserClaims(userRecord.uid, {
        admin: true,
      });
    })
    .then(() => {
      console.log(`Custom claim 'admin' set for user with email: ${userEmail}`);
    })
    .catch((error) => {
      console.error("Error setting custom claim:", error);
    });
});
