let root = {
    name: "d10",
    children: [
        {
            name: "d20",
            children: [
                {
                    name: "d50",
                    children: []
                }, {
                    name: "d60",
                    children: []
                }
            ]
        },
        {
            name: "d30",
            children: [
                {
                    name: "d70",
                    children: []
                }, {
                    name: "d80",
                    children: [
                        {
                            name: "d100",
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            name: "d40",
            children: [
                {
                    name: "d90",
                    children: []
                }
            ]
        }]
}

function displaytree(node){
    let menmychild=node.name +"=>";
    for(let i=0;i<node.children.length;i++){
        let child=node.children[i];
        menmychild+=child.name+",";
           
    }
    console.log(menmychild);

    for(let i=0;i<node.children.length;i++){
        let child =node.children[i];
        displaytree(child);
    }
}
displaytree(root);