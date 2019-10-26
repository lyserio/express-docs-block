const ejs = require('ejs')
const fs = require('fs')
const marked = require('marked')
const hljs = require('highlight.js')

const css = fs.readFileSync(__dirname+'/docs.css', 'utf8')

marked.setOptions({
	highlight: (code, lang) => {
		return hljs.highlight(lang, code).value
	}
})

const htmlFromMarkdown = (folder, filename) => {
	let path = `${folder}/${filename}.md`
	let include = fs.readFileSync(path, 'utf8')
	let html = marked(include)

	return html
}

/* Export a middleware */ 
module.exports = (options) => {

	return (req, res, next) => {

		let docItem = req.params.item || options.items.filter(item => item.type === 'page')[0].id

		try {
			var contentHtml = htmlFromMarkdown(options.folder, docItem)
		} catch(e) {
			console.log(e)
			// Most probably docItem doesn't exist
			return next("This page doesn't seem to exist anymore.")
		}

		const renderOptions = { 
			currentItem: docItem,
			page: options.items.find(item => item.id === docItem).name + ' documentation',
			menuItems: options.items,
			content: contentHtml,
			css: css
		}

		ejs.renderFile(__dirname+'/docs.ejs', renderOptions, (err, rendered) => {
			if (err) return next(err)
			res.locals.pageHtml = rendered
		
			next()
		})
	}
}