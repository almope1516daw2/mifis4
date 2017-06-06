How to use it


- docker-compose build
- docker-compose up -d


---

- npm install
- npm run populate


# An id will appear as a result of previous script
# copy paste it in js/app.js

app.js
//Paste the generated id on npm run populate here
let userId = getQueryParams(document.location.search).user || "55fd9fed43dcd2eb0dca5abc";





Scripts

You can find some scripts in the package.json:

npm start Is the default that comes with the relay-kit and starts the server
npm run update-schema generates the associated schema file from the one we will code.
npm run print-schema Will print the schema in the console and generate a .graphql file in the data folder called printedSchema.graphql
npm run populate will fill with mock data your MongoDB using mongoose.