# Playwright portfolio
Sample framework structure including:
- Page objects
- Page fragments
- Object fixtures
- Reporting
- Working with environment variables (supporting multiplie envs like prod, stg)
- Test data approach (just a sample, actual one strongly depends on project needs)
- Execution against different browsers
- Github actions flow to execute tests upon pull request
- Accessibility testing (A11)

Tests are writtent against Sample book store https://demoqa.com/books

Playwright documentation: https://playwright.dev/docs/intro 

## Prerequisites
1. Install Playwright

```shell 
npm install 
npx install playwright
```

2. (Optional) For better experience install following plugin for Visual studio code - ‘Playwright Test for VSCode’

## Run tests from command line
All tests:
```
npx playwright test
```

All tests in headed mode (to see browser):
```
npx playwright test --headed
```

A11 tests:
```
npx playwright test --grep=a11/
```

Functional tests:
```
npx playwright test --grep=functional/
```

Smoke suite tests:
```
npx playwright test --grep=@smoke
```




## Accessibility testing (A11)
Custom report: https://github.com/AndriiFrolov/playwright-portfolio/blob/master/framework/a11/A11ReportBuilder.ts 
Test example: https://github.com/AndriiFrolov/playwright-portfolio/tree/master/tests/a11/books_a11.spec.ts
Note that customizations is very simple and Report & Builder injects to the tests using fixtures

Custom test report attached to each failed a11 test
