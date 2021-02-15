const allowOnly = function(accessLevel, callback) {
    function checkUserRole(req, res) {
        // console.log(req.user)
        const { role } = req.user[0].dataValues;
         console.log(accessLevel)
        // console.log(role)
        console.log((accessLevel & role));
        if(!(accessLevel & role)) {
            res.status(403).json({ msg: 'You do not have access to this'})
            return;
        }

        callback(req, res)
    }

    return checkUserRole;
}

export { allowOnly }