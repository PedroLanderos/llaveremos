const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp"); // Importar Sharp para manipular imágenes

const app = express();
const PORT = 50005; // Puerto donde correrá el servidor

// Configuración de Multer para guardar temporalmente los archivos en `uploads`
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../llaveremosfront/public/uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Crear la carpeta si no existe
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`); // Guardar con nombre único temporal
  },
});

const upload = multer({ storage });

// Ruta que incluye productId como parámetro
app.post("/upload/:productId", upload.single("image"), async (req, res) => {
  console.log("Iniciando procesamiento de imagen...");

  if (!req.file) {
    console.error("No se subió ninguna imagen.");
    return res.status(400).json({ message: "No se subió ninguna imagen." });
  }

  console.log("Archivo subido:", req.file);

  const productId = req.params.productId;
  console.log("Product ID recibido:", productId);

  const outputFilePath = path.join(
    __dirname,
    "../llaveremosfront/public/uploads",
    `product_${productId}.png`
  );
  console.log("Ruta de salida:", outputFilePath);

  try {
    // Verificar formato de archivo soportado antes de procesar
    const mimeType = req.file.mimetype;
    if (!["image/jpeg", "image/png", "image/webp"].includes(mimeType)) {
      fs.unlinkSync(req.file.path); // Eliminar archivo temporal
      console.error("Formato de imagen no soportado:", mimeType);
      return res.status(400).json({ message: "Formato de imagen no soportado." });
    }

    // Convertir la imagen a PNG utilizando Sharp
    await sharp(req.file.path)
      .png({ quality: 80 }) // Convertir a PNG con calidad del 80%
      .toFile(outputFilePath);

    console.log("Imagen procesada correctamente:", outputFilePath);

    // Mover la eliminación del archivo temporal aquí, con manejo de errores
    setTimeout(() => {
      try {
        fs.unlinkSync(req.file.path);
        console.log("Archivo temporal eliminado:", req.file.path);
      } catch (unlinkErr) {
        console.error("Error al eliminar el archivo temporal:", unlinkErr.message);
      }
    }, 100); // Retraso para garantizar que el archivo no esté bloqueado

    res.json({ filePath: `/uploads/product_${productId}.png` });
  } catch (error) {
    console.error("Error al procesar la imagen:", error.message);
    res.status(500).json({ message: "Error al procesar la imagen." });
  }
});

// Servir los archivos subidos desde la carpeta `public/uploads`
app.use("/uploads", express.static(path.join(__dirname, "../llaveremosfront/public/uploads")));

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
