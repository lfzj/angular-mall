/**
 *
 * 定义结账数据绑定的控制器，我们把它也注册在主模块
 */
angular.module("myapp")
    .controller("checkoutCtrl",function($scope,myCart){
        $scope.cart = myCart.findAll();   // 获得购物车中所有的商品

        // 计算购买商品的总金额
        $scope.totalMoney = function(){
            var total = 0;
            angular.forEach($scope.cart,function(item){
                total += item.number * item.product.price;
            });
            return total;
        };

        // 删除商品的事件函数
        $scope.remove = function(item){
            myCart.remove(item.product.name);
        };
    });