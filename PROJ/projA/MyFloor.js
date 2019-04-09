/**
 * MyFloor
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFloor extends CGFobject {
	constructor(scene, radius, groundTexture) {
		super(scene);
		this.radius = radius;
		this.groundTexture = groundTexture;
		this.quad = new MyQuad(scene);

		this.baseMaterial = new CGFappearance(this.scene);
        this.baseMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.baseMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.baseMaterial.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.baseMaterial.setShininess(10.0);
        this.baseMaterial.setTextureWrap('REPEAT', 'REPEAT');
	}

	display() {
		this.baseMaterial.setTexture(this.groundTexture);
	    this.baseMaterial.apply();
	    for(let i = -this.radius/2; i <= this.radius/2; i++) {
	        for (let j = -this.radius/2; j <= this.radius/2; j++) {
					this.scene.pushMatrix();
					this.scene.translate(2*i,0,2*j);
					this.scene.scale(2,1,2);
					this.scene.rotate(-Math.PI/2,1,0,0);
					this.quad.display();
					this.scene.popMatrix();
	        }
	    }
	}
}