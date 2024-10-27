# Youverify Assessment - Playwright Test

This repository contains a Playwright test suite for the Youverify assessment using TypeScript and the Page Object Model (POM) design pattern.

## Steps:

### Prerequisites:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)   

### 🛠️ Installation Steps:

1. Clone the repository

   ```bash
   git clone https://github.com/infinixbolt/YouVerifyAssessment.git
   cd YouVerifyAssessment
2. Install dependencies:  
   npm install

### Running Tests:
To run the tests, use the following commands for UI test and API test respectively  

npx playwright test tests/ui  
npx playwright test tests/api

### Project Structure:  
#### pages/: Contains the Page Object Model (POM) classes.  
cartPO.ts: Page object for the cart page.  
countryPageO.ts: Page object for the country page.  
homePageO.ts: Page object for the home page.
  
#### tests/ui: Contains the UI test files.  
product.spec.ts: Test file for the ecommerce web application.

#### tests/api: Contains the API test files.  
integrationandfunctional.spec.ts
regressiontest.spec.ts  
smoketest.spec.ts  

#### test data/: Contains test data used in the tests.  
testData.ts

### Contributing
Fork the repository.  
Create a new branch (git checkout -b feature/your-feature).  
Make your changes.  
Commit your changes (git commit -m 'Add some feature').  
Push to the branch (git push origin feature/your-feature).  
Open a pull request.
