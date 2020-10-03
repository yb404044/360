<?php
include "conn.php";
//1.用户名重名的检测
if(isset($_POST['name'])){
    $user = $_POST['name'];//获取前端传入的用户名和数据库进行匹配。
    $result=$conn->query("select * from registry where username='$user'");
    if($result->fetch_assoc()){//如果存在结果集，用户名存在。
        echo true;//存在
    }else{
        echo false;//不存在
    }
}
//2.接收前端表单传入的数据 - submit
if(isset($_POST['username'])){
    $user = $_POST['username'];
    $pass = sha1($_POST['password']);
    $email = $_POST['email'];
    $conn->query("insert registry values(default,'$user','$pass','$email',NOW())");
    echo  true;
}