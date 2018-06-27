<?

    header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: X-PINGARUNER, authorization, x-secure, content-type');

	 if($_SERVER['HTTP_ORIGIN'] == "http://arunranga.com") {
    header('Access-Control-Max-Age: 1728000');
    header("Content-Length: 0");
	header('Content-Type: application/json');
    exit(0);
  }

	$dataPath = $_SERVER['DOCUMENT_ROOT'] . '/data/';

	$inputJSON = file_get_contents('php://input');
	
	// $input = json_decode($inputJSON, TRUE); //convert JSON into array

	$res = file_put_contents($dataPath . 'products.json', $inputJSON);

	echo json_encode([
		'success' => true
	]);