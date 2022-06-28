allCells.forEach((cell)=>{
    cell.addEventListener("blur",(e)=>{
        let adress=adressBar.value;
        let[cell,cellProp]=activeCell(adress);
        let prevData=cellProp.value;
         if(prevData==cell.innerText){
             return;
         }
         cellProp.value=cell.innerText;
         removeChildFromParent(cellProp.formula);
         cellProp.formula="";
         updateChildrenCells(adress);
    })
})

formulaBar.addEventListener("keydown",async (e)=>{
    let inputFormula=formulaBar.value;
    if(e.key=="Enter" && inputFormula){
        let adress=adressBar.value;
        let [cell,cellProp]=activeCell(adress);

        if(cellProp.formula!=inputFormula){
            removeChildFromParent(cellProp.formula);
        }else{
            return;
        }

        addChildToGraphMatrix(inputFormula,adress);
        let isCylic=isGraphCyclic(graphMatrix);
        if(isCylic){
            let[rid,cid]=fromAdressToCidRid(adress);
            let response=confirm("Your Formula is Cyclic.Do You Want Trace The Path?");
            while(response==true){
                let res=await isGraphCyclicPathTrace(graphMatrix,rid,cid);
                response=confirm("Your Formula is Cyclic.Do You Want Trace The Path?");
            }
            removeChildFromGraphMatrix(inputFormula,adress);
            return;
        }
        let evaluatedValue=evaluate(inputFormula);
        setCellUIAndCellProp(evaluatedValue,inputFormula,adress);
        addChildToParent(inputFormula);
        updateChildrenCells(adress);
    }
})

function addChildToGraphMatrix(formula,childAdress){
    let[crid,ccid]=fromAdressToCidRid(childAdress);
    let encoded=formula.split(" ");
    for(let i=0;i<encoded.length;i++){
        let ascii=encoded[i].charCodeAt(0);
        if(ascii>=65 && ascii<=90){
            let [prid,pcid]=fromAdressToCidRid(encoded[i]);
            graphMatrix[prid][pcid].push([crid,ccid]);
        }
    }
}

function removeChildFromGraphMatrix(formula,childAdress) {
    let encoded=formula.split(" ");
    for(let i=0;i<encoded.length;i++){
        let ascii=encoded[i].charCodeAt(0);
        if(ascii>=65 && ascii<=90){
            let [prid,pcid]=fromAdressToCidRid(encoded[i]);
            graphMatrix[prid][pcid].pop();
        }
    }
}

function evaluate(formula) {
    let encoded= formula.split(" ");
    for(let i=0;i<encoded.length;i++){
        let ascii=encoded[i].charCodeAt(0);
        if(ascii>=65 && ascii<=90){
            let [cell,cellProp]=activeCell(encoded[i]);
            encoded[i]=cellProp.value;
        }
    }
    let decoded=encoded.join(" ");
    return eval(decoded);
}

function setCellUIAndCellProp(evalVal,formula,adress) {
    let [cell,cellProp]=activeCell(adress);
    cellProp.value=evalVal;
    cellProp.formula=formula;
    cell.innerText=evalVal;
}

function removeChildFromParent(formula) {
    let childAdress=adressBar.value;
    let encoded= formula.split(" ");
    for(let i=0;i<encoded.length;i++){
        let ascii=encoded[i].charCodeAt(0);
        if(ascii>=65 && ascii<=90){
            let [cell,cellProp]=activeCell(encoded[i]);
            let idx=cellProp.children.indexOf(childAdress);
            cellProp.children.splice(idx,1);
        }
    }
}

function addChildToParent(formula) {
    let childAdress=adressBar.value;
    let encoded= formula.split(" ");
    for(let i=0;i<encoded.length;i++){
        let ascii=encoded[i].charCodeAt(0);
        if(ascii>=65 && ascii<=90){
            let [cell,cellProp]=activeCell(encoded[i]);
            cellProp.children.push(childAdress);
        }
    }
}

 function updateChildrenCells(parentAdress) {
     let[parentCell,parentCellProp]=activeCell(parentAdress);
     let childAdress=parentCellProp.children;
     for(let i=0;i<childAdress.length;i++){
         let[cell,cellProp]=activeCell(childAdress[i]);
         let childFormula=cellProp.formula;

         let evaluatedValue=evaluate(childFormula);
         setCellUIAndCellProp(evaluatedValue,childFormula,childAdress[i]);
         updateChildrenCells(childAdress[i]);
     }
 }