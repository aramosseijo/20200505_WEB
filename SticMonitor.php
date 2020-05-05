<style>
*{
    font-family: monospace;
    font-size:12px;
}
table, th, td {
  border: 1px solid orangered;
  border-collapse: collapse;

}
</style>

<?php

if (!defined('sugarEntry')) {
    define('sugarEntry', true);
}

// Destination database credentials
$dbHostName = '46.16.59.9';
$dbUser = 'mymas1608';
$dbPassword = 'EsJ38QAp';
$dbName = 'instancesqueries';
$dbTable = 'monitor';

// Host
$host = $_SERVER['HTTP_HOST'];


require_once('include/entryPoint.php');

$slowQuery=false;

global $current_user, $timedate;
$current_user = new User();
$current_user->getSystemUser();
$db = DBManagerFactory::getInstance();

$res = $db->query('SELECT * FROM information_schema.processlist where command != "sleep" order by time desc limit 1 ');

$query = $db->fetchByAssoc($res);

$queryId = $query['ID'];
$queryUser = $query['USER'];
$queryHost = $query['HOST'];
$queryDb = $query['DB'];
$queryCommand = $query['COMMAND'];
$queryTime = $query['TIME'];
$queryState = $query['STATE'];
$queryInfo = $query['INFO'];
$queryCount = $db->getOne('SELECT count(*) FROM information_schema.processlist');



    echo 'SticMonitor - ' . $host . ' - ' . $queryCount . ' query(s) with max <strong>'. $queryTime . '</strong> seconds';


    // Uncomment block to display results on screen
    // echo '<table style="border:1px solid orange;width:90%;" cell-padding:2px;>';
    // echo '<tr><td>ID</td><td>' . $queryId . '</td></tr>';
    // echo '<tr><td>USER</td><td>' . $queryUser . '</td></tr>';
    // echo '<tr><td>HOST</td><td>' . $queryHost . '</td></tr>';
    // echo '<tr><td>DB</td><td>' . $queryDb . '</td></tr>';
    // echo '<tr><td>COMMAND</td><td>' . $queryCommand . '</td></tr>';
    // echo '<tr><td>TIME</td><td>' . $queryTime . '</td></tr>';
    // echo '<tr><td>STATE</td><td>' . $queryState . '</td></tr>';
    // echo '<tr><td>INFO</td><td><textarea style="width:100%;">' . $queryInfo . '</textarea></td></tr>';
    // echo '</table>';


// keyword for uptime query alert activation
if ($queryTime > 30) {
    echo '<br>queryalert';
    $slowQuery=true;
}

// writing in master database
$myLink = mysqli_connect($dbHostName, $dbUser, $dbPassword,$dbName); // Connecting to database
if (mysqli_connect_errno()) {
    printf("Connection error: %s\n", mysqli_connect_error());
    
}

$cpuLoad = 0;
if ($host == 'ceesc.sinergiacrm.org') {
    $carga = sys_getloadavg();
    $cpuLoad = $carga[0];
    if ($cpuload > 7) {
        echo '<br>cpuloadalert';
    }
}

$syncDate = $timedate->fromDb(gmdate('Y-m-d H:i:s'));
$currentDate = $timedate->asUser($syncDate, $current_user);




$uniqId=uniqid();
$sql="INSERT INTO $dbTable SET instance='$host', mysql_connects_num='$queryCount', mysql_connects_max_time='$queryTime', cpu_load=$cpuLoad, `time`= NOW(), id='$uniqId';";

if($myLink->query($sql) == true){
    echo "<br>Log saved!";
};


if($slowQuery){
    $sqlSlowQuery="INSERT INTO instancesqueries.monitor_slow_queries SET monitor_id='$uniqId',instance='$host', query='$queryInfo', datetime=NOW(), id='".md5($host.$queryId.$queryInfo)."'";
    if($myLink->query($sqlSlowQuery) == true){
        echo "<br>Slow query saved!";
    };
}

$myLink->close();