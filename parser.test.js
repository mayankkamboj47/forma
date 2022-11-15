let parser = require('./parser.js');

let findTypeFromPlaceholder = parser.findTypeFromPlaceholder;

test('findTypeFromPlaceholder', () => { 
    expect(findTypeFromPlaceholder('19')).toBe('number');
    expect(findTypeFromPlaceholder('Lisa')).toBe('string');
    expect(findTypeFromPlaceholder('lisa@email.com')).toBe('email');
    expect(findTypeFromPlaceholder('')).toBe('string');
    expect(findTypeFromPlaceholder('sdfkjl9303')).toBe('string');
});

test('parse', () => {
    expect(parser.parse('!Name')).toEqual({"children": [{"children": [], "id": "Name", "name": "Name", "placeholder": undefined, "required": "required", "type": "string"}], "id": "formaForm", "type": "form"});
    expect(parser.parse('!age|19')).toEqual({"children": [{"children": [], "id": "age", "name": "age", "placeholder": "19", "required": "required", "type": "number"}], "id": "formaForm", "type": "form"});
    expect(parser.parse('age|19:string')).toEqual({"children": [{"children": [], "id": "age", "name": "age", "placeholder": "19", "type": "string"}], "id": "formaForm", "type": "form"});
    expect(parser.parse('sex : (male, female, other)')).toEqual({"children": [{"children": ["male", "female", "other"], "id": "sex", "name": "sex", "type": "radios"}], "id": "formaForm", "type": "form"});
    expect(parser.parse('! agree? : [yes]')).toEqual({"children": [{"children": ["yes"], "id": "agree", "name": "agree?", "required": "required", "type": "checkboxes"}], "id": "formaForm", "type": "form"});
    expect(parser.parse('!Name\n!age|19')).toEqual({"children": [{"children": [], "id": "Name", "name": "Name", "required": "required", "type": "string"}, {"children": [], "id": "age", "name": "age", "placeholder": "19", "required": "required", "type": "number"}], "id": "formaForm", "type": "form"});
});