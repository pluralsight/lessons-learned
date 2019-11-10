# Lessons Learned Using Typescript in Node

## Learning Lessons from Others

1. Clone the repo
1. `npm test` to run all the tests
1. `npm run test:fund` to run only the fundamental tests
1. `npm run test:adv` to run only the advanced tests
1. Read the results
1. If you see test results that look interesting look for a top level test "Link to this test:" and click the link
1. Analyze and modify as needed for complete understanding

## Contribute your own lessons learned

### Coding Guidelines

1. Read some of the tests and try to emulate the descriptive style of the describes and it statements. The goal is that the output from your tests is all someone needs to get a basic understanding of what lesson is being shown. It is reasonable to expect them to look at the code of the test to fully understand the lesson.
1. Optionally you can the words `FUNDAMENTAL` or `ADVANCED` to the description for the test. If the topmost description contains `ADVANCED` then `npm run test:adv` will execute the tests contained therein. If the description contains `FUNDAMENTAL` then `npm run:fund` will run those tests. `npm test` will run all the tests.
1. Ideally you will only have a test file, but if you need a separate source file, it is recommended that you keep the source and test files together in the same folder.
1. If you have a collection of related lessons feel free to create a folder **under** `src`.
1. Consider using `uut` for unit under test if you create an object instance of a class that is the main object for the test. This is a guideline not a "rule" but the first tests were written with this convention so it will make it easier on learners if consistent naming is used.
1. Write in TypeScript. If you have an idea for a lesson learned, but it only applies to JavaScript, it doesn't belong here. (This one is kind of a rule.)
1. Also optionally, under your first `describe` add an `it('Link to this test: src/advanced/nameOfTest.test.ts:15)', () => {})` where `nameOfTest` and `15` are replaced with your file name and line number of the top level describe.
1. Don't leave console.log or other terminal output in your code.
