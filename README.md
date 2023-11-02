# polling--api
Polling System API
A polling system API is an application programming interface that allows developers to create, manage, and retrieve data from a polling system. A polling system is a platform that enables users to create polls, surveys, and quizzes and gather responses from participants.

# Problem Statement :
Let’s make a polling system, only API based.
Technology Used:
Node Js
Java Script
MongoDB
Install
To install all the dependences of the project, run the following command:
# npm install
# npm start

# Usage
Run npm start to start the application.
Connect to the API using Postman on port 8000.

# API Endpoints
HTTP Verbs	Endpoints	Action
POST	/questions/create	To create a question
POST	/questions/:id/options/create	To add options to a specific question
DELETE	/questions/:id/delete	To delete a question
DELETE	/options/:id/delete	To delete an option
PUT	/options/:id/add_vote	To increase the count of votes
GET	/questions/:id	To view a question and its options
