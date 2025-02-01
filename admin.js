const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const mongoose = require('mongoose');
const FAQ = require('./models/faq'); 

AdminBro.registerAdapter(AdminBroMongoose);


const adminBro = new AdminBro({
  databases: [mongoose], 
  rootPath: '/admin', 
  resources: [
    {
      resource: FAQ,
      options: {
        properties: {
          question: { isTitle: true }, 
          answer: {type: "string"},/// error with rich text so used string
          translations: { type: 'mixed' },
          createdAt: { isVisible: { edit: false, list: true } },
          updatedAt: { isVisible: { edit: false, list: true } },
        },
        actions: {
          new: {
            isAccessible: true, 
            before: async (request) => {
            
              if (!request.payload.question || !request.payload.answer) {
                return {
                  ...request,
                  errors: {
                    ...request.errors,
                    question: request.payload.question ? '' : 'Question is required.',
                    answer: request.payload.answer ? '' : 'Answer is required.'
                  },
                };
              }
              return request;
            },
          },
          edit: {
            isAccessible: true,
            before: async (request) => {
              
              if (!request.payload.question || !request.payload.answer) {
                return {
                  ...request,
                  errors: {
                    ...request.errors,
                    question: request.payload.question ? '' : 'Question is required.',
                    answer: request.payload.answer ? '' : 'Answer is required.'
                  },
                };
              }
              return request;
            },
          },
        },
      },
    },
  ],
  branding: {
    companyName: 'FAQ Admin Panel',
    softwareBrothers: false,
  },
});


const router = AdminBroExpress.buildRouter(adminBro);

module.exports = router;
