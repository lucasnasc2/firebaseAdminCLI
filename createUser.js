// createUser.js
const prompt = require("prompt");

// Function to prompt user for email and password, and create a new user
async function createUser(admin) {
  try {
    const schema = {
      properties: {
        email: {
          description: "Enter user email:",
          required: true,
          pattern: /^\S+@\S+\.\S+$/, // Basic email pattern validation
          message: "Please enter a valid email address",
        },
        password: {
          description: "Enter user password:",
          required: true,
          hidden: true, // Hide user input for password
          replace: "*", // Replace user input for password with asterisks
        },
      },
    };

    prompt.start();
    const { email, password } = await prompt.get(schema);

    await admin.auth().createUser({
      email,
      password,
    });

    console.log(`User with email ${email} created successfully`);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

module.exports = {
  createUser,
};
