const jwt = require("jsonwebtoken");
module.exports = {
    getUserInfoByToken: (token) => {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        return decoded;
    }
}