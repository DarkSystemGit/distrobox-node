# Distrobox-Node
Distrobox API for Node.JS 
# Usage
run `npm install distrobox-node` in your project
```js
var distrobox = require('distrobox-node')
// create a container (os,name,args)
distrobox.create('ubuntu','ubuntu')
//remove a container (name, args)
distrobox.remove('ubuntu')
//list all containers (args), returns a list of objects, containing information about each container
distrobox.list()
//stop a container (name, args)
distrobox.stop('ubuntu')    
```
Pretty simple, right?\
Your a smart developer so if you have any issues, just look at the code.\
You want more features? Roll your own code. (I don't really have time to do anything but maintain the code)\
You have a question? If you can't find the answer in the code, post an issue and state in the title that its a question.\ 
If its a bug, say it's a bug.\
Also, the `args` parameter is a object containing arguments that are passed to distrobox that looks like this, 
```js
{"R":"","force":""}
```
The keys being the argument name, and the values being the argument value.\
Simple.
