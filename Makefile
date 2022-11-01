form:
	node parser.js form.forma
	node parseTreeToHTML.js > parsed.html
	xdg-open parsed.html
	echo "[]" > formData.json
	node server.js