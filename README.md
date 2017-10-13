## Installation Steps:

### For installing node.js:

sudo apt-get install nodejs

sudo apt-get install npm

### For installing Angular:

npm install -g @angular/cli

### For installing Memcached:

sudo apt-get install memcached


## Running Instructions:

1. Extract zip file and cd to directory.

2. Run npm install for resolving dependencies.

3. Open terminal. Run "memcached" for starting memcached. (Default port: 11211)

4. Open another terminal. Run "ng build --w"

5. Open a third terminal. Run "node server.js"

6. Go to browser & check "localhost:8080

7. Enjoy the game! 

## Source files:

* server.js is where all the backend code is written using node.js. I have used node.js due to its performance, asynchronous nature and easy of use. 
* I have used Express framework to assist in building routes, handling sessions and working with memcached store.
* I have decided not to use a database due to performance and scalability issues. Also, it doesn't justify using databases for  keeping simple statistics.
* Instead, I have opted for distributed key-value pair memory cache which speeds up lookup operations as it is a hash table. It is also a distributed system, so additional servers could be easily added depending on the need.
* It is also more secure than using in memory sessions and cookies.
* Most of the business logic is on the server side and the client side is only given the task of rendering based on certain conditions.
* I have used Angular4 components for making REST calls to the backend and rendering HTML.
* src/app contains the angular .ts, .html and .css files.
 
