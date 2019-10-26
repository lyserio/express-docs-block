# express-docs-block
[![npm version](https://badge.fury.io/js/express-docs-block.svg)](https://badge.fury.io/js/express-docs-block)

-> [See a Demo](https://nucleus.sh/docs)

An Express (4.0+) middleware to generate a documentation page written in markdown.

## Features

- [X] Beautiful and simple doc page
- [X] Menu auto generated in Sidebar
- [X] Highlight code by default
- [X] Shipped with simple CSS theme 
- [X] Integrated in your EJS
- [ ] Fuzzy search
- [ ] Home Page to showcase all articles


It's designed to be extremely simple to use:

- Write doc articles as markdown files
- Add the middleware to the `/docs` routes
- `include` the generated template in your `ejs`

## Usage

Add your pages as markdown files under a `/docs` folder. 

Install the library

```bash
npm install express-docs-block
```

The `items` array of object contains your documentation menu, with respect to the order.

An item can either be `type: 'title'` or `type: 'doc'`. Titles are used to define sections (like "API reference", "Guides", ...)

```javascript
const docs = require('express-docs-block')({
	folder: 'docs/',
	items: [{
		type: 'title',
		name: 'Deployment guides'
	}, {
		type: 'doc',
		id: 'node',
		name: 'Node.js'
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

app.get("/docs", docs, (req, res, next) => {
	res.render("views/docs")
})

app.get("/docs/:page", docs, (req, res, next) => {
	res.render("views/docs")
})

```

The middleware will pass `res.locals.pageHtml` variable that contains your documentation page (menu & content with basic CSS) so it's directly accessible in your template.

It's super easy to add in your `docs.ejs` view:

```html
...
<body>
	<h1>A really great doc page</h1>

	<%- pageHtml %>

	<footer>Copyright...</footer>
</body>
...
```
