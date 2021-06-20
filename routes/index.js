const express = require('express');
const submit_data = require("../controllers/request/submit_data");
const router = express.Router();


router.post('/submit', submit_data);


module.exports = router;
