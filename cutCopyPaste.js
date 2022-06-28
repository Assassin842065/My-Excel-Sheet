let copybtn=document.querySelector(".copy");
let cutbtn=document.querySelector(".cut");
let pastebtn=document.querySelector(".paste");
let ctrl;
document.addEventListener("keydown",(e)=>{
    ctrl=e.ctrlKey;
})
document.addEventListener("keyup",(e)=>{
    ctrl=e.ctrlKey;
})

for(let i=0;i<row ;i++){
    for(let j=0; j<col ;j++){
        let cell=document.querySelector(`.cell[ rid="${i}" ][ cid="${j}" ] `);
        handleRange(cell);
    }
}

let rangeStorage=[];
function handleRange(cell) {
    cell.addEventListener("click",(e)=>{
        if(!ctrl) return;

        if(rangeStorage.length>=2){
           cellsDefaultUI(rangeStorage);
           rangeStorage=[];
        }

        let rid=cell.getAttribute("rid");
        let cid=cell.getAttribute("cid");
        cell.style.border="2px solid #218c74";
        rangeStorage.push([rid,cid]);
    })
}

function cellsDefaultUI(rangeStorage) {
    for(let i=0;i<rangeStorage.length;i++){
        let [rid,cid]=rangeStorage[i];
        let cell=document.querySelector(`.cell[ rid="${rid}" ][ cid="${cid}" ] `);
        cell.style.border="1px solid #dfe4ea";
    }
}

let copyDb=[];
copybtn.addEventListener("click",(e)=>{
    if(rangeStorage.length<2){
        return;
    }
    copyDb=[];
    let [strow,stcol,endrow,endcol]=[rangeStorage[0][0],rangeStorage[0][1],rangeStorage[1][0],rangeStorage[1][1]];
    for(let i=strow;i<=endrow;i++){
        let rowdb=[];
        for(let j=stcol;j<=endcol;j++){
            rowdb.push(sheetDb[i][j]);
        }
        copyDb.push(rowdb);
    }
    cellsDefaultUI(rangeStorage);
    rangeStorage=[];
})

cutbtn.addEventListener("click",(e)=>{
    if(rangeStorage.length<2){
        return;
    }

    let [strow,stcol,endrow,endcol]=[rangeStorage[0][0],rangeStorage[0][1],rangeStorage[1][0],rangeStorage[1][1]];
    for(let i=strow;i<=endrow;i++){
        for(let j=stcol;j<=endcol;j++){
            let cell=document.querySelector(`.cell[ rid="${i}" ][ cid="${j}" ] `);
            let cellProp=sheetDb[i][j];

            cellProp.value = "";
            cellProp.bold = false;
            cellProp.italic = false;
            cellProp.underlined= false;
            cellProp.fontSize="14";
            cellProp.fontFamily="monospace";
            cellProp.fontColor="#000000";
            cellProp.BGcolor = "#FFFFFF";
            cellProp.alignment = "left";
            cellProp.formula="";
            cellProp.children=[];

            cell.click();
        }
    }
    cellsDefaultUI(rangeStorage);
    rangeStorage=[];
})

pastebtn.addEventListener("click",(e)=>{
    if(copyDb.length==0){
        return;
    }
    let rowdiff=copyDb.length;
    let coldiff=copyDb[0].length;

    let adress=adressBar.value;
    let [rid,cid]=fromAdressToCidRid(adress);
    for(let i=rid,r=0;i<rid+rowdiff;i++,r++){
        for(let j=cid,c=0;j<cid+coldiff;j++,c++){
            let cell=document.querySelector(`.cell[ rid="${i}" ][ cid="${j}" ] `);
            if(!cell){
                continue;
            }
            let copyProp=copyDb[r][c];
            let cellProp=sheetDb[i][j];

            cellProp.value=copyProp.value;
            cellProp.bold=copyProp.bold;
            cellProp.italic=copyProp.italic;
            cellProp.underlined=copyProp.underlined;
            cellProp.alignment=copyProp.alignment;
            cellProp.fontFamily=copyProp.fontFamily;
            cellProp.fontSize=copyProp.fontSize;
            cellProp.fontColor=copyProp.fontColor;
            cellProp.BGcolor=copyProp.BGcolor;

            cell.click();
        }
    }
})
