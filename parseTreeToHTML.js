function generateHTML(node){
	return htmlTags(node.type)(node);
}

const formSubmitURL = 'http://localhost:3000';
function htmlTags(type){
	const input = (type) => {
		return ({id, name, required, placeholder})=>`<label for="${id}"><span class='main-label'>${name}</span><input type='${type}' name='${id}' ${required? 'required' : ''} ${placeholder ? `placeholder="${placeholder}"` : ''}/></label>`
	}
	const cinput = (type)=> (
		({id, name, required, children}) => (
			`<label for=${id}><span class='main-label'>${name}</span>${children.map(s=>`<label for='${s}'>${s}<input type='${type}' name='${id}' id='${s}' value="${s}" ${required?"required=required" : ""}/> </label>`).join('\n')}</label>`
		))
	const types = {
		'form' : ({action, method, children})=>`<form action="${formSubmitURL}" method="POST">${children.map(generateHTML).join('\n')}
							<input type="submit" value="Submit" /></form>`,
		'string': input('text'),
		'number': input('number'),
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
