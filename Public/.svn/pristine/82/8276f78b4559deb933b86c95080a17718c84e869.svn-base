<?php
	set_time_limit(180);
	$vpn = $_REQUEST;

/*	$vpn = array(
		'server_address'	=>	'107.191.111.181',
		'type'				=>	'pptp',
		'username'			=>	'ethan',
		'password'			=>	'ethan623',
		);*/
	
	

	$pbkPath = $_SERVER['DOCUMENT_ROOT'] . "/meeshine_vpn.pbk";

	$pbkStr = "[meeshine_vpn]\n\r
Encoding=1\n\r
Type=2\n\r
AutoLogon=0\n\r
UseRasCredentials=1\n\r
DialParamsUID=14861203\n\r
Guid=B9176A0225445D4A9B8B7792CD9F7CA4\n\r
BaseProtocol=1\n\r
VpnStrategy=2\n\r
ExcludedProtocols=0\n\r
LcpExtensions=1\n\r
DataEncryption=256\n\r
SwCompression=0\n\r
NegotiateMultilinkAlways=0\n\r
SkipNwcWarning=0\n\r
SkipDownLevelDialog=0\n\r
SkipDoubleDialDialog=0\n\r
DialMode=1\n\r
DialPercent=75\n\r
DialSeconds=120\n\r
HangUpPercent=10\n\r
HangUpSeconds=120\n\r
OverridePref=15\n\r
RedialAttempts=99\n\r
RedialSeconds=1\n\r
IdleDisconnectSeconds=0\n\r
RedialOnLinkFailure=1\n\r
CallbackMode=0\n\r
CustomRasDialDll=\n\r
AuthenticateServer=0\n\r
ShareMsFilePrint=1\n\r
BindMsNetClient=1\n\r
SharedPhoneNumbers=0\n\r
GlobalDeviceSettings=0\n\r
PrerequisiteEntry=\n\r
PrerequisitePbk=\n\r
PreferredPort=VPN3-0\n\r
PreferredDevice=WAN 微型端口 (" . strtoupper($vpn['type']) . ")\n\r
PreferredBps=0\n\r
PreferredHwFlow=1\n\r
PreferredProtocol=1\n\r
PreferredCompression=1\n\r
PreferredSpeaker=1\n\r
PreferredMdmProtocol=0\n\r
PreviewUserPw=1\n\r
PreviewDomain=0\n\r
PreviewPhoneNumber=0\n\r
ShowDialingProgress=1\n\r
ShowMonitorIconInTaskBar=1\n\r
CustomAuthKey=-1\n\r
AuthRestrictions=576\n\r
TypicalAuth=2\n\r
IpPrioritizeRemote=1\n\r
IpHeaderCompression=0\n\r
IpAddress=0.0.0.0\n\r
IpDnsAddress=0.0.0.0\n\r
IpDns2Address=0.0.0.0\n\r
IpWinsAddress=0.0.0.0\n\r
IpWins2Address=0.0.0.0\n\r
IpAssign=1\n\r
IpNameAssign=1\n\r
IpFrameSize=1006\n\r
IpDnsFlags=1\n\r
IpNBTFlags=1\n\r
TcpWindowSize=0\n\r
UseFlags=0\n\r
IpSecFlags=0\n\r
IpDnsSuffix=\n\r
NETCOMPONENTS=\n\r
ms_server=1\n\r
ms_msclient=1\n\r
MEDIA=rastapi\n\r
Port=VPN3-0\n\r
Device=WAN 微型端口 (" . strtoupper($vpn['type']). ")\n\r
DEVICE=vpn\n\r
PhoneNumber=" . trim($vpn['server_address']). "\n\r
AreaCode=\n\r
CountryCode=1\n\r
CountryID=1\n\r
UseDialingRules=0\n\r
Comment=\n\r
LastSelectedPhone=0\n\r
PromoteAlternates=0\n\r
TryNextAlternateOnFail=1\n\r";

	file_put_contents($pbkPath, $pbkStr);

	$batStr = "rasdial meeshine_vpn /d\n";
	exec($batStr,$outPut,$returnVar);
	//var_dump("<pre>",$outPut,$returnVar,"</pre>");
//	exit;
	$batStr = "rasdial meeshine_vpn " .$vpn['username']. " " . $vpn['password']. " /PHONEBOOK:" . $pbkPath;
	//var_dump($batStr);
	exec($batStr,$outPut,$returnVar);
	$outPut = implode("\n", $outPut);
	//var_dump("<pre>",$outPut,$returnVar,"</pre>ddad");
	$outPut = iconv('GB2312', 'UTF-8', $outPut);
	if(preg_match('/已连接 meeshine_vpn/i', $outPut)){
		exit("Success");
	}else{
		exit($outPut);
	}
	