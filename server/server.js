const express = require("express");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp"); // Importar Sharp para manipular imágenes

const app = express();
const PORT = 50005; // Puerto donde correrá el servidor

// Configuración de Multer para guardar temporalmente los archivos en `uploads`
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../llaveremosfront/public/uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`); // Guardar con nombre único temporal
  },
});

const upload = multer({ storage });

// Ruta que incluye productId como parámetro
app.post("/upload/:productId", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No se subió ninguna imagen." });
  }

  const productId = req.params.productId; // Obtener productId de los parámetros de la URL
  const outputFilePath = path.join(
    __dirname,
    "../llaveremosfront/public/uploads",
    `product_${productId}.png` // Convertir siempre a PNG
  );

  try {
    // Convertir la imagen a PNG utilizando Sharp
    await sharp(req.file.path)
      .png({ quality: 80 }) // Convertir a PNG con calidad del 80%
      .toFile(outputFilePath);

    // Eliminar el archivo original temporal
    require("fs").unlinkSync(req.file.path);

    res.json({ filePath: `/uploads/product_${productId}.png` });
  } catch (error) {
    console.error("Error al procesar la imagen:", error);
    res.status(500).json({ message: "Error al procesar la imagen." });
  }
});

// Servir los archivos subidos desde la carpeta `public/uploads`
app.use("/uploads", express.static(path.join(__dirname, "../llaveremosfront/public/uploads")));

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
