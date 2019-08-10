# express-docs-block
[![npm version](https://badge.fury.io/js/express-docs-block.svg)](https://badge.fury.io/js/express-docs-block)


*Still in testing*

An Express (4.0+) middleware to generate a documentation page written in markdown.

## Usage

Add your documentation pages/guides as markdown files under a `/docs` folder. 

Install the library

```bash
npm install express-docs-block
```

```javascript
app.use('/docs', require('express-docs-block')({
	mdFolder: 'docs/',
	docsData: [{
		type: 'title',
		name: 'Deployment guides'
	}, {
		type: 'doc',
		id: 'node',
		name: 'Node.js'
	}, {
		type: 'doc',
		id: 'php',
		name: 'PHP'
	}, {
		type: 'doc',
		id: 'ruby',
		name: 'Ruby'
	}, {
		type: 'doc',
		id: 'golang',
		name: 'Go'
	}, {
		type: 'doc',
		id: 'python',
		name: 'Python'
	}, {
		type: 'title',
		name: 'Options'
	}, {
		type: 'doc',
		name: 'Advanced',
		id: 'advanced'
	}, {
		type: 'doc',
		name: 'Custom domain',
		id: 'domain'
	}]
})
```


```html
<div id='billingSection'></div>

<script src='/billing/billing.js'></script>
```
