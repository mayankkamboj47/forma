# The Forma Parser

Output is a tree, or an object with the following attributes (at least) : 
```
id,
type,
children
```

# How to use this

```
node parser.js <myFormaFile>.forma
```

Syntax of forma is specified elsewhere

# How should the parser look like

It should output something useful immediately to both the frontend and
the backend

# The frontend just needs to ready the form
A tree which can readily be converted to a form DOM.

# The backend needs metadata in terms of type information etc.
A tree which can quickly yield a hash table of sorts, from which type
information can be extracted.

# Some rough ideas
```
{
id : string, 
type : form,
children : [
  {id : name, type : 'string', ...},
  {id : gender, type : 'radios', ...},
  {id : ...},
]
}
``` 
On the frontend, this can quickly yield a form, and on the backend,
a hash table with ids associated with their corresponding types
Finally, we can match the form with its corresponding types and call it a
day ? 
