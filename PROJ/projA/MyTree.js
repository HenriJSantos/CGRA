/**
 * MyTree
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTree extends CGFobject {
	constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture,
treeTopTexture) {
		super(scene);
		this.trunk = new MyCylinder(scene, 10);
		this.trunkHeight = trunkHeight;
		this.trunkRadius = trunkRadius;
		this.trunkTexture = trunkTexture;

		this.treeTop = new MyCone(scene, 10);
		this.treeTopHeight = treeTopHeight;
		this.treeTopRadius = treeTopRadius;
		this.treeTopTexture = treeTopTexture;

		this.baseMaterial = new CGFappearance(this.scene);
        this.baseMaterial.setAmbient(0.4, 0.4, 0.4, 1.0);
        this.baseMaterial.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.baseMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.baseMaterial.setShininess(10.0);
        this.baseMaterial.setTextureWrap('REPEAT', 'REPEAT');
	}

	display() {
	    this.baseMaterial.setTexture(this.trunkTexture);
	    this.baseMaterial.apply();
	   
        this.scene.pushMatrix();
        this.scene.scale(this.trunkRadius, this.trunkHeight, this.trunkRadius);
        this.baseMaterial.apply();
        this.trunk.display();
        this.scene.popMatrix();

        this.baseMaterial.setTexture(this.treeTopTexture);
	    this.baseMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0,this.trunkHeight,0);
        this.scene.scale(this.treeTopRadius, this.treeTopHeight, this.treeTopRadius);
        this.treeTop.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,this.trunkHeight + 1/2*this.treeTopHeight,0);
        this.scene.scale(5/6*this.treeTopRadius, this.treeTopHeight, 5/6*this.treeTopRadius);
        this.treeTop.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,this.trunkHeight + this.treeTopHeight,0);
        this.scene.scale(2/3*this.treeTopRadius, this.treeTopHeight, 2/3*this.treeTopRadius);
        this.treeTop.display();
        this.scene.popMatrix();
	}
}