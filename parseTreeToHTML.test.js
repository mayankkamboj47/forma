// About time we make parseTreeToHTML more airtight and compact. 

const nodeToHTML = require('./parseTreeToHTML');

const nodes = {};

beforeAll(()=>{
    nodes.node1 = {
        id : 'enter-your-name',
        type : 'string',
        name : 'node1',
        placeholder : 'Enter your name',
        children : []
    };
});
test('htmlTags', ()=>{
    expect(nodeToHTML(nodes.node1)).toMatchSnapshot;
});