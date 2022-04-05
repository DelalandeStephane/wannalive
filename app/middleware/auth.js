const jwt = require('jsonwebtoken');

module.exports = (req,res, next) => {

    try{
        let userId;
        if(req.params.verifyId){
            userId = req.params.verifyId;
        }

        if(req.body.userIdForAuth){
            userId = req.body.userIdForAuth;
        }
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // replace token key for prod !!!
        const userIdToken = decodedToken.userId;
        const userStatus = decodedToken.userStatus;
        if((userId && userId !== userIdToken) && (userStatus && userStatus !== 'admin')) {
            throw 'User ID non valable !'
        }
        else {
            next();
        }
    } catch(error) {
        res.status(401).json({error : error | 'requête non authentifiée'})
    }
}