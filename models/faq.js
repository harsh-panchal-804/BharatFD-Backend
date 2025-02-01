const mongoose = require('mongoose');
const {translate}= require('@vitalets/google-translate-api');
//// i have used mongodb as a database because of the nature of the project
//// we require a schema less model so that we can put many languages in the same model
/// without having to create a new model for each language



const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  

  
  question_hi: { type: String, default: '' },
  question_bn: { type: String, default: '' },
  answer_hi: { type: String, default: '' },
  answer_bn: { type: String, default: '' },
}, { timestamps: true });

//// we use timestamps to track when the faq was created and updated


//// this function handles all logic for translating the faq
FAQSchema.methods.getTranslation = async function (field, lang, redisClient) {
  //// our redis cache key is going to be of format :
  /// Mongodb id of the faq document + field name("question" or "answer") + language("hi" or "fr")
  const cacheKey = `faq_${this.id}_${field}_${lang}`;

  console.log(`Checking Redis for key: ${cacheKey}`);

  try {
    /// first check if the translation is already cached
    const cachedTranslation = await redisClient.get(cacheKey);
    if (cachedTranslation) {
      console.log(`Cache hit for ${cacheKey}:`, cachedTranslation);
      return cachedTranslation;
    }

    console.log(`Cache miss for ${cacheKey}, translating...`);

    /// if the translation is not cached, translate it
    const translation = await translate(this[field], { to: lang });

    if (!translation || !translation.text) {
      throw new Error(`Translation API did not return expected result for ${field}`);
    }

    console.log(`Translated ${field} to ${lang}:`, translation.text);

    //// store the translation in the cache
    //// you can also use funtion .setex()
    await redisClient.set(cacheKey, translation.text, 'EX', 3600); /// expire after 1 hour
    
    // this[field + '_' + lang] = translation.text;
    // await this.save();

    return translation.text;
  } catch (err) {
    console.error(`Translation error for ${field} (${lang}):`, err.message);
    return this[field]; 
  }
};


module.exports = mongoose.model('FAQ', FAQSchema);
