const { verifyToken } = require("../utilts/jwtHelper");


const verifyTokenHandler = async (req, res, next) => {
    var token = req.header('authorization');
    if (token && token.includes('Bearer')) {
        try {
            const result = await verifyToken(token);
            const userId = result.userId;
            req.userId = userId;
            return next()
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' })
        }

    } else {
        res.status(401).json({ message: 'No token provided' })
    }
}


module.exports = {
    verifyTokenHandler,
}