

//        var fb=function(x,y,z){
//            if(x==0&&y==0){
//                z=z+"complete";
//                console.log(z);
//            }
//            else if(x>0&&y==0){
//               fb(x-1,y,z+"右")
//            }
//            else if(x==0&&y>0){
//                fb(x,y-1,z+"上")
//             }
//             else {
//                fb(x,y-1,z+"上")
//                fb(x-1,y,z+"右")
//             }  
            
//        }


// console.log(fb(3,2,''))



var arr=[];
       var fb=function(x,y,z){
           if(x==0&&y==0){
               z=z+"complete";
               arr.push(z);
           }
           else if(x>0&&y==0){
              fb(x-1,y,z+"右")
           }
           else if(x==0&&y>0){
               fb(x,y-1,z+"上")
            }
            else {
               fb(x,y-1,z+"上")
               fb(x-1,y,z+"右")
            }  
            return arr
       }


console.log(fb(22,11,''))