let downbtn=document.querySelector(".download");
let upbtn=document.querySelector(".upload");

downbtn.addEventListener("click",(e)=>{
    let jsonData=JSON.stringify([sheetDb,graphMatrix]);
    let a = document.createElement("a");
    let file = new Blob([jsonData], { type: "application/json" });
    a.href = URL.createObjectURL(file);
    a.download = "SheetData";
    a.click();
})

upbtn.addEventListener("click", (e) => {
    // Opens file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let fr = new FileReader();
        let files = input.files;
        let fileObj = files[0];

        fr.readAsText(fileObj);
        fr.addEventListener("load", (e) => {
            let readSheetData = JSON.parse(fr.result);

            // Basic sheet with default data will be created
            sheetAddIcon.click();

            // SheetDB, graphComponent
            sheetDb = readSheetData[0];
            graphMatrix = readSheetData[1];

            collectedSheetDb[collectedSheetDb.length-1] = sheetDb;
            collectedGraphMatrix[collectedGraphMatrix.length-1] = graphMatrix;

            handleSheetProperties();
        })
    })
})