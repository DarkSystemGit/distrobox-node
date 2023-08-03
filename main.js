const child_process = require("child_process");
var images = {
    ubuntu: "quay.io/toolbx-images/ubuntu-toolbox:22.04",
    arch: "quay.io/toolbx-images/archlinux-toolbox",
    alpine: "quay.io/toolbx-images/alpine-toolbox:3.17",
    opensuse: "registry.opensuse.org/opensuse/distrobox:latest",
    fedora: "registry.fedoraproject.org/fedora-toolbox:39",
    redhat: "registry.access.redhat.com/ubi9/ubi",
    rockyLinux: "quay.io/rockylinux/rockylinux:latest",
    debian: "docker.io/library/debian:testing",
    almalinux: "quay.io/almalinux/almalinux:9",
    amazonlinux: "public.ecr.aws/amazonlinux/amazonlinux:2022.0.20220531.0",
    void: "ghcr.io/void-linux/void-linux:latest-full-x86_64",
    deepin: "docker.io/linuxdeepin/beige",
    slackware: "docker.io/vbatts/slackware:14.2",
    clearlinux: "docker.io/library/clearlinux:latest",
    centos: "quay.io/centos/centos:7",
    centosstream: "quay.io/toolbx-images/centos-toolbox:stream9",
    gentoo: "docker.io/gentoo/stage3:latest",
    kali: "docker.io/kalilinux/kali-rolling:latest",
    mint: "docker.io/linuxmintd/mint21.1-amd64",
    opensuse: "registry.opensuse.org/opensuse/toolbox:latest"
}
const distroboxFunctions = {
    create: async (os, name, args) => {
        try {
            var imageName = os
            if (!(name == null)) {
                name = " -n " + name + " "
            } else {
                name = " "
            }
            var args = parseArgs(args)
            var root = "--root"
            if (args.includes("--no-root")) {
                root = ""
                args.replace("--no-root", "")
            }
            var res = await runComm(`distrobox-create ${root} --name ${name} -i ${images[imageName]} -Y ${args}`)
            return res
        } catch {
            throw new Error('Error while creating container')
        }
    },
    remove: async (name, args) => {
        try {
            var args = parseArgs(args)
            var root = "--root"
            if (args.includes("--no-root")) {
                root = ""
                args.replace("--no-root", "")
            }
            var res = await runComm(`distrobox-rm ${root} ${name} -Y ${args}`)
            return res
        } catch {
            throw new Error('Error while removing container')
        }
    },
    list: async (args) => {
        try {
            var args = parseArgs(args)
            var root = "--root"
            if (args.includes("--no-root")) {
                root = ""
                args.replace("--no-root", "")
            }
            var list = await runComm(`distrobox-list ${root} --no-color ${args}`)
            list = list.split('\n')

            var listObj = { keys: [], values: [] }
            for (var i = 0; i < list.length - 1; i++) {
                var line = list[i].split('|')

                if (i == 0) {
                    listObj.keys = line
                } else {

                    var obj = {}
                    line.forEach((val, index) => {

                        obj[listObj.keys[index].toLowerCase().replaceAll(' ', '')] = val.trim()
                    })
                    listObj.values.push(obj)
                }
            }
            return listObj.values
        } catch {
            throw new Error('Error while listing containers')
        }

    },
    stop: async (name, args) => {
        try {
            var args = parseArgs(args)
            var root = "--root"
            if (args.includes("--no-root")) {
                root = ""
                args.replace("--no-root", "")
            }
            var res = await runComm(`distrobox-stop ${root} --name ${name} -Y ${args}`)
            return res
        } catch {
            throw new Error(`Error while stopping container ${name}`)
        }
    },
    exec: async (name, cmd, args) => {
        try {
            var args = parseArgs(args)
            var root = "--root"
            if(args.includes("--no-root")){
                root = ""
                args.replace("--no-root","")
            }
            var res = await runComm(`distrobox-enter ${root} --name ${name} ${args} -- ${cmd}`)
            return res
        } catch {
            throw new Error(`Error while running command in container ${name}`)
        }
    },
    getImages: async () => {
        try {
            return images
        } catch {
            throw new Error('Error while getting container images')
        }
    }
}
function parseArgs(args) {
    var shorthand = {}
    var fullArg = {}
    var res = ""
    try {
        var argsKeys = Object.keys(args)
        argsKeys.forEach(arg => {
            if (arg.length == '0') {
                shorthand[arg] = args[arg]
            } else {
                fullArg[arg] = args[arg]
            }
        });
        Object.keys(shorthand).forEach(arg => {
            res = `${res} -${arg} ${shorthand[arg]}`
        })
        Object.keys(fullArg).forEach(arg => {
            res = `${res} --${arg} ${fullArg[arg]}`
        })
    } catch {
        return ""
    }

    return res
}
async function runComm(comm) {
    return new Promise((resolve, reject) => {
        child_process.exec(comm, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                resolve(`${stderr}`);
                return;
            }
            resolve(stdout)
        });
    })
}
module.exports = distroboxFunctions
