let fs =require("fs");
let p = require("path") ;
let input =process.argv.slice(2);
let path = input[0];

function isFileornot(dirpath){
    return fs.lstatSync(dirpath).isFile();
}

function getContent(dirpath){
    return fs.readdirSync(dirpath);

}

function viewFlat(dirpath){
    let isFile =isFileornot(dirpath);
    if(isFile==true){
        console.log(dirpath +"*");

    }else{
        console.log(dirpath);
        let content = getContent(dirpath);
        //console.log(content);

        for(let i=0;i<content.length;i++){
            let childpath =p.join(dirpath,content[i]);
            viewFlat(childpath);

        }

    }
}

function viewTree(dirpath,indent){
    let isFile = isFileornot(dirpath);
    if(isFile ==true){
        let stArr = dirpath.split("\\");
        let toPrint = stArr.pop();
        console.log(indent,toPrint+ "*");
    }else {
        let stArr =dirpath.split("\\");
        let toPrint = stArr.pop();
        console.log(indent,toPrint);

        let content = getContent(dirpath);

        for(let i=0 ;i<content.length;i++){
            let childPath = dirpath +"\\" + content[i];
            viewTree(childPath, indent +"\t");
        }
    }
}
viewTree(path,"");
viewFlat(path);

