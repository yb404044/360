<?php
// 一.设置字符编码。
header('content-type:text/html;charset=utf-8');
// 二.连接数据库
// 主机名
define('HOST','localhost');
// 用户名
define('USERNAME','root');
// 密码
define('PASSWORD','root');
// 数据库的名称
define('DBNAME','ybh');
// 利用mysqli类进行php和mysql连接。
$conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);
// CORS 解决跨域
//因为有了这两句话才解决了跨域问题
header('Access-Control-Allow-Origin:*');//跨域访问的域名，*表示所有
header('Access-Control-Allow-Method:POST,GET');//跨域支持的请求方式。
// @符号做容错处理。
// 数据库连接失败的处理。
if($conn->connect_error){
    die('数据库连接失败'.$conn->connect_error);
}

//执行命令的方法。$conn->query()
$conn->query('SET NAMES UTF8');//设置数据库里面数据的编码。