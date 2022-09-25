const { application } = require('express');

require('dotenv').config();
const { PORT = 4000, DATABASSE_URL } = process.env;

application.listen(PORT, () => console.log(`Express is listening on PORT: ${PORT}`));