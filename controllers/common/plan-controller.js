const { PlansModel } = require("../../models/common/plan-controller.model")
const stripe = require('stripe')('sk_test_51NEa7bSCOiDwHOh503j1O3DcoQBh3iuFtKGBKYoQMLxyrEt9Lv0kG5o8ShgyRNND5Fd9XfIHyjZXF6ipmj0JP2iY00Phm950qS');
module.exports = {
    createPlan: async (req, res) => {
        try {
            const planData = await PlansModel.find({ interviewType: req.body.interviewType });
            if (planData.length > 0) {
                return res.status(400).send({ message: 'Plan already exists' })
            }
            const product = await stripe.products.create({
                name: req.body.interviewType,
            });
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: req.body.price * 100,
                currency: 'inr',
            });
            const formData = { ...req.body, priceId: price.id }
            const insertedPlan = await PlansModel.create(formData)
            if (insertedPlan && insertedPlan._id) {
                res.status(200).send({ message: 'Plan added successfully' })
            } else {
                res.status(500).send({ message: 'Something went wrong' })
            }
        } catch (err) {
            if (err && err.code === 11000) {
                res
                    .status(500)
                    .send({ status: "Error", message: "Plan already exists." });
            } else {
                res.status(500).send({ message: 'Something went wrong' })
            }
        }
    },
    getPlans: async (req, res) => {
        try {
            res.status(200).send(await PlansModel.find())
        } catch (error) {
            res.status(500).send({ message: 'Something went wrong' })
        }
    },
    updatePlan: async (req, res) => {
        try {
            const updatedRes = await PlansModel.findByIdAndUpdate(req.params.id, req.body)
            if (updatedRes) {
                res.status(200).send({ message: 'Plan updated successfully' })
            }
        } catch (err) {
            if (err && err.code === 11000) {
                res
                    .status(500)
                    .send({ status: "Error", message: "Plan already exists." });
            } else {
                res.status(500).send({ message: 'Something went wrong' })
            }
        }
    },
    deletePlan: async (req, res) => {
        try {
            if (req.params.id) {
                const deleteRes = await PlansModel.findByIdAndDelete(req.params.id);
                if (deleteRes) {
                    res.status(200).send({ message: 'Plan deleted successfully' });
                } else {
                    res.status(400).send({ message: 'Resource not exists' });
                }
            }
        } catch (error) {
            res.status(500).send({ message: 'Something went wrong' })
        }
    }
}