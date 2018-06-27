<?
// header('Access-Control-Allow-Headers: "Origin, X-Requested-With, Content-Type, Accept"');

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: X-PINGARUNER, authorization, x-secure');

//if(@$_SERVER['HTTP_ORIGIN'] == "http://arunranga.com") {
//    header('Access-Control-Max-Age: 1728000');
//    header("Content-Length: 0");
//    header('Content-Type: application/json');
//    exit(0);
//}
include 'bootstrap.php';

$catalog = new Catalog($entityManager);


$type = @$_REQUEST['type'];
$method = @$_SERVER['REQUEST_METHOD'];

$isPost = $method && strtolower($method) == 'post';
$isGet = $method && strtolower($method) == 'get';

switch($type) {

    case 'products': {


        if ($isGet) {
            $content = $catalog->getProducts();
            echo json_encode($content);
        }


        if ($isPost) {
            $data = getDataFromBody();
            $content = $catalog->createProduct($data);
            echo json_encode($content);
        }

        echo $content;
    }
        break;
    case 'categories': {

        if ($isGet) {
            $content = $catalog->getCategories();
            echo json_encode($content);
        }

        if ($isPost) {
            $data = getDataFromBody();
            $content = $catalog->createCategory($data);
            echo json_encode($content);
        }

    }
        break;
    case 'catalog': {
        if ($isGet) {
            $content = $catalog->getCatalog();
            echo json_encode($content);
        }
    }
        break;

}
