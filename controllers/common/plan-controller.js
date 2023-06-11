const { PlansModel } = require("../../models/common/plan-controller.model")
const stripe = require('stripe')('sk_test_51NEa7bSCOiDwHOh503j1O3DcoQBh3iuFtKGBKYoQMLxyrEt9Lv0kG5o8ShgyRNND5Fd9XfIHyjZXF6ipmj0JP2iY00Phm950qS');
module.exports = {
    createPlan: async (req, res) => {
        try {
            const planData = await PlansModel.find({ title: req.body.title });
            console.log(planData)
            if (planData.length > 0) {
                return res.status(400).send({ message: 'Plan is already added' })
            }
            const product = await stripe.products.create({
                name: req.body.title,
            });
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: req.body.price * 100,
                currency: 'inr',
            });
            const formData = { ...req.body, priceId: price.id }
            const insertedPlan = PlansModel.create(formData)
            if (insertedPlan) {
                res.status(200).send({ message: 'Plan added successfully' })
            }
        } catch (error) {
            res.status(500).send({ message: 'Something went wrong' })
        }
    },
    getPlans: async (req, res) => {
        try {
            res.status(200).send(await PlansModel.find())
        } catch (error) {
            res.status(500).send({ message: 'Something went wrong' })
        }
    },
}