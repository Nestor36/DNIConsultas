<?php
$urls = array(
  'http://sdv.midis.gob.pe/Sis_Comunidad/Comunidad/AjaxReniecDatosPersona?In_DNI='.$_GET['dni'],
  'http://sdv.midis.gob.pe/Sis_IDM_Admin/Persona/GetRENIEC?iCodAplicacion=27&iIdTipDocumento=1&vNroDocumento='.$_GET['dni']
);

for ($i=0; $i < 2;) {
  $Headers  = array(
    'Accept: */*',
    'Host: sdv.midis.gob.pe',
    'Upgrade-Insecure-Requests: 1',
    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0'
  );
  $CurlGET = curl_init($urls[$i]);
  curl_setopt($CurlGET, CURLOPT_POSTFIELDS, false);
  curl_setopt($CurlGET, CURLOPT_HTTPHEADER, $Headers);
  curl_exec($CurlGET);
  $i++;
}
?>
