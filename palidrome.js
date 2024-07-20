function solve(str){
    let left = 0;
    let right = str.length - 1;
    while(left < right){
        if(str.charAt(left) !== str.charAt(right)){
            return false;
        }
        left++;
        right--;
    }
    return true;
}

let str = "malayalam";
console.log(solve(str));