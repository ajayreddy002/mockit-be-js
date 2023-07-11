const { InterviewModel } = require('../../models/interview/interview-model');
const { getAllInterviews } = require('../../services/interview-service');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const DOMAIN = 'http://localhost:4200/success';

module.exports = {
  schedule: async (req, res) => {
    try {
      const { _id } = await InterviewModel.create(req.body);
      console.log(_id);
      res
        .status(200)
        .send({ status: 'Success', message: 'Scheduled successfully' });
    } catch (error) {
      res
        .status(500)
        .send({ status: 'Error', message: `${error} Something went wrong.` });
    }
  },
  getAllMeetingSolts: async (req, res) => {
    try {
      const slots = await getAllInterviews()
      res.status(200).send({ status: 'Success', slots: slots });
    } catch (error) {
      res
        .status(500)
        .send({ status: 'Error', message: `${error} Something went wrong.` });
    }
  },
  getInterviewsByUserIdAndStatus: async (req, res) => {
    if (req.params.id) {
      try {
        const interviews = await InterviewModel.find({
          userId: req.params.id,
          // status: req.params.status ? req.params.status : 'New',
        }, "-meetingId -participants").sort({ date: 1 });
        res.status(200).send({ status: 'Success', interviews: interviews });
      } catch (error) {
        res
          .status(500)
          .send({ status: 'Error', message: `${error} Something went wrong.` });
      }
    } else {
      res.status(400).send({ status: 'Error', message: `User id is missing` });
    }
  },
  createPayment: async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: req.body.priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${DOMAIN}?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${DOMAIN}?canceled=true`,
      });
      res.json(session.url);
    } catch (err) {
      res.status(500).send({ status: 'Error', message: 'Facing some technical issue will be back soon' })
    }
  },
  getPaymentSessionDetails: async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.retrieve(req.query.session_id)
      res.status(200).send({status: 'Success', data: session})
    } catch (error) {
      res.status(500).send({ status: 'Error', message: 'Failed to get details' })
    }
  }
};
