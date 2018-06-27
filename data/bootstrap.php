<?php
/**
 * Created by PhpStorm.
 * User: alexander
 * Date: 25.06.18
 * Time: 22:15
 */
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

define('ROOT_DIR', __DIR__);

include_once 'vendor/autoload.php';
include_once 'helpers.php';

spl_autoload_register(function ($class_name) {
    if (is_file('models/'. $class_name . '.php')) {
        include 'models/'. $class_name . '.php';
    }
});

spl_autoload_register(function ($class_name) {
    if (is_file('modules/'. $class_name . '.php')) {
        include 'modules/'. $class_name . '.php';
    }
});

$database = new SQLite3('./db/foodRules.sqlite');


$isDevMode = true;
$config = Setup::createAnnotationMetadataConfiguration(array(__DIR__."/models"), $isDevMode);


// database configuration parameters
$conn = array(
    'driver' => 'pdo_sqlite',
    'path' => __DIR__ . '/db/db.sqlite',
);

// obtaining the entity manager
$entityManager = EntityManager::create($conn, $config);

return $entityManager;