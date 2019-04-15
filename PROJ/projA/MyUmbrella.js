/**
 * MyUmbrella
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUmbrella extends CGFobject {
	constructor(scene, topMaterial) {
		super(scene);
		this.top = new MyHalfSphere(this.scene, 10, 10);
		this.stick = new MyCylinder(this.scene, 10);
        this.topMaterial = topMaterial;
        let stickMaterialProperties = [
            0.5, 0.5, 0.5, 1.0,
            0.4, 0.4, 0.4, 1.0,
            0.7, 0.7, 0.7, 1.0
        ];
        this.stickMaterial = new MyMaterial(this.scene, 'textures/plasticTexture.jpg', ["REPEAT", "REPEAT"], 10, stickMaterialProperties);
	}

	display() {
        this.scene.pushMatrix();
        this.scene.scale(0.1,3,0.1);
        this.stickMaterial.apply();
        this.stick.display();
        this.scene.popMatrix();

	    this.scene.pushMatrix();
	    this.scene.translate(0,2,0);
	    this.topMaterial.apply();
	    this.top.display();
	    this.scene.popMatrix();
	}
}