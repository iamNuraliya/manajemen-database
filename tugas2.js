
// 1. Create Database and Collection
use TokoOnline;
db.createCollection("produk");

// 2. Insert Documents (Create)
db.produk.insertMany([
  { nama: "Kaos Polos", kategori: "Fashion", harga: 100000, stok: 25 },
  { nama: "Jaket", kategori: "Fashion", harga: 150000, stok: 10 },
  { nama: "Topi", kategori: "Aksesoris", harga: 20000, stok: 40 },
  { nama: "Celana", kategori: "Fashion", harga: 120000, stok: 12 }
]);

// 3. Read Documents
db.produk.find(); // Tampilkan semua data

// 4. Update Document
db.produk.updateOne(
  { nama: "Kaos Polos" },
  { $set: { harga: 120000 } }
);

// 5. Delete Document
db.produk.deleteOne({ nama: "Topi" });

// 6. Comparison Query (harga > 100000)
db.produk.find({ harga: { $gt: 100000 } });

// 7. Logical Query (Fashion dan harga < 150000)
db.produk.find({
  $and: [
    { kategori: "Fashion" },
    { harga: { $lt: 150000 } }
  ]
});

// 8. Bulk Write (Insert banyak sekaligus)
db.produk.insertMany([
  { nama: "Syal", kategori: "Fashion", harga: 30000, stok: 15 },
  { nama: "Bros", kategori: "Aksesoris", harga: 15000, stok: 50 }
]);

// 9. Aggregation: Total harga semua produk Fashion
db.produk.aggregate([
  { $match: { kategori: "Fashion" } },
  { $group: { _id: null, totalHarga: { $sum: "$harga" } } }
]);

// 10. Schema Validation (hanya bisa dilakukan saat membuat koleksi)
db.createCollection("produk_validated", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nama", "harga", "kategori", "stok"],
      properties: {
        nama: {
          bsonType: "string",
          description: "nama harus berupa string"
        },
        harga: {
          bsonType: "int",
          minimum: 1000,
          description: "harga minimal 1000 dan harus integer"
        },
        kategori: {
          bsonType: "string",
          description: "kategori harus berupa string"
        },
        stok: {
          bsonType: "int",
          minimum: 0,
          description: "stok tidak boleh negatif"
        }
      }
    }
  }
});
