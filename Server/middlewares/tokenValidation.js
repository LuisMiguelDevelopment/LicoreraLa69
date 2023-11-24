const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config/config.js');

function requireAuth(req, res, next) {
    const { token } = req.cookies;
    console.log(token);
    if (!token) return res.status(401).json({ message: 'No token, Authorization denied' });

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}

module.exports = requireAuth;