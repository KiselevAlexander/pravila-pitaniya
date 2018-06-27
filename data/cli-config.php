<?php
/**
 * Created by PhpStorm.
 * User: alexander
 * Date: 25.06.18
 * Time: 22:54
 */
// replace with file to your own project bootstrap
require_once "bootstrap.php";

return \Doctrine\ORM\Tools\Console\ConsoleRunner::createHelperSet($entityManager);
