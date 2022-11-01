const {Server} = require('http');
const form = require('formidable')({});
const parseTree = require('./parsed.json');

Object.prototype.map = objMap; 
const types = parseTreeToTypeTable(parseTree);

const formData = require('./formData.json');
function saveData(data){
	const fs = require('fs').promises;
	formData.push(data);
	fs.writeFile('formData.json', JSON.stringify(formData));
}

(new Server((req, res)=>{
	res.json = function(statusCode, data){
		res.writeHead(200, {"Content-Type" : "application/json"});
		res.write(JSON.stringify(data));
		res.end();
	};
	
	form.parse(req, (err, fields)=>{
		if(err) res.json(400, "something wrong with your data"); 
		saveData(fields.map((key, val)=>[key, types[key](val)]));
		res.json(200, "Your form has been submitted");
	});
})).listen(3000);

function parseTreeToTypeTable(tree){
	if(tree.type!=='form') throw new Error('rootNode.type should be "form". Found ' + tree.type);
	// table contains a key mapped to a type. Key is the id, and the type is
	// a function that takes a value and coerces it to the appropriate type,
	// or throws an error
	return Object.fromEntries(tree.children.map(child=>[child.id, type(child)]));

	function type(child) {
		const typeTable = {
			'string' : String, 
			'number' : Number,
			'email'  : String,
			'checkboxes' : id,
			'radios' : String
		};
		if(child.type in typeTable) return typeTable[child.type];
		else return id;

		function id(x){
			return x;
		}
	}
}
function objMap(func){
	return Object.fromEntries(Object.entries(this).map(a=>func(...a)));
}
