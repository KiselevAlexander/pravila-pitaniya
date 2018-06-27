<?php
/**
 * Created by PhpStorm.
 * User: alexander
 * Date: 26.06.18
 * Time: 23:09
 */

function getDataFromBody() {
    $inputJSON = file_get_contents('php://input');
    return json_decode($inputJSON, true);
}

function jsonResponse($success = true, $data, $code = 200) {
    echo json_encode([
        'success' => $success,
        'code' => $code,
        'data' => $data
    ]);
    die();
}