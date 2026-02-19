const express = require('express');
const fs = require('fs');
const path = require('path');
const { body, validationResult } = require('express-validator');
const morgan = require('morgan');

const app = express();

/* ---------------------------------------
   Middleware
--------------------------------------- */
app.use(express.json()); // Parse JSON request body
app.use(morgan('combined')); // Log HTTP requests

/* ---------------------------------------
   POST /process-input
--------------------------------------- */
app.post(
  '/process-input',
  [
    body('name')
      .isString()
      .withMessage('Name must be a string'),

    body('age')
      .isInt({ min: 0 })
      .withMessage('Age must be a non-negative integer'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    // Validation Error Handling
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, age } = req.body;

    const userData = {
      name,
      age,
      timestamp: new Date().toISOString(),
    };

    const filePath = path.join(__dirname, 'user-data.json');

    // Write data to file
    fs.writeFile(filePath, JSON.stringify(userData, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return res.status(500).json({
          message: 'Internal Server Error',
        });
      }

      res.status(200).json({
        message: 'Data processed successfully',
        data: userData,
      });
    });
  }
);

/* ---------------------------------------
   General Error Handling Middleware
--------------------------------------- */
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    message: 'Something went wrong, please try again later',
  });
});

/* ---------------------------------------
   Start Server
--------------------------------------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
