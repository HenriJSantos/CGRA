/**
 * MyLog
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLog extends CGFobject {
	constructor(scene, logTexture, trunkTexture, thickness, diameter) {
		super(scene);
		this.logTexture = logTexture;
		this.trunkTexture = trunkTexture;

		this.log = new MyCircle(scene, 10);
		this.trunk = new MyCylinder(scene, 10);

		this.baseMaterial = new CGFappearance(this.scene);
        this.baseMaterial.setAmbient(0.4, 0.4, 0.4, 1.0);
        this.baseMaterial.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.baseMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.baseMaterial.setShininess(10.0);
        this.baseMaterial.setTextureWrap('REPEAT', 'REPEAT');

        if(thickness != undefined)
		{
			this.thickness = thickness;
			this.diameter = diameter;
		}
	}

	display() {
		if(this.thickness != null)
		{
			this.scene.scale(this.diameter, this.thickness, this.diameter);
		}

	    this.baseMaterial.setTexture(this.trunkTexture);
	    this.baseMaterial.apply();
	   	
	    this.trunk.display();

	    this.baseMaterial.setTexture(this.logTexture);
	    this.baseMaterial.apply();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 1, 0, 0);
	    this.log.display();
	    this.scene.popMatrix();
	    this.scene.pushMatrix();
	    this.scene.translate(0, 1, 0);
	    this.log.display();
	    this.scene.popMatrix();
	}
}
