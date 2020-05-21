//容易造成困惑的情况
// for (var i = 1; i <= 5; i++) {

//     setTimeout(function timer() {
//         console.log(i);
//     }, i * 1000);

// }
//解决办法两种，第一种使用闭包
for (var i = 1; i <= 5; i++) {
    (function (j) {
        setTimeout(function timer() {
            console.log(j);
        }, j * 1000);
    })(i);
}
// 第二种就是使用 setTimeout 的第三个参数，第三个参数作为setTimeout内部函数的参数
// for ( var i=1; i<=5; i++) {
// setTimeout( function timer(j) {
// console.log( j );
// }, i*1000, i);
// }
// 第三种就是使用 let 定义 i 了
for ( let i=1; i<=5; i++) {
setTimeout( function timer() {
console.log( i );
}, i*1000 );
}
