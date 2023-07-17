# Distrobox-Node
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Tested-green?style=for-the-badge)


Distrobox API for Node.JS
> __Warning__ 
> The versions of this code published on npm may be untested. 
> There will be a badge on the top of the page to indicate this.

Distrobox must be installed on the system that  this package is being used on. 
# Usage
run `npm install distrobox-node` in your project
```js
const distrobox = require('distrobox-node')
// create a container (os,name,args), returns stdout
await distrobox.create('ubuntu','ubuntu')
//remove a container (name, args), returns stdout
await distrobox.remove('ubuntu')
//list all containers (args), returns a list of objects, containing information about each container
await distrobox.list()
//stop a container (name, args), returns stdout
await distrobox.stop('ubuntu')
//get a object with the names and images of all OSs supported by distrobox-node (usally the latest image)
distrobox.getImages()
```
Pretty simple, right?\
Your a smart developer so if you have any issues, just look at the code.\
You want more features? Roll your own code. (I don't really have time to do anything but maintain the code)\
You have a question?  If you can't find the answer in the code, post an issue and state in the title that its a question.   
If it's a bug, say it's a bug.  
Also, the `args` parameter is a object containing arguments that are passed to distrobox that looks like this, 
```js
{"R":"","force":""}
```
The keys being the argument name, and the values being the argument value.\
Simple.
