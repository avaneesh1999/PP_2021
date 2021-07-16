// let filepath=["54720.jpg"];

// let pic =document.getElementsByTagName("img");

// for(let i=0;i<pic.length;i++){
//     let r = Math.floor(Math.random() * filepath.length);
//     let file = filepath[r];
//     let url = chrome.extension.getURL(file);
//     imgElt.src = url;
//     console.log(url);


// }

let filenames = [
    'vinu.jpg'
  ];
  
  let imgs = document.getElementsByTagName('img');
  
  for (let imgElt of imgs) {
    let r = Math.floor(Math.random() * filenames.length);
    let file = 'kittens/' + filenames[r];
    let url = chrome.extension.getURL(file);
    imgElt.src = url;
    console.log(url);
  }
