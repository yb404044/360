<?php
header('content-type:text/html;charset=utf-8');
define('HOST','localhost');
define('USERNAME','root');
define('PASSWORD','root');
define('DBNAME','ybh');
$conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);
if($conn->connect_error){
die('数据库连接失败'.$conn->connect_error);
};
$conn->query('SET NAMES UTF8');
// CORS 解决跨域
//因为有了这两句话才解决了跨域问题
header('Access-Control-Allow-Origin:*');//跨域访问的域名，*表示所有
header('Access-Control-Allow-Method:POST,GET');//跨域支持的请求方式。

$res = $conn->query("select * from 360goods");

$arr = Array();
for($i=0;$i<$res->num_rows;$i++){
  $arr[$i]=$res->fetch_assoc();
}
echo json_encode($arr);
//http://192.168.13.72/360/projectname/php/360json.php


