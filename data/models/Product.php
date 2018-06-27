<?php
/**
 * Created by PhpStorm.
 * User: alexander
 * Date: 25.06.18
 * Time: 22:35
 */
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @Entity @Table(name="products")
 **/
class Product {
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
     * @image
     * @Column(type="string", length=255, nullable=true)
     */
    protected $image;

    /**
     * @price
     * @Column(type="float", nullable=true)
     */
    protected $price;

    /**
     * @unit
     * @Column(type="integer", nullable=true)
     */
    protected $unit;

    /**
     * @unitCount
     * @Column(type="integer", nullable=true)
     */
    protected $unitCount;

    /**
     * Many Features have One Product.
     * @var Category
     * @ManyToOne(targetEntity="Category", inversedBy="products_list")
     * @JoinColumn(name="category", referencedColumnName="id")
     */
    protected $category;

    /**
     * @active
     * @Column(type="boolean", nullable=true, options={"default" : true})
     */
    protected $active;

    /**
     * @isNew
     * @Column(type="boolean", nullable=true, options={"default" : false})
     */
    protected $isNew;


    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getImage() {
        return $this->image;
    }

    public function setImage($url) {
        $this->image = $url;
    }

    public function getUnit() {
        return $this->unit;
    }

    public function setUnit($unit) {
        $this->unit = $unit;
    }

    public function getUnitCount() {
        return $this->unitCount;
    }

    public function setUnitCount($unitCount) {
        $this->unitCount = $unitCount;
    }

    public function isActive() {
        return $this->active;
    }

    public function activate() {
        $this->active = true;
    }

    public function deactivate() {
        $this->active = false;
    }

    public function getCategory() {
        return $this->category;
    }

    public function setCategory(Category $category) {
        $this->category = $category;
    }

    public function get() {
        return [
            'id' => $this->id,
            'active' => $this->active,
            'name' => $this->name,
            'image' => $this->image,
            'unit' => $this->unit,
            'unitCount' => $this->unitCount,
            'category' => $this->category
        ];
    }

}