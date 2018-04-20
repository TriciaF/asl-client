# ASL Learning Application using the Spaced Repetition learning methodology

# Learning ASL Alphabet Link: https:/learning-asl-alphabet.netlify.com/


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

User Router:
POST: /api/users
  required fields: username, password
  Creates a new user if user does not exist
  
GET: /api/users/:id
  required fields: user id
  searches the user database and returns the next question for the user
  
PUT: /api/users/:id
  required fields: user id
  searches the user database and updates the question listed based on spaced-repetition computation
  
Question Router
GET: /api/questions
  required fields: none
  returns the list of questions for population into the user object
  
GET: /api/questions/:id
  required fields: id
  searches and returns a question
  
POST: /api/questions
  required fields: image, answer, mValue
  creates a new question
  
