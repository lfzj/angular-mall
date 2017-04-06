/**
 * 声明一个主模块，作为程序的入口
 *
 * 所有和商品数据以及订单数据有关的内容，
 */
//添加对自定义的过滤器模块的依赖
var myapp = angular.module("myapp",["marsFilter","marsCart","ngRoute"]);

// 配置路由
myapp.config(function($routeProvider){
    $routeProvider.when("/productList",{
        templateUrl:"views/productList.html",
        controller:"productCtrl"}
    );
    $routeProvider.when("/checkout",{
        templateUrl:"views/checkoutSummary.html",
        controller:"checkoutCtrl"}
    );
    $routeProvider.when("/placeOrder",{
        templateUrl:"views/placeOrder.html"}
    );
    $routeProvider.when("/thankYou",{
        templateUrl:"views/thankYou.html"}
    );
    // 配置默认路由
    $routeProvider.otherwise({
        templateUrl:"views/productList.html",
        controller:"productCtrl"}
    );
});


myapp.controller("sportStoreCtrl",function($scope,$http,$location,myCart){
    $scope.data = {
        categories:[
            {id:"10001",category:"商品类别01"},
            {id:"10002",category:"商品类别02"},
            {id:"10003",category:"商品类别03"},
            {id:"10004",category:"商品类别04"}
        ],
        // 商品的明细
        products:[
            {name:"商品01",category:"商品类别01",price:100,desc:"2016流行新款",imgsrc:"images/TB1_50x50.jpg"},
            {name:"商品02",category:"商品类别01",price:120,desc:"2016流行新款",imgsrc:"images/TB2_50x50.jpg"},
            {name:"商品0301",category:"商品类别01",price:80,desc:"2016流行新款",imgsrc:"images/TB3_50x50.jpg"},
            {name:"商品0302",category:"商品类别01",price:85,desc:"2016流行新款",imgsrc:"images/TB4_50x50.jpg"},
            {name:"商品0303",category:"商品类别01",price:820,desc:"2016流行新款",imgsrc:"images/TB1_50x50.jpg"},
            {name:"商品04",category:"商品类别02",price:180,desc:"2016流行新款",imgsrc:"images/TB2_50x50.jpg"},
            {name:"商品05",category:"商品类别02",price:650,desc:"2016流行新款",imgsrc:"images/TB3_50x50.jpg"},
            {name:"商品06",category:"商品类别02",price:350,desc:"2016流行新款",imgsrc:"images/TB4_50x50.jpg"},
            {name:"商品07",category:"商品类别03",price:300,desc:"2016流行新款",imgsrc:"images/TB1_50x50.jpg"},
            {name:"商品08",category:"商品类别03",price:310,desc:"2016流行新款",imgsrc:"images/TB2_50x50.jpg"},
            {name:"商品09",category:"商品类别04",price:270,desc:"2016流行新款",imgsrc:"images/TB3_50x50.jpg"}
        ],
        // 收货人信息
        shipping:{}
    };

    // 响应发送订单的按钮事件
    $scope.sendOrder = function(){
        // 发送给服务器的数据包括：1)购物车中的商品;2)收货人信息
        var orderData = angular.copy($scope.data.shipping);
        orderData.cart = myCart.findAll();

        // 使用$http service将订单数据发送到服务器端
        $http.post("order.json",orderData)
        //$http.post("order2.json",orderData)
            .success(function(okData,status){
                // 保存返回的订单号(唯一)，并显示在thankYou页面
                $scope.data.shipping.orderId = okData.orderId;
                // 清空购物车
                myCart.clear();
            })
            .error(function(errData,status){
                // 保存失败的信息，并显示在thankYou页面
                $scope.data.shipping.errMsg = errData;
                $scope.data.shipping.errStatus = status;
            })
            .finally(function(){
                // 最后，不管提交订单成功与否，都是跳转到thank you页面
                $location.path("/thankYou");
            });
    };
});