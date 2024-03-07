// deleteUser.js
const prompt = require("prompt");

// Function to prompt user for email and delete the user
async function deleteUser(admin) {
  try {
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
    const { email } = await prompt.get(schema);

    const userRecord = await admin.auth().getUserByEmail(email);
    await admin.auth().deleteUser(userRecord.uid);

    console.log(`User with email ${email} deleted successfully`);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

module.exports = {
  deleteUser,
};
