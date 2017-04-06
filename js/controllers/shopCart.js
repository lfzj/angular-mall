/**
 * 最常用的是工厂方法factory。
 */
angular.module("marsCart",[])
    .factory("myCart",function(){
        // 声明一个数组，保存购买的商品项-充当购物车的购物筐
        var cart = [];

        return{
            // 添加商品到购物车的方法
            add:function(product){
                for(var i=0;i<cart.length;i++){
                    var item = cart[i];
                    // 判断购物车中是否已经有了该商品
                    if(item.product.name == product.name){
                        // 说明购物车中已经有了该商品，将该商品的购买数量+1
                        item.number++;
                        return; // 添加商品过程结束
                    }
                }

                // 如果代码执行到这里，说明购物车中没有要添加的商品
                cart.push({product:product,number:1});
            },
            // 从购物车中删除某种商品的方法
            remove:function(name){
                // 遍历购物筐，找到要删除的商品
                for(var i=0;i<cart.length;i++){
                    var item = cart[i];
                    // 判断购物车中是否已经有了该商品
                    if(item.product.name == name){

                        cart.splice(i,1);
                        return; // 结束
                    }
                }
            },
            // 获得购物车中所有商品的方法
            findAll:function(){
                return cart;
            },
            // 清空购物车
            clear:function(){
                cart.length = 0;
            }
        };
    })
    // 依赖注入购物车
    .controller("cartCtrl",function($scope,myCart){
        var cart = myCart.findAll();
        // 计算购物车中商品的总数量
        $scope.count = function(){
            var total = 0;
            angular.forEach(cart,function(item){
                total += item.number;
            });
            return total;
        };
        // 计算购物车中商品的总金额
        $scope.money = function(){
            var total = 0;
            angular.forEach(cart,function(item){
                total += item.number * item.product.price;
            });
            return total;
        };
    });