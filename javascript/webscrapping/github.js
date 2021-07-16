//TODO npm init -y
//TODO install request 
//TODO install cheerio
const PDFDocument = require('pdfkit');
let request = require("request")
let cheerio = require("cheerio")
let fs = require("fs")
let path = require("path")
console.log("Before");
let url = "https://github.com/topics/" 
request(url ,cb) ;
function cb(error ,response ,html){
    if(error){
        console.log("error")
    }else{
        extracthtml(html) ;
    }
}
function extracthtml(html){
    //NOTE load html file 
    let selTool =  cheerio.load(html);
    let box = selTool(".col-12.col-sm-6.col-md-4.mb-4");
    let tname   = selTool(box).find(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1") ;
    let tlink = selTool(box).find(".no-underline.d-flex.flex-column.flex-justify-center")  ;
    for(let i = 0 ; i < box.length ; i++){
       // let name = selTool(tname[i]).text() ;
        let link = selTool(tlink[i]).attr("href") ;
        let full_link = "https://github.com" + link ;
        //console.log(name)
        // console.log(fulllink)
        repositery(full_link) ;
    }


}
function repositery(full_link){
    request(full_link ,cb) ;
    function cb(error ,response , html) {
        if(error){
            console.log("error");
        }else{
            repolinkName(html) ;
        }
    }
}
function repolinkName(html){
    let selTool =  cheerio.load(html);
    let repobox = selTool(".px-3 .text-bold ");
    //NOTE fetch name 
    
    let name = selTool(".h1-mktg").text().trim();
    console.log(name);
    dirCreator(name);
    for(let i = 0 ; i < 8 ; i++){
        let repolink = selTool(repobox[i]).attr("href");
        let fullissuelink = "https://github.com" + repolink + "/issues";
        console.log(fullissuelink);
        
        let filename = repolink.split("/").pop();
        //fileCreater(name, filename);
        getissuelink(fullissuelink, name, filename);
    }

}

function getissuelink(fullissuelink, name, filename) {
    request(fullissuelink, cb);
    function cb(err, response, html) {
        if (err) {
            console.log('Errror');
        } else {
            extractIssue(html, name, filename);
        }
    }
}

function extractIssue(html, name, filename) {
    let selTool = cheerio.load(html);
    let anchorsArr = selTool("a[data-hovercard-type='issue']");
    let arr = [];
    for (let i = 0; i < anchorsArr.length; i++){
        let tname = selTool(anchorsArr[i]).text();
        let tlink = selTool(anchorsArr[i]).attr("href");
        arr.push({
            Name: tname,
            Link: "https://github.com" + tlink
        })
    }

    // array to pdf  
    let filepath = path.join(__dirname, name, filename + ".pdf");
    let pdfDoc = new PDFDocument;
    pdfDoc.pipe(fs.createWriteStream(filepath));
    pdfDoc.text(JSON.stringify(arr));
    pdfDoc.end();
}
// create directory folder 
function dirCreator(name) {
    let folderpath = path.join(__dirname, name);
    if (fs.existsSync(folderpath) == false) {
        fs.mkdirSync(folderpath)
    }

}
// create json file 
function fileCreater(name, filename) {
    let filepath = path.join(__dirname, name, filename + ".json");
    if (fs.existsSync(filepath) == false) {
        fs.openSync(filepath ,"w")
    }
}

console.log("After");