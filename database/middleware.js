const authRole = (permissions) => {
    return(req, res, next) => {
        const userRole = req.body.role;
        if (permissions.includes(userRole)){
            next()
        } else {
            return res.send("You have no permission.");
        }
    }
}


module.exports = {authRole};