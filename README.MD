# FAQ Backend API

Welcome to the FAQ Backend API ! This project allows you to manage FAQs with multi-language support and caching.

## Features

- **Multi-language support**: FAQs can be translated into different languages with automatic translation using Google Translate API.

- **Caching**: Translations are cached using **Redis** for faster response times.
- **RESTful API**: Allows CRUD operations for FAQs, with dynamic language selection.
- **Admin Panel**: User-friendly interface for managing FAQs.
- **Testing**: Unit tests for model methods and API responses.
- **Documentation**: A detailed README with API usage and contribution guidelines.


## Demo

![Demo GIF](resources/demo.gif)



## Tech Stack

### Backend
- **Node.js**: JavaScript runtime for building scalable applications.
- **Express.js**: Web framework for Node.js to create the REST API.
- **MongoDB**: NoSQL database for storing FAQ data.
- **Redis**: In-memory data store for caching translations.
- **Google Translate API**: Used for automatic translation of FAQ questions and answers.


### Other Tools
- **ESLint**: For enforcing code quality standards.
- **dotenv**: For environment variable management.
- **Mongoose**: MongoDB object modeling for Node.js.


## Installation

Follow these steps to set up the project locally:

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local or cloud)
- Redis (local or cloud)


### Steps

1. **Clone the Repository**
   ```bash
    https://github.com/harsh-panchal-804/FAQ-Backend
   ```

2. **Install backend dependencies**
    ```
    cd faq-backend
    npm install
    ```

3. **Set Up Environment Variables** 
    Create a .env file in the root directory of your project with the following keys:

    

    **.env File:**

    ```
    MONGO_URI=your-mongodb-connection-string
    REDIS_URL=your-redis-connection-string
    PORT=3000
    ```

4. **Run The Application** 
    ```
    node express.js
    
    ```
    

# FAQ API Usage Examples

The FAQ API allows you to manage FAQs with multi-language translation support.

## 1. Fetch FAQs (Default: English)
1. To get the list of all FAQs in English (default):

```
    curl http://localhost:3000/faqs/
```
2. Fetch FAQs in a Specific Language

To fetch FAQs in Hindi:
```
    curl http://localhost:3000/faqs/?lang=hi
```
To fetch FAQs in Bengali:
```
    curl http://localhost:3000/faqs/?lang=bn
```
3. Create a New FAQ
To create a new FAQ, send a POST request with a question and answer:
```
    curl -X POST http://localhost:3000/faqs/ \
        -H "Content-Type: application/json" \
        -d '{"question": "What is Node.js?", "answer": "Node.js is a runtime for executing JavaScript"
  ```


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

