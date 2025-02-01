const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

/////GET localhost:3000/faqs return all faqs in english
/////GET localhost:3000/faqs?lang=hi return all faqs in hindi
/////GET localhost:3000/faqs?lang=fr return all faqs in french

router.get('/', faqController.getAllFAQs);

///// POST localhost:3000/faqs
///// body: { question: "What is MongoDB?", answer: "MongoDB is a NoSQL database" }
//// inserts a new faq into the database

router.post('/', faqController.createFAQ);

module.exports = router;
