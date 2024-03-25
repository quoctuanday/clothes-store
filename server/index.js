const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;

app.use(cors());

app.get('/home', (req, res) => {
    res.json({ message: 'Welcome' });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
