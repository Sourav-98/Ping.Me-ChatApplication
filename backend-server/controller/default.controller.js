
const defaultController = require('express').Router();

defaultController.get('/', async(req, res)=>{
    let defaultData = {
        message: "Default Route"
    };
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(defaultData);
});

defaultController.get('**', async(req, res)=>{
    res.status(404).send('Page Not Found');
})

module.exports = { defaultController };
