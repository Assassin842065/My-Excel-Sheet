let row=100;
let col=26;
let colAdressCont=document.querySelector(".col-adress-container");
let adressBar=document.querySelector(".adress-bar");
for(let i=0;i<row;i++){
    let coladress=document.createElement("div");
    coladress.setAttribute("class","col-adress");
    coladress.innerText=(i+1);
    colAdressCont.appendChild(coladress);
}
let cellCont=document.querySelector(".cell-container");
let rowAdressCont=document.querySelector(".row-adress-container");
for(let i=0;i<col;i++){
    let rowadress=document.createElement("div");
    rowadress.setAttribute("class","row-adress");
    rowadress.innerText=String.fromCharCode(65+i);
    rowAdressCont.appendChild(rowadress);
}
for(let i=0;i<row;i++){
    let cellrow=document.createElement("div");
    cellrow.setAttribute("class","cell-row");
    for(let j=0;j<col;j++){
        let cell=document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("contentEditable","true");
        cell.setAttribute("spellcheck","false");
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        cellrow.appendChild(cell);
        adressDisplay(cell,i,j);
    }
    cellCont.appendChild(cellrow);
}

function adressDisplay(cell,rid,cid) {
    cell.addEventListener("click",(e)=>{
        let row=(rid+1);
        let col=String.fromCharCode(65+cid);
        adressBar.value=`${col}${row}`;
    })
}
