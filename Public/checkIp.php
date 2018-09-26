<?php
$proxyServerIp = "192.168.1.93";

//这个程序用来放在代理服务器上，每分钟同

/**
 * 获取客户端IP地址
 * @param integer $type 返回类型 0 返回IP地址 1 返回IPV4地址数字
 * @return mixed
 */
function get_client_ip($type = 0) {
	$type       =  $type ? 1 : 0;
    static $ip  =   NULL;
    if ($ip !== NULL) return $ip[$type];
    if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $arr    =   explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        $pos    =   array_search('unknown',$arr);
        if(false !== $pos) unset($arr[$pos]);
        $ip     =   trim($arr[0]);
    }elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
        $ip     =   $_SERVER['HTTP_CLIENT_IP'];
    }elseif (isset($_SERVER['REMOTE_ADDR'])) {
        $ip     =   $_SERVER['REMOTE_ADDR'];
    }
    // IP地址合法验证
    $long = sprintf("%u",ip2long($ip));
    $ip   = $long ? array($ip, $long) : array('0.0.0.0', 0);
    return $ip[$type];
}


$result = file_get_contents("http://img.barboola.com/falseIp.php");
$result = str_replace('var currentServer = ', '', $result);
$result = str_replace(";getCurrentServer();", '', $result);

$_SERVER = json_decode(trim($result),true);


/*
$url = "http://oa.barboola.com/false_proxy_server/update?admin=623&proxyServerIp=" . $proxyServerIp . "&internetIp=" . get_client_ip();
file_get_contents($url);*/

echo get_client_ip();
exit;
