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
    function getminpath(env,i,j,arr,direction='right',pathcount=0,rewardnum=0){ // find next point could pass, if not ,go back
        if(!visited.includes(i+','+j)){ // record visited point
            visited.push(i+','+j);
        }
        
        if(env[i]==undefined){ // row out of range
            return;
        }
        if(env[i][j]==undefined){ // col at right out of range
            if(i-1>=0&&!visited.includes((i-1)+','+(j-1))){
                getminpath(env,i-1,j-1,arr,'up',pathcount,rewardnum);
            }
            if(i+1<=env.length-1&&!visited.includes((i+1)+','+(j-1))){
                getminpath(env,i+1,j-1,arr,'down',pathcount,rewardnum);
            }
            return;
        }
        if(env[i][j]=='B'){ // point value is 'B' and record reward number and path steps number
            pathcount+=1;
            arr[arr.length] = rewardnum;
            arr[arr.length] = pathcount;
            res.push([arr.pop(),arr.pop()]);
            return;
        }
        if(env[i][j]=='O'||env[i][j]=='R'){ // count path step number
            // console.log(visited)
            // console.log(i+','+j);
            pathcount+=1;
        }
        if(env[i][j]=='R'){ // count reward number 
            rewardnum+=1;
        }
        if(env[i][j]=='X'&&direction=='right'){ // point value is 'X' and moving direction is 'right' go back a step and point moving right go up or down
            if(i-1>=0){
                getminpath(env,i-1,j-1,arr,'up',pathcount,rewardnum);
            }
            if(i+1<=env.length-1){
                getminpath(env,i+1,j-1,arr,'down',pathcount,rewardnum);
            }
           
        }
        else if(env[i][j]=='X'&&direction=='up'){ // point value is 'X' and moving direction is 'up' go back a step and point moving right go right or down
            getminpath(env,i-1,j+1,arr,'right',pathcount,rewardnum);
            if(i<=env.length-1){
                getminpath(env,i,j,arr,'down',pathcount,rewardnum);
            }
           
        }
        else if(env[i][j]=='X'&&direction=='down'){ // point value is 'X' and moving direction is 'down' go back a step and point moving right go right or up
            if(i>=0){
                getminpath(env,i,j,arr,'up',pathcount,rewardnum);
            }
            getminpath(env,i+1,j+1,arr,'right',pathcount,rewardnum);
        }
        else{ // defalut go right always
            getminpath(env,i,j+1,arr,'right',pathcount,rewardnum);
        }
        
    }
    function findAllPaths(env){ // find all paths like [7,3] save in a array as [[7,3],[7,1]]
        // order up right down
        const arr = []; 
        getminpath(env,i,j+1,arr);
    }
    function analysisPaths(arr){ // analysis paths and find a correct result like [7,3]
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
    return analysisPaths(res); // return [7,3]
}

const res = rewardShortPaths(environment);
console.log(res);


