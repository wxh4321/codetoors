environment = [
    ['A','X','R','R','R'],
    ['O','O','O','X','B'],
    ['O','O','O','O','R']
]

# environment = [['A','X','R','R','R'],['O','O','O','X','R'],['O','O','O','B','R']]

def rewardShortPaths(env):
    res = []
    i = 0 # up or down
    j = 0 # only right
    visited = []
    def getminpath(env,i,j,arr,direction='right',pathcount=0,rewardnum=0): # find next point could pass, if not ,go back
        if str(i)+','+str(j) not in visited: #record visited point
            visited.append(str(i)+','+str(j))

        if i >= len(env) or i < 0: # row out of range
            return
        if j >= len(env[0]) or j < 0: # col at right out of range
            if i - 1 >= 0 and str(i-1)+','+str(j-1) not in visited:
                getminpath(env, i - 1, j - 1, arr, 'up', pathcount, rewardnum)
            if i+1 <= len(env)-1 and str(i+1)+','+str(j-1) not in visited:
                getminpath(env, i + 1, j - 1, arr, 'down', pathcount, rewardnum)
            return

        if env[i][j] == 'B': # point value is 'B' and record reward number and path steps number
            pathcount = pathcount+1
            arr.append(rewardnum)
            arr.append(pathcount)
            res.append([arr.pop(), arr.pop()])
            return

        if env[i][j] == 'O' or env[i][j] == 'R': # count path step number
            pathcount = pathcount + 1

        if env[i][j]=='R': # count reward number 
            rewardnum = rewardnum + 1
        if env[i][j] == 'X' and direction == 'right': # point value is 'X' and moving direction is 'right' go back a step and point moving right go up or down
            if i-1>=0 :
                getminpath(env, i - 1, j - 1, arr, 'up', pathcount, rewardnum)
            if i+1<=len(env)-1:
                getminpath(env, i + 1, j - 1, arr, 'down', pathcount, rewardnum)

        elif env[i][j] == 'X' and direction == 'up': # point value is 'X' and moving direction is 'up' go back a step and point moving right go right or down
            getminpath(env, i - 1, j + 1, arr, 'right', pathcount, rewardnum)
            if i <= len(env) - 1:
                getminpath(env, i, j, arr, 'down', pathcount, rewardnum)
        elif env[i][j]=='X'and direction=='down': # point value is 'X' and moving direction is 'down' go back a step and point moving right go right or up
            if i >= 0:
                getminpath(env, i, j, arr, 'up', pathcount, rewardnum)
            getminpath(env, i + 1, j + 1, arr, 'right', pathcount, rewardnum)
        else: # defalut go right always
            getminpath(env, i, j + 1, arr, 'right', pathcount, rewardnum)


    def findAllPaths(env): # find all paths like [7,3] save in a array as [[7,3],[7,1]]
        arr = []
        getminpath(env, i, j + 1, arr)

    def analysisPaths(arr): # analysis paths and find a correct result like [7,3]
        min = float("inf")
        minIndex = 0
        for i in range(0,len(arr)):
            if arr[i][0]<min:
                min = arr[i][0]
                minIndex = i
            elif arr[i][0] == min:
                if arr[i][1]>arr[minIndex][1]:
                    min = arr[i][0]
                    minIndex = i

        return (arr[minIndex][0],arr[minIndex][1])

    findAllPaths(env)
    return analysisPaths(res) # return [7,3]

res = rewardShortPaths(environment)
print(res)


