const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const dataFilePath = path.join(__dirname, 'data.json');

app.use(express.json());

app.get('/api/products', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    try {
      const products = JSON.parse(data);
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

app.post('/api/products', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    try {
      const products = JSON.parse(data);
      const newProduct = req.body;
      newProduct.id = Date.now().toString(); // Assign a unique ID
      products.push(newProduct);
      const updatedData = JSON.stringify(products, null, 2);
      fs.writeFile(dataFilePath, updatedData, 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json(newProduct);
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
