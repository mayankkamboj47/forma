const slugify = require('slugify');
const fs = require('fs').promises;
const process = require('process');

/**
 * 
 * @param {String} code The input forma program
 * @returns {Object} The parse tree
 */
function parse(code){
	// Each line in forma follows one of two formats below
// The format consists of the following parts, all optional except name  : 
// (\W+)		The initials
// ([^|]+)		The name
// (\|.+)		The placeholder
// (:\s*(.+)$)	The rest
// see docs.md for more info

const syntax1 = /^(\W*)([^|]+)(\|.+)*\s*:\s*(.+)$/;
const syntax2 = /^(\W*)([^|]+)(\|.+)*\s*/;

	const root = {id : 'formaForm',
		      type : 'form',
		      children : []};
	for(let line of code.split('\n')) {
		let structure;
		if(structure=(line.match(syntax1) || line.match(syntax2))) {
			let [initials, name, placeholder, rest] = structure.slice(1);
			if(rest && rest[rest.length-1]==',')
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
/**
 * 
 * @param {*} initials 
 * @param {*} name 
 * @param {*} placeholder 
 * @param {*} rest 
 * @returns A parse tree node
 */
function parseChild(initials, name, placeholder, rest=''){
	if(placeholder)
		placeholder = placeholder.slice(1).trim();
	const nameSlug = slugify(name);
	const node = { id : nameSlug, type : null, children : [], name, placeholder};
	if(initials=='!') node.required = "required";
	let match;
	if(rest && (match=rest.match(/\[(.*)\]/))){
		node.type = 'checkboxes';
		node.children = match[1].split(',').map(a=>a.trim());
	}
	else if((rest && (match=rest.match(/\((.*)\)/)))){
		node.type = 'radios';
		node.children = match[1].split(',').map(a=>a.trim());
	}
	else if(rest && (match=rest.match(/\w+/))){
		node.type = match[0];
	}
	else if(placeholder && (match=findTypeFromPlaceholder(placeholder))){
		node.type = match;
	}
	else{
		throw new Error(name, "has a bad value :", rest);
	}
	return node;

	
	function findTypeFromPlaceholder(placeholder=''){
		const specials = {
			'email' : /[A-Za-z][A-Za-z0-9]*\@[A-Za-z][A-Za-z0-9]*\.[a-z]+/	
		};
		let match;
		if(!isNaN(parseInt(placeholder))) return 'number';
		else if(Object.entries(specials).some(([entry, regex])=>(match=placeholder.match(regex)?entry:null)))
			return match;
		else return 'string';
	}
}

module.exports.parse = parse;
module.exports.parseChild = parseChild;