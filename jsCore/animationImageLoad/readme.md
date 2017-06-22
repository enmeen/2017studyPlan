### readme
1. 关于isSupportWebp的获取：由于其获取来自异步。如果不对其进行特殊处理，后面的函数在调用isSupportWebp时，获得值并不是异步回调的值。
