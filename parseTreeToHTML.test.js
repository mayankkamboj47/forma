/**
 * 
 * There are multiple good ways to translate a parse tree into an HTML file. To reduce test
 * rigidity, we're using snapshot tests. 
 */

const nodeToHTML = require('./parseTreeToHTML');

const nodes = {};

beforeAll(()=>{
    nodes.node1 = {
        id : 'Enter-your-name',
        type : 'string',
        name : 'node1',
        placeholder : 'Enter your name',
        children : []
    };
    nodes.node2 = {
        id : 'Enter-your-favorite-fruits',
        type : 'checkboxes',
        name : 'Enter-your-favorite-fruits',
        placeholder : 'Enter your favorite fruits',
        children : ['Bananas', 'Guavas', 'Pineapples', 'Mangoes']
    };
    nodes.node3 = {
        id : 'Where-do-you-live',
        type : 'radios',
        name : 'Where-do-you-live',
        placeholder : 'Where do you live?',
        children : ['England', 'India', 'Laos', 'USA']
    };

});
test('htmlTags', ()=>{
    expect(nodeToHTML(nodes.node1)).toMatchSnapshot;
    expect(nodeToHTML(nodes.node2)).toMatchSnapshot;
    expect(nodeToHTML(nodes.node3)).toMatchSnapshot;
});