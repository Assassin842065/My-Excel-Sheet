let activeSheetColor  ="#ced6e0";
let sheetFolderCont=document.querySelector(".sheet-folder-container");
let sheetAddIcon=document.querySelector(".sheet-add-icon");
sheetAddIcon.addEventListener("click",(e)=>{
    let sheet=document.createElement("div");
    sheet.setAttribute("class","sheet-folder");

    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id", allSheetFolders.length);

    sheet.innerHTML = `
        <div class="sheet-content">Sheet ${allSheetFolders.length + 1}</div>
    `;
    sheetFolderCont.appendChild(sheet);
    sheet.scrollIntoView();
    
    createSheetDb();
    createGraphMatrix();
    handleSheetActiveness(sheet);
    handleRemoval(sheet);
    sheet.click();
})

function handleRemoval(sheet) {
    sheet.addEventListener("mousedown",(e)=>{
        if(e.button!=2){
            return;
        }
        let allfolders=document.querySelectorAll(".sheet-folder");
        if(allfolders.length==1){
            alert("You need to have atleast one sheet!!");
            return;
        }
        let response=confirm("Do you really want to delete this sheet permanently?");
        if(response==false){
            return;
        }

        let sheetIdx=Number(sheet.getAttribute("id"));
        collectedSheetDb.splice(sheetIdx,1);
        collectedGraphMatrix.splice(sheetIdx,1);
        handleUIRemoval(sheet);

        sheetDb=collectedSheetDb[0];
        graphMatrix=collectedGraphMatrix[0];
        handleSheetProperties();
    })
}

function handleUIRemoval(sheet) {
    sheet.remove();
    let allFolder=document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allFolder.length;i++){
        allFolder[i].setAttribute("id",i);
        let sheetContent=allFolder[i].querySelector(".sheet-content");
        sheetContent.innerText=`Sheet-${i+1}`;
    }
    allFolder[0].style.backgroundColor=activeSheetColor;
}

function handleSheetDb(sheetIdx) {
    sheetDb=collectedSheetDb[sheetIdx];
    graphMatrix=collectedGraphMatrix[sheetIdx];
}

function handleSheetActiveness(sheet) {
    sheet.addEventListener("click",(e)=>{
        let sheetIdx=Number(sheet.getAttribute("id"));
        handleSheetDb(sheetIdx);
        handleSheetProperties();
        handleSheetUI(sheet);
    })
}

function handleSheetUI(sheet) {
    allFolder=document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allFolder.length;i++){
        allFolder[i].style.backgroundColor="transparent";
    }
    sheet.style.backgroundColor=activeSheetColor;
}

function handleSheetProperties() {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }
    }
    // By default click on first cell via DOM
    let firstCell = document.querySelector(".cell");
    firstCell.click();
}

function createSheetDb() {
    let sheetDb=[];
   for(let i=0;i<row;i++){
     let sheetRow=[];
     for(let j=0;j<col;j++){
      let cellProp={
        bold: false,
        italic: false,
        underlined: false,
        alignment: "left",
        fontFamily: "monospace",
        fontSize: "14",
        fontColor: "#000000",
        BGcolor: "#FFFFFF",
        value: "",
        formula: "",
        children: [],
      }
      sheetRow.push(cellProp);
    }
    sheetDb.push(sheetRow);
   }
   collectedSheetDb.push(sheetDb);
}

function createGraphMatrix() {
    let graphMatrix=[];
    for(let i=0;i<row;i++){
       let rowMat=[];
       for(let j=0;j<col;j++){
          rowMat.push([]);
       }
       graphMatrix.push(rowMat);
    }
    collectedGraphMatrix.push(graphMatrix);
}