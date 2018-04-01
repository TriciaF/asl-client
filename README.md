# ASL Learning Application using the Spaced Repetition learning methodology

[Link](https://asl-learning.netlify.com/ "ASL website")


# Pitch
The ASL Leaning application allows users to learn the ASL alphabet.  The application uses the spaced-repetition learning methodology which presents users with questions they get wrong, more frequently, vs the questions they get correct.



## Technology
### Front-End

- React / Redux
- ES6

## Back-End

- Node.js
- Express
- MongoDB
- Mongoose
- JWT + Passport + bcrypt

## Testing and Deployment

- Mocha
- Chai
- Heroku - server
- Netlify - client
- mLab

# REST API
The applicaitons REST API allows users to register for the applicaiton using JWT authentication.  Additionally, users can login to the applicaiton.

Once logged in, the REST API has endpoints to GET questions to the user and update the user's response, via the POST endpoint 