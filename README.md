Simple voting app the would have to satisfy the following use case:


User Story: As an unauthenticated or authenticated user, I can see and vote on everyone's polls.

User Story: As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)


/As an new user, I want to be able to register to create an account so I can create and store polls
1 check if account exists
2 hashing password 
3 storing user record
4 respond so front-end knows async if things faile

/As an user, I want to be able to login so I can create and store polls
1 check if account exists
2 check if password is correct by retrieving password
3 respond so front-end knows async

User Story: As an authenticated user, I can create a poll with any number of possible items.
1. create new poll (Poll Name, Choice Options)
2. 
2. User Story: As an authenticated user, I can keep my polls and come back later to access them.
2. store poll and associate poll with userName

User Story: As an authenticated user, I can delete polls that I decide I don't want anymore.
1. query to find poll associated with userName
2. delete poll from db 

User Story: As an authenticated user, I can share my polls with my friends.
1. create sharable link
2. 

User Story: As an authenticated user, I can see the aggregate results of my polls.