install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

lintFix:
	npx eslint --fix .

test:
	npm test
	
test-coverage:
	npm test -- --coverage --coverageProvider=v8