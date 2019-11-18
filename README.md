# engineering-dashboard



# Setup
After cloning the repository, run `npm install` to install dependencies.
To build the client-side code, run either `npm run dev-build` (if you're developing)
or `npm run build`.

# Configuration

To fetch the data necessary to view the dashboard you will need to set the following environment variables:
* GITHUB_PR_TOKEN
* CLUBHOUSE_API_TOKEN
* MONGODB_URI - once you have a locally running mongo instance, you can set thit to `mongodb://localhost:27017/test`
* LOGIN_PASSWORD - set this to whatever you want locally, you will need to enter this to access the dashboard

# Running the server
To run the PR dashboard server, run `npm start`. This will start the server, listening on port 8080. You can change the port number by setting a `PORT` environment variable, e.g. `export PORT=80`.
