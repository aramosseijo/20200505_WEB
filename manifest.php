<?php
 
// manifest file for information regarding application of new code
$manifest = array(

    // only install on the following sugar versions (if empty, no check)
    array (
        'exact_matches' => array (
        ),
        'regex_matches' => array (
            0 => '6\.5\.11'
        ),
    ),

    'acceptable_sugar_flavors' => array (
        0 => 'CE',
    ),

    'name' => 'Paquet Català creat per REDK',
    'id'=> 'ca_ES_REDK',
    'lang_file_suffix' => 'ca_ES',
    'description' => 'Paquet de traducció català',
    'author' => 'redk.net',
    'is_uninstallable' => true,
    'type' => 'langpack',
    'icon' => '',
    'published_date' => '2013/03/19',
    'version' => '6.5.11',
);

?>