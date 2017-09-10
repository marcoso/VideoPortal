
# Video Portal
Sample Video Library and Player App using Angular2, MongoDB, CryptoJS, bootstrap, Webpack and unit testing performed with Jasmine and Karma test runner.

This application would allow authenticated users to look for their favorite videos and play them, they will also be able to enter the datailed view of the video, another feature is the ability to provide video ratings.

The application uses Webpack for module loading.

# Usage of MongoDB with the application
This application uses:
Mongo DB Server Installed locally (version MongoDB 3.2.9 2008R2Plus Enterprise (64 bit)) but if there is a newer version it might work too.

# Steps to initialize and run the application

Run the mongod executable through command line:
- Move to the particular installation folder (similar path to: C:\Program Files\MongoDB\Server\3.2\bin)
- Type mongod to run the executable
- Server will start listening for connections

Run the application:
- Copy the project files to your desired location
- Run a command line window (Having NPM installed and configured) and move to the folder you just copied the application files
- Install dependencies by typing: npm install (this will look into package.json file and install all those described packages)
- After installation is complete you can validate all the packages installed by typing the command: npm list --depth=0
- Compile the app and run it by typing: npm start
- Node will start listening for connections after webpack modules are loaded
- After the compilation select a browser and navigate to http://localhost:3000/

Run the tests with karma:
- Run a command line window (Having NPM installed and configured) and move to the folder where the application is located
- Execute the following command: npm test
- The previous command will make webpack compile the application, load the needed components and then the karma runner will take place
- The result of the test executions will be displayed
