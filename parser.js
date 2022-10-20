const lineExpr = /^(\W*)([^|]+)(\|.+)*\s*:\s*(.+)$/;
const slugify = require('slugify');
const fs = require('fs').promises;
const process = require('process');

function parse(code){
	const root = {id : 'formaForm',
		      type : 'form',
		      children : []};
	for(let line of code.split('\n')) {
		let structure;
		if(structure=line.match(lineExpr)) {
			let [initials, name, placeholder, rest] = structure.slice(1);
			if(rest[rest.length-1]==',')
				rest = rest.slice(0, rest.length - 1);
			root.children.push(
				parseChild(
				initials,
				name,
				placeholder,
				rest
				)
			);
		}
	}
	return root;
}
function parseChild(initials, name, placeholder, rest){
	if(placeholder)
		placeholder = placeholder.slice(1).trim();
	const nameSlug = slugify(name);
	const node = { id : nameSlug, type : null, children : [], name, placeholder};
	if(initials=='!') node.required = "required";
	let match;
	if((match=rest.match(/\[(.*)\]/)) && !placeholder){
		node.type = 'checkboxes';
		node.children = match[1].split(',');
	}
	else if((match=rest.match(/\((.*)\)/)) && !placeholder){
		node.type = 'radios';
		node.children = match[1].split(',');
	}
	else if(placeholder && (match=findTypeFromPlaceholder(placeholder))){
		node.type = match;
	}
	else if(match=rest.match(/\w+/)){
		node.type = match[0];
	}
	else{
		throw new Error(name, "has a bad value :", rest);
	}
	return node;

	
	function findTypeFromPlaceholder(placeholder){
		const specials = {
			'email' : /[A-Za-z][A-Za-z0-9]*@[A-Z][A-Za-z0-9]*\.[a-z]+/	
		};
		let match;
		if(!isNaN(parseInt(placeholder))) return 'int';
		else if(Object.entries(specials).some(([entry, regex])=>(match=placeholder.match(regex))))
			return match;
		else return 'string';
	}
}

fs.readFile(process.argv[2], 'utf-8').then(parse).then(JSON.stringify).then(s=>fs.writeFile("parsed.json", s))
