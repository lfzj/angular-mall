/**
 */
myapp.controller("productCtrl",function($scope,myCart){
    // 保存用户当前选中的商品类别名称
    $scope.selectedCategory = null;

    // 响应用户选择商品类别操作
    $scope.selectCategory = function(category){
        $scope.selectedCategory = category;
        $scope.pageNum = 1;
    };

    // 过滤器函数：参数是被过滤数组中的每一个元素
    $scope.filterByCategory = function(product){
        return $scope.selectedCategory == null || $scope.selectedCategory == product.category;
    };

    // 用于分页的变量
    $scope.pageNum = 1; // 当前请求的页码数
    $scope.pageSize = 3;

    // 分页导航按钮的事件响应
    $scope.selectPage = function(page){
        $scope.pageNum = page;
    }

    // 将指定商品添加到购物车中的方法
    $scope.add = function(product){
        myCart.add(product);
    };
});