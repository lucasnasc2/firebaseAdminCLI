async function updateSales(admin) {
  const firestore = admin.firestore();
  try {
    const transaction = await firestore.runTransaction(async (t) => {
    // Fetch all sales documents
    const salesSnapshot = await t.get(firestore.collection('sales'));

    // Array to store batched updates
    const batchedUpdates = [];

    // Iterate over each sale document
    salesSnapshot.forEach((saleDoc) => {
      const saleData = saleDoc.data();

      // Iterate over each item in the sale's items array
      for (let i = 0; i < saleData.items.length; i++) {
        const item = saleData.items[i];

        // Fetch product document based on item ID
        const productRef = firestore.collection('products').doc(item.id);
        const productDoc = t.get(productRef);
        if (!productDoc.exists) {
          console.error(`Product with ID ${item.id} does not exist.`);
          continue;
        }

        const productName = productDoc.data().name;

        // Update the item object with product name
        item.name = productName;
      }

      // Prepare batched update for the sale document
      batchedUpdates.push(t.update(saleDoc.ref, { items: saleData.items }));
    });

    // Commit batched updates
    await Promise.all(batchedUpdates);
  });

  console.log('Sales updated successfully with product names.');
  } catch(error) {
    console.error('Error updating sales with product names:', error);
  }
}

module.exports = {
  updateSales,
};
