// We expect 2 arguments from command line. First, the forma parsed output, 
// and second a JSON file where to store incoming submitted inputs from frontend

const {Server} = require('http');
const form = require('formidable')({});
const parseTree = importAsJSON(process.argv[2]);

Object.prototype.map = objMap; 
const types = parseTreeToTypeTable(parseTree);

const formData = importAsJSON(process.argv[3]);  // submitted forms get saved here

function saveData(data){
	const fs = require('fs').promises;
	formData.push(data);
	fs.writeFile(process.argv[3], JSON.stringify(formData));
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

/**
 * 
 * @param {parsedTree} tree Output from parser.js
 * @returns A key-value pair : {input-id : fn}. fn takes an input, typically a string, and converts it into
 * the right type
 */
function parseTreeToTypeTable(tree){
	if(tree.type!=='form') throw new Error('rootNode.type should be "form". Found ' + tree.type);
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

// Helpers
function objMap(func){
	return Object.fromEntries(Object.entries(this).map(a=>func(...a)));
}

function importAsJSON(filename){
	const fs = require('fs');
	try {
		return JSON.parse(fs.readFileSync(filename, 'utf-8'));
	} catch (e){
		if(e.code!=='ENOENT') throw e;
		fs.writeFileSync(filename, "[]");
		return [];
	}
}