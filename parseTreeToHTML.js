function generateHTML(node){
	return htmlTags(node.type)(node);
}

function htmlTags(type){
	const input = (type) => {
		return ({id, name, required, placeholder})=>`<label for="${id}">${name}<input type='${type}' name='${id}' ${required? 'required' : ''} ${placeholder ? `placeholder="${placeholder}"` : ''}/></label>`
	}
	const cinput = (type)=> (
		({id, name, required, children}) => (
			`<label for=${id}>${name}${children.map(s=>`<label for=${s}>${s}<input type=${type} name=${id} id=${s} /> </label>`).join('')}</label>`
		))
	const types = {
		'form' : ({action, method, children})=>`<form>${children.map(generateHTML).join('\n')}
							<input type="submit" value="Submit" /></form>`,
		'string': input('text'),
		'int': input('number'),
		'email': input('email'),
		'radios':cinput('radio'),
		'checkboxes':cinput('checkbox'),
	};
	return types[type];
}

console.log(boilerplate(generateHTML(require('./parsed.json'))))





// ===========  HELPER FUNCTIONS

function boilerplate(str){
	return (
`
<!DOCTYPE html>

<meta charset='utf-8' />
<link rel='stylesheet' href='./css/basic.css' />

${str}
`
	);
}
