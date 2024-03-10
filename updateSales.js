async function updateSales(admin) {
  const firestore = admin.firestore();
  try {
    // Fetch all sales documents
    const salesSnapshot = await firestore.collection('sales').get();

    // Iterate over each sale document
    salesSnapshot.forEach(async (saleDoc) => {
      const saleData = saleDoc.data();

      // Iterate over each item in the sale's items array
      for (let i = 0; i < saleData.items.length; i++) {
        const item = saleData.items[i];

        // Fetch product document based on item ID
        const productDoc = await firestore.collection('products').doc(item.id).get();
        if (productDoc.exists) {
          const productName = productDoc.data().name;
          // Add product name to the item object
          item.name = productName;
        } else {
          console.error(`Product with ID ${item.id} does not exist.`);
        }
      }

      // Update the sale document with updated item objects
      await saleDoc.ref.update({ items: saleData.items });
    });

    console.log('Sales updated successfully with product names.');
  } catch (error) {
    console.error('Error updating sales with product names:', error);
  }
}

module.exports = {
  updateSales,
};
