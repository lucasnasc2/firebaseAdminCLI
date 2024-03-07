// customClaim.js
const prompt = require("prompt");

// Function to prompt user for custom claim and set it for a user
async function setCustomClaim(admin) {
  try {
    const schema = {
      properties: {
        email: {
          description: "Enter user email:",
          required: true,
          pattern: /^\S+@\S+\.\S+$/, // Basic email pattern validation
          message: "Please enter a valid email address",
        },
        admin: {
          description: "Set admin custom claim (true/false):",
          required: true,
          type: "boolean",
        },
      },
    };

    prompt.start();
    const { email, admin: isAdmin } = await prompt.get(schema);

    const userRecord = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(userRecord.uid, { admin: isAdmin });
    console.log(`Custom claim 'admin' set to ${isAdmin} for user with email: ${email}`);
  } catch (error) {
    console.error("Error setting custom claim:", error);
  }
}

module.exports = {
  setCustomClaim,
};
