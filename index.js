const express = require('express')
const router = express.Router()
const fs = require('fs')
const marked = require('marked')

const css = fs.readFileSync('./docs.css', 'utf8')

const htmlFromMarkdown = (filename) => {
	let path = `./views/docs/${filename}.md`
	let include = fs.readFileSync (path, 'utf8')
	let html = marked(include)

	return html
}

router.get('/', (req, res) => {
	const firstItem = options.docsData.filter(item => item.type === 'doc')[0]

	res.redirect('/docs/' + firstItem.id)
})

router.get('/:docItem', (req, res) => {
	
	let docItem = req.params.docItem

	try {
		var html = htmlFromMarkdown(docItem)
	} catch(e) {
		// Most probably docItem doesn't exist
		return res.redirect('/docs')
	}
	
	res.render('docs/docs', { 
		currentItem: docItem,
		page: options.docsData.find(item => item.id === docItem).name + ' documentation',
		docsData: options.docsData,
		content: html,
		css: css
	})
})


module.exports = (opts) => {
	if (opts) options = opts

	return router
}