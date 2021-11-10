function sym1(A,B) {
  var C = []
  
  for(var i=0;i<A.length;i++){
    var count =0
    for(var j=0;j<B.length;j++){
      if(A[i] === B[j])
          count ++
    }
    if(count === 0){
      if(C.includes(A[i])){
        
      }else{
        C.push(A[i])
      }
        
    }
      
  }
  for(var i=0;i<B.length;i++){
    var count =0
    for(var j=0;j<A.length;j++){
      if(B[i] === A[j])
          count ++
    }
    if(count === 0)
      if(C.includes(B[i])){
        
      }else{
        C.push(B[i])
      }
  }
  C.sort()
  return C;
}

function sym(){
if(arguments.length === 2){
  console.log(sym1(arguments[0],arguments[1]))
}else{
  var D= sym1(arguments[0],arguments[1])
  for(var i=2;i<arguments.length;i++){
    D= sym1(D,arguments[i])
  }
  console.log(D)
}

}

sym([1, 2, 3], [5, 2, 1, 4])
sym([1, 2, 3, 3], [5, 2, 1, 4])
sym([1, 2, 3], [5, 2, 1, 4, 5])
sym([1, 2, 5], [2, 3, 5], [3, 4, 5])
sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5])
sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3])
sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1])


  
  console.log(sym([1, 2, 3,3], [5, 2, 1, 4,5]));