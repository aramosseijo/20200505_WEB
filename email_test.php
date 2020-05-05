<?php
ini_set('error_reporting', E_ALL);

include_once('PHPMailer/class.phpmailer.php');

$html_body="<p>Este es el <strong>cuerpo del mensaje</strong> de prueba</p>";

$smtp_host="mail.fundacionlukas.org";
$smtp_user="info@fundacionlukas.org";
$smtp_pass="J3OI6Doi";
$correo_from="info@fundacionlukas.org";
$correo_to="pablo@sinergiacrm.org";

$mail = new PHPMailer();
$mail->Mailer = "smtp"; 
$mail->Host = $smtp_host;
$mail->SMTPSecure = "tls";
$mail->Port = 465;
$mail->SMTPDebug = 4;
$mail->SMTPAuth = true; 
$mail->Username = $smtp_user; 
$mail->Password = $smtp_pass;
$mail->Timeout=20;
$mail->From = $correo_from;
$mail->FromName = "Anar";
$mail->Subject = "Correo de prueba";
$mail->AltBody = ""; 
$mail->MsgHTML($html_body);
$mail->AddAddress($correo_to);
try{
	if(!$mail->Send()) {
		echo '<p style="color:#cc0000;">ERROR: '.$mail->ErrorInfo.'<br></p>';
	}else{
		echo '<p style="color:#00cc00;">ENVIADO<br></p>';
	}
}
catch(Exception $e) {
  echo 'Message: ' .$e->getMessage();
}

?>