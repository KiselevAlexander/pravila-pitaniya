<?php
/**
 * Created by PhpStorm.
 * User: alexander
 * Date: 26.06.18
 * Time: 22:27
 */

use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @Entity @Table(name="categories")
 **/
class Category {
    /**
     * @id
     * @Column(type="integer")
     * @GeneratedValue
     */
    protected $id;

    /**
     * @name
     * @Column(type="string", length=255)
     */
    protected $name;

    /**
     * @var Collection
     * @OneToMany(targetEntity="Product", mappedBy="category")
     **/
    protected $products_list;

    public function __construct() {
        $this->products_list = new ArrayCollection();
    }


    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    /**
     * @return Collection
     */
    public function getProducts()  {
        return $this->products_list;
    }

    public function get() {
        $products = [];
        foreach ($this->products_list as $product) {
            $products[] = $product->get();
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'products' => $products
        ];
    }


}