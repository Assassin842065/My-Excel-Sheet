let collectedSheetDb = [];  //Contains all SheetDB
let sheetDb = [];

{
    let addSheetBtn = document.querySelector(".sheet-add-icon");
    addSheetBtn.click();
}

// Selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underlined");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color");
let BGcolor = document.querySelector(".BG-color");
let alignment = document.querySelectorAll(".alignment");
let formulaBar=document.querySelector(".formula-bar");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

// Application of two-way binding
// Attach property listeners
bold.addEventListener("click", (e) => {
    let adress = adressBar.value;
    let [cell, cellProp] = activeCell(adress);

    // Modification
    cellProp.bold = !cellProp.bold; // Data change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // UI change (1)
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp; // UI change (2)
})
italic.addEventListener("click", (e) => {
    let adress = adressBar.value;
    let [cell, cellProp] = activeCell(adress);

    // Modification
    cellProp.italic = !cellProp.italic; // Data change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; // UI change (1)
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp; // UI change (2)
})
underline.addEventListener("click", (e) => {
    let adress = adressBar.value;
    let [cell, cellProp] = activeCell(adress);

    // Modification
    cellProp.underline = !cellProp.underline; // Data change
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; // UI change (1)
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp; // UI change (2)
})
fontSize.addEventListener("change", (e) => {
    let adress = adressBar.value;
    let [cell, cellProp] = activeCell(adress);

    cellProp.fontSize = fontSize.value; // Data change
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})
fontFamily.addEventListener("change", (e) => {
    let adress = adressBar.value;
    let [cell, cellProp] = activeCell(adress);

    cellProp.fontFamily = fontFamily.value; // Data change
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})
fontColor.addEventListener("change", (e) => {
    let adress = adressBar.value;
    let [cell, cellProp] = activeCell(adress);

    cellProp.fontColor = fontColor.value; // Data change
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})
BGcolor.addEventListener("change", (e) => {
    let adress = adressBar.value;
    let [cell, cellProp] = activeCell(adress);

    cellProp.BGcolor = BGcolor.value; // Data change
    cell.style.backgroundColor = cellProp.BGcolor;
    BGcolor.value = cellProp.BGcolor;
})
alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e) => {
        let adress = adressBar.value;
        let [cell, cellProp] = activeCell(adress);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue; // Data change
        cell.style.textAlign = cellProp.alignment; // UI change (1)

        switch(alignValue) { // UI change (2)
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }

    })
})



let allCells = document.querySelectorAll(".cell");
for (let i = 0;i < allCells.length;i++) {
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell) {
    // Work
    cell.addEventListener("click", (e) => {
        let adress = adressBar.value;
        let [rid, cid] = fromAdressToCidRid(adress);
        let cellProp = sheetDb[rid][cid];

        // Apply cell Properties
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor === "#000000" ? "transparent" : cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignment;
                

        // Apply properties UI Props container
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontColor.value = cellProp.fontColor;
        BGcolor.value = cellProp.BGcolor;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        switch(cellProp.alignment) { // UI change (2)
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }

        let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;
    })
}

function activeCell(adress) {
    let [rid, cid] = fromAdressToCidRid(adress);
    // Access cell & storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDb[rid][cid];
    return [cell, cellProp];
}

function fromAdressToCidRid(adress) {
    let rid = Number(adress.slice(1) - 1); // "1" -> 0
    let cid = Number(adress.charCodeAt(0)) - 65; // "A" -> 65
    return [rid, cid];
}