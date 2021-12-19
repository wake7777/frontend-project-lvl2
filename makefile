install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

linterFix:
	npx eslint --fix .

test:
	npm test
	
test-coverage:
	npm test -- --coverage --coverageProvider=v8