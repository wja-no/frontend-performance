var lib2 = function sum_to(n){
    if(n == 1) return 1;
    else return n*n - sum_to(n-1);
}
