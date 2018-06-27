<?php
/**
 * Created by PhpStorm.
 * User: alexander
 * Date: 25.06.18
 * Time: 22:15
 */

use Doctrine\ORM\EntityManager;

class Catalog {

    private $entityManager;
    private $REQUIRED_PRODUCT_FIELDS = ['name', 'category', 'unit'];

    public function __construct(EntityManager $entityManager) {
        $this->entityManager = $entityManager;
    }

    private function _validateProductFields(array $product = []) {
        $isValid = true;
        foreach ($this->REQUIRED_PRODUCT_FIELDS as $field) {
            if (!array_key_exists($field, $product)) {
                $isValid = false;
                break;
            }
        }

        return $isValid;
    }

    public function createProduct($params) {

        if (!$this->_validateProductFields($params)) {
            jsonResponse(
                false,
                "Fields is required: " . join(', ', $this->REQUIRED_PRODUCT_FIELDS),
                40001
            );
        }

        $product = new Product();

        $product->setName($params['name']);

        $category = $this->entityManager->find('Category', $params['category']);
        $product->setCategory($category);

        $product->setUnit($params['unit']);
        $product->setUnitCount($params['unitCount'] ?? 0);

        if (array_key_exists('active', $params)) {
            if ($params['active']) {
                $product->activate();
            } else {
                $product->deactivate();
            }
        }

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        echo "Created Product with ID " . $product->getId() . "\n";

    }

    public function updateProduct(int $id, array $params) {

        if (!$this->_validateProductFields($params)) {
            echo "Fields is required: " . join(', ', $this->REQUIRED_PRODUCT_FIELDS);
            return false;
        }

        $product = $this->entityManager->find('Product', $id);

        if (array_key_exists('name', $params)) {
            $product->setName($params['name']);
        }

        if (array_key_exists('category', $params)) {
            $product->setCategory($params['category']);
        }

        if (array_key_exists('unit', $params)) {
            $product->setUnit($params['unit']);
        }

        if (array_key_exists('unitCount', $params)) {
            $product->setUnitCount($params['unitCount']);
        }

        if (array_key_exists('active', $params)) {
            if ($params['active']) {
                $product->activate();
            } else {
                $product->deactivate();
            }
        }

        $this->entityManager->flush();

        echo "Updated Product with ID " . $product->getId() . "\n";

    }

    public function getProducts() {
        $productRepository = $this->entityManager->getRepository('Product');
        $products = $productRepository->findAll();

        /**
         * @var Product
         */
        foreach ($products as $product) {
            echo sprintf("name: %s id: %s cat: %s\n", $product->getName(), $product->getId(), $product->getCategory());
        }

    }

    public function createCategory($params) {
        $category = new Category();
        if (array_key_exists('name', $params)) {
            $category->setName($params['name']);
        } else {
            echo "Category name is missing";
            return false;
        }

        $this->entityManager->persist($category);
        $this->entityManager->flush();

        return $category->getId();
    }

    public function getCategories() {
        $categoryRepository = $this->entityManager->getRepository('Category');
        $categories = $categoryRepository->findAll();
        $result = [];

        /**
         * @var Category
         */
        foreach ($categories as $category) {
            $result [] = $category->get();
//
        }

        return $result;
    }

    public function getCatalog() {
        $productRepository = $this->entityManager->getRepository('Category');
        return $productRepository->findAll();
    }
}