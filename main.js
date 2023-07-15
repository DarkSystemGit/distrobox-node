const child_process = require("child_process");
const distroboxFunctions ={
    create: async(imageName,name)=>{
        if(!(name==null)){
            name = " -n "+name+" " 
        }else{
            name =" "
        }
        var images={
            ubuntu:"quay.io/toolbx-images/ubuntu-toolbox:22.04",
            arch:"quay.io/toolbx-images/archlinux-toolbox",
            alpine:"quay.io/toolbx-images/alpine-toolbox:3.17",
            opensuse:"registry.opensuse.org/opensuse/distrobox:latest",
            fedora:"registry.fedoraproject.org/fedora-toolbox:39",
            redhat:"registry.access.redhat.com/ubi9/ubi",
            rockyLinux:"quay.io/rockylinux/rockylinux:latest",
            debian:"docker.io/library/debian:testing",
            almalinux:"quay.io/almalinux/almalinux:9",
            amazonlinux:"public.ecr.aws/amazonlinux/amazonlinux:2022.0.20220531.0",
            void:"ghcr.io/void-linux/void-linux:latest-full-x86_64",
            deepin:"docker.io/linuxdeepin/beige",
            slackware:"docker.io/vbatts/slackware:14.2",
            clearlinux:"docker.io/library/clearlinux:latest",
            centos:"quay.io/centos/centos:7",
            centosstream:"quay.io/toolbx-images/centos-toolbox:stream9",
            gentoo:"docker.io/gentoo/stage3:latest",
            kali:"docker.io/kalilinux/kali-rolling:latest",
            mint:"docker.io/linuxmintd/mint21.1-amd64",
            opensuse:"registry.opensuse.org/opensuse/toolbox:latest"
        }
        var res = await runComm(`distrobox-create --root${name}-i ${images[imageName]} -Y`)
        return res
    },
    remove: async (name)=>{
        var res = await runComm(`distrobox-rm --root ${name} -Y`)
        return res
    }, 
    list:async ()=>{
        var res = await runComm(`distrobox-list --root`)
        return res
    },
    stop: async (name)=>{
        var res = await runComm(`distrobox-stop --root ${name}`)
        return res
    }, 
}
async function runComm(comm) {
    return new Promise((resolve, reject) => {
        child_process.exec(comm, (error, stdout, stderr) => {
            if (error) {
                reject(`error: ${error.message}`);
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