function promiseDelay() {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

async function isGraphCyclicPathTrace(graphMatrix,rid,cid) {
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
    let response=await dfsCyclicPathTrace(graphMatrix,rid,cid,vis,dfsvis);
    if(response==true){
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
}

async function dfsCyclicPathTrace(graphMatrix,srcr,srcc,vis,visdfs) {
    vis[srcr][srcc]=true;
    visdfs[srcr][srcc]=true;

    let cell=document.querySelector(`.cell[ rid="${srcr}" ][ cid="${srcc}" ] `);
    cell.style.backgroundColor="lightblue";
    await promiseDelay();

    for(let i=0;i<graphMatrix[srcr][srcc].length;i++){
        let [nrid,ncid]=graphMatrix[srcr][srcc][i];
        if(vis[nrid][ncid]==false){
            let iscycle= await dfsCyclicPathTrace(graphMatrix,nrid,ncid,vis,visdfs);
            if(iscycle){
                cell.style.backgroundColor="transparent";
                await promiseDelay();
                return Promise.resolve(true);
            }
        }else if(visdfs[nrid][ncid]==true){
             let tarcell=document.querySelector(`.cell[ rid="${nrid}" ][ cid="${ncid}" ] `);
             tarcell.style.backgroundColor="lightpink";
             await promiseDelay();
             tarcell.style.backgroundColor="transparent";
             await promiseDelay();
             cell.style.backgroundColor="transparent";
             return Promise.resolve(true);
        }
    }
    
    visdfs[srcr][srcc]=false;
    return Promise.resolve(false);
}