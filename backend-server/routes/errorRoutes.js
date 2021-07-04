const express = require('express');
const router = express.Router();

router.use('**', (req, res)=>{
    // error 404 - route not found
});

module.exports = router;
