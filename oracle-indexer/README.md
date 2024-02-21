# Oracle Indexer

## Getting Started

Before you begin, ensure that you have Node.js and Yarn package manager installed on your system. These tools are essential for running and managing the dependencies of this subproject.

## Installation

To set up the indexer on your local machine, follow these steps:

- Clone the repository to your local machine (if you haven't already done so).
- Navigate to the folder directory from your terminal.
- Run the following command to install all the necessary dependencies:

```
yarn install
```

## Deploying

To deploy:

- Go to subquery
- Create an account
- When you create your account, in the top right menu there will appear a menu dropdown, if you click on it, it will display an option for the api key, with that api key execute the below command. (If you want to skip all previous step, just run below command with a test account created.)

- Right now if you push with the same exact name it currently has the project, it will succeed, but, if you want to deploy with other name, you'd need to first go to subquery platform, and create a new project with the exact same name you are putting in this project and then, execute below code:
  SUBQL_ACCESS_TOKEN=MTI1NjI2Nzk=0SqBiZBQBLBISopetK7F npx subql publish

## Take in consideration

Make sure everytime you change the "schema.graphql" file, you sync all the new types into the repo with the command:

```
yarn build
```

## Support

If you encounter any issues or have questions about this subproject, please refer to the project's documentation or contact the development team for assistance.
