const  environment = [
    ["A","X","R","R","R"],
    ["O","O","O","X","R"],
    ["O","O","O","B","R"]
]

// const  environment = [['A','X','R','R','R'],['O','O','O','X','B'],['O','O','O','O','R']]

function rewardShortPaths(env){
    let res = [];
    let i = 0; // up or down 
    let j = 0; // only right
    let visited = [];
    function getminpath(env,i,j,arr,direction='right',pathcount=0,rewardnum=0){
        if(!visited.includes(i+','+j)){
            visited.push(i+','+j);
        }
        
        if(env[i]==undefined){
            return;
        }
        if(env[i][j]==undefined){
            if(i-1>=0&&!visited.includes((i-1)+','+(j-1))){
                getminpath(env,i-1,j-1,arr,'up',pathcount,rewardnum);
            }
            if(i+1<=env.length-1&&!visited.includes((i+1)+','+(j-1))){
                getminpath(env,i+1,j-1,arr,'down',pathcount,rewardnum);
            }
            return;
        }
        if(env[i][j]=='B'){
            pathcount+=1;
            arr[arr.length] = rewardnum;
            arr[arr.length] = pathcount;
            res.push([arr.pop(),arr.pop()]);
            return;
        }
        if(env[i][j]=='O'||env[i][j]=='R'){
            // console.log(visited)
            // console.log(i+','+j);
            pathcount+=1;
        }
        if(env[i][j]=='R'){
            rewardnum+=1;
        }
        if(env[i][j]=='X'&&direction=='right'){
            if(i-1>=0){
                getminpath(env,i-1,j-1,arr,'up',pathcount,rewardnum);
            }
            if(i+1<=env.length-1){
                getminpath(env,i+1,j-1,arr,'down',pathcount,rewardnum);
            }
           
        }
        else if(env[i][j]=='X'&&direction=='up'){
            getminpath(env,i-1,j+1,arr,'right',pathcount,rewardnum);
            if(i<=env.length-1){
                getminpath(env,i,j,arr,'down',pathcount,rewardnum);
            }
           
        }
        else if(env[i][j]=='X'&&direction=='down'){
            if(i>=0){
                getminpath(env,i,j,arr,'up',pathcount,rewardnum);
            }
            getminpath(env,i+1,j+1,arr,'right',pathcount,rewardnum);
        }
        else{
            getminpath(env,i,j+1,arr,'right',pathcount,rewardnum);
        }
        
    }
    function findAllPaths(env){
        // order up right down
        const arr = []; 
        getminpath(env,i,j+1,arr);
    }
    function analysisPaths(arr){
        let min = Infinity;
        let minIndex = 0;
        arr.forEach((item,i)=>{
            if(item[0]<min){
                min = item[0];
                minIndex = i;
            }
            else if(item[0]==min){
                if(item[1]>arr[minIndex][1]){
                    min = item[0];
                    minIndex = i;
                }
            }
        });
        return arr[minIndex];
    }
    findAllPaths(env);
    return analysisPaths(res);
}

const res = rewardShortPaths(environment);
console.log(res);


