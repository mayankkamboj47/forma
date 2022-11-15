function htmlTags(type) {
	const formSubmitURL = 'http://localhost:3000';
	// We have two types of inputs. Standard, also called input. And CInputs, used
	// for checkboxes and radios
	const input = (type) => {
		return ({id, name, required, placeholder})=>`<label for="${id}"><span class='main-label'>${name}</span><input type='${type}' name='${id}' ${required? 'required' : ''} ${placeholder ? `placeholder="${placeholder}"` : ''}/></label>`
	}
	// Cinput : For radio and checkboxes
	const cinput = (type)=> (
		({id, name, required, children}) => (
			`<label for=${id}><span class='main-label'>${name}</span>${children.map(s=>`<label for='${s}'>${s}<input type='${type}' name='${id}' id='${s}' value="${s}" ${required?"required=required" : ""}/> </label>`).join('\n')}</label>`
		));
	
	// each value in types is a function that maps a node to text. This notion of types being a
	// function is also used in server.js to reduce the amount of code. 
	const types = {
		'form' : ({action, method, children})=>`<form action="${formSubmitURL}" method="POST">${children.map(c=>htmlTags(c.type)(c)).join('\n')}<input type="submit" value="Submit" /></form>`,
		'string': input('text'),
		'number': input('number'),
		'email': input('email'),
		'radios':cinput('radio'),
		'checkboxes':cinput('checkbox'),
	};
	return types[type];
}

// ===========  HELPER FUNCTIONS

function boilerplate(str){
	return (
`
<!DOCTYPE html>

<meta charset='utf-8' />
<link rel='stylesheet' href='../css/basic.css' />

${str}
`
);
}

module.exports = function(node){
	return boilerplate(htmlTags(node.type)(node));
}