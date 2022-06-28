let graphMatrix=[];
let collectedGraphMatrix=[];
function isGraphCyclic(graphMatrix) {
    let vis=[];
    let dfsvis=[];
    for(let i=0;i<row;i++){
        let visrow=[];
        let dfsvisrow=[];
        for(let j=0;j<col;j++){
            visrow.push(false);
            dfsvisrow.push(false);
        }
        vis.push(visrow);
        dfsvis.push(dfsvisrow);
    }
    for(let i=0;i<row;i++){
        for(let j=0;j<col;j++){
            if(vis[i][j]==false){
                let flag=dfsCyclic(graphMatrix,i,j,vis,dfsvis);
                if(flag){
                    return true;
                }
            }
        }
    }
    return false;
}
function dfsCyclic(graphMatrix,srcr,srcc,vis,visdfs) {
    vis[srcr][srcc]=true;
    visdfs[srcr][srcc]=true;
    for(let i=0;i<graphMatrix[srcr][srcc].length;i++){
        let [nrid,ncid]=graphMatrix[srcr][srcc][i];
        if(vis[nrid][ncid]==false){
            let iscycle=dfsCyclic(graphMatrix,nrid,ncid,vis,visdfs);
            if(iscycle){
                return true;
            }
        }else if(visdfs[nrid][ncid]==true){
             return true;
        }
    }
    visdfs[srcr][srcc]=false;
    return false;
}

