# For the forma user

To create a form which asks for user's name and age, create a file called form.forma and
add : 
```
Name
Age : number
```
Now, execute the command 'node script.js form.forma' and it will generate everything for you. Start the server using `node server.js` and visit `out.html`. All of the submitted data will be stored in `formData.json`, which is a global in server.js for now.

Here is a more complete form which demonstrates a lot of the features : 
```
Name
Age|18
Email|johndoe@mail.org
Pick only one fruit : (apples, bananas, oranges)
Pick any fruits     : (apples, bananas, oranges)
!Must pick one fruit : (apples, bananas, oranges)
!Must select all of these : [I sell my data, I sell my rights, I sell my soul]
```

# Syntax of a line

Each line in forma follows the following syntax : `initials name placeholder rest`.
Out of these, only name is mandatory.

Here is an example where the initials are `!`, the only initial in forma as of now. Name is age, and placeholder is 19. Forma automatically decides on the type from the placeholder, and will create a number input
```
!age|19
```

Instead of providing placeholders, you could also manually specify the types

```
!age : number
```

This sets the type without specifying the placeholder. In some exceptional cases, you need both : 
```
!House Number|192 : string
```
Here, the house number placeholder is a number, which will cause forma to behave as if the input is always going to be a number. However, we want to allow for possibilies like `21A` etc., and therefore choose to make the house number a string instead. 

# The Forma Parser

The parser takes the code and returns a parse tree. The parse tree is an object with at least the following attributes: 
```
id : string,
type : string,
children : Further subtrees
```

To use the parser on a file, issue the filename as a second argument to script.js
```
node script.js <myFormaFile>.forma
```
The parse tree is by default saved in parsed.json, but can be customised in script.js

This parse tree is used by server.js to get some type metadata for the form. 

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
