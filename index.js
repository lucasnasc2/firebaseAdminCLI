// index.js
const prompt = require("prompt");
const admin = require("firebase-admin");
const { setCustomClaim } = require("./customClaims");
const { createUser } = require("./createUser");
const { deleteUser } = require("./deleteUser");

// Initialize Firebase Admin SDK with your credentials
const serviceAccount = require("./firebaseCredentials.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const schema = {
  properties: {
    action: {
      description: "Select an option:",
      required: true,
      enum: ["Set custom claim", "Create new user", "Delete user"],
    },
  },
};

prompt.start();

prompt.get(schema, async (err, result) => {
  if (err) {
    console.error("Prompt error:", err);
    return;
  }

  const { action } = result;

  switch (action) {
    case "Set custom claim":
      await setCustomClaim(admin);
      break;
    case "Create new user":
      await createUser(admin); // Pass admin object to createUser function
      break;
    case "Delete user":
      await deleteUser(admin); // Pass admin object to deleteUser function
      break;
    // Add cases for other actions (create new user, delete user) here
    default:
      console.error("Invalid action selected");
  }
});
