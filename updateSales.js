async function updateSales(admin) {
  const userEmail = 'lucas.nasc2.ln@gmail.com'; // Hardcoded email

  const firestore = admin.firestore();
  try {
    // Fetch all products documents
    const productsSnapshot = await firestore.collection('products').get();

    // Iterate over each product document
    productsSnapshot.forEach(async (productDoc) => {
      const productData = productDoc.data();
      
      // Add or update keys in the product object
      const timestamp = admin.firestore.FieldValue.serverTimestamp();
      
      productData.createdTimestamp = timestamp;
      productData.modifiedTimestamp = timestamp;
      productData.modifiedBy = userEmail; // Hardcoded email
      
      // Update the product document with new keys
      await productDoc.ref.set(productData, { merge: true });
    });

    console.log('Products updated successfully with new keys.');
  } catch (error) {
    console.error('Error updating products with new keys:', error);
  }
}

module.exports = {
  updateSales,
};
