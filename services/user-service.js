const { user } = require("../models/users/user-model")

module.exports = {
    getAllUsers: (req) => {
        console.log(req.query, 'req==')
        const page = parseInt(req.query.page || 1);
        const limit = parseInt(req.query.limit || 10);
        const skipIndex = (page - 1) * limit;
        return user.find({ name: { $ne: "admin" } }, '-password')
            .sort({ _id: 1 })
            .limit(limit)
            .skip(skipIndex)
            .exec();
    }
}