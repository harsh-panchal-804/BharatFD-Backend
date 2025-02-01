const FAQ = require('../models/faq');
// const translate = require('@vitalets/google-translate-api');


//// this function returns a list containing all the faqs in the database
exports.getAllFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || 'en';

    /// check if redis client is present in the response 
    if (!req.redisClient) {
      return res.status(500).json({ error: "Redis client not initialized" });
    }

    const faqs = await FAQ.find({});
    

    //// result is an array which contains all faqs 
    ////if the requested language is not "en" we will get its translation 
    const result = await Promise.all(
      faqs.map(async (faq) => {
        let question = faq.question;
        let answer = faq.answer;

        if (lang !== 'en') {
          try {
           
            question = await faq.getTranslation('question', lang, req.redisClient);
            answer = await faq.getTranslation('answer', lang, req.redisClient);
          } catch (error) {
            console.error("Translation failed:", error.message);
          }
        }

        return {
          id: faq._id,
          question,
          answer,
          createdAt: faq.createdAt,//// we can use createdAt as we enabled 
          updatedAt: faq.updatedAt ///// timestamps in the schema
        };
      })
    );

    return res.json(result);
  } catch (err) {
    console.error("Error fetching FAQs:", err);
    res.status(500).json({ error: 'Server Error' });
  }
};

//// function to create a new faq
//// POST localhost:3000/faqs
exports.createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: 'Question and Answer are required' });
    }

    ////// simple post route controller 
    const faq = new FAQ({ question, answer });
  
    await faq.save();
    //// use await as .save is not synchronous method

    return res.status(201).json(faq);
  } catch (err) {
    console.error("Error creating FAQ:", err);
    res.status(500).json({ error: 'Server Error' });
  }
};
