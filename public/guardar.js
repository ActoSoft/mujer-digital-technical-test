function guardar() {
    const docRef = db.collection('users').doc('alovelace');

await docRef.set({
  customerName: 'Nadia Silva',
  items: [
    "Simple Hamburger",
    "Soda"
  ];
  total: 140,
  modality: "delivery"
});
}

{
