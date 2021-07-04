
exports.getHome = function(req, res, err){
    defaultData = {
        message: "Welcome to Home Controller"
    }
    res.status(200).send(JSON.stringify(defaultData));
}
