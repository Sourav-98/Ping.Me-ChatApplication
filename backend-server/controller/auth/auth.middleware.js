
exports.userExistsMiddleware = async(req, res, next)=>{
    let userData = req.body;
    // fetch the user with the user id
    // if user exists, then return a userExists bit (true | false)
    // else, go to the next execution, next()
}

exports.delayAsync = async(msDelay)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(resolve, msDelay);
    })
}
