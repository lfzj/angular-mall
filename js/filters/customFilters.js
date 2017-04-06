/**
 *
 * 再创建一个新的模块，在这个模块中定义独立的/通用的过滤器
 */
angular.module("marsFilter", []);

// 在该模块中注册一个分页的过滤器
angular.module("marsFilter")
    .filter("pagerFilter", function () {

        return function (productList, pageNum, pageSize) {

            if (angular.isArray(productList) &&
                angular.isNumber(pageNum) && angular.isNumber(pageSize)) {

                var startIndex = (pageNum - 1) * pageSize;


                if (startIndex >= productList.length) {
                    return [];
                }

                // 从传进的数组中截取指定数量(pageSize)出来，并返回
                return productList.slice(startIndex, startIndex + pageSize);
            } else {
                return productList;
            }
        };
    })
    .filter("pageNavFilter",function(){
        return function (productList,pageSize){
            if(angular.isArray(productList) && angular.isNumber(pageSize)){
                // 计算页数
                var pageNumber = Math.ceil(productList.length/pageSize);      // 3

                // 声明一个新的数据，并返回
                var nav = [];
                for(var i=0;i<pageNumber;i++){
                    nav.push(i+1);    // nav => [1,2,3]
                }
                return nav;
            }else{
                return productList;
            }
        };
    });