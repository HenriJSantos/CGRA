/**
 * MyFloor
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFloor extends CGFobject {
	constructor(scene, radius, texture) {
		super(scene);
		this.radius = radius;
		this.texture = texture;
		this.quad = new MyQuad(scene);

		this.baseMaterial = new CGFappearance(this.scene);
        this.baseMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.baseMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.baseMaterial.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.baseMaterial.setShininess(10.0);
        this.baseMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.baseMaterial.setTexture(this.texture);
	}

	display() {
	    this.baseMaterial.apply();
	    for(let i = 0; i < this.radius; i++) {
	        for (let j = 0; j < this.radius; j++) {
	            this.scene.pushMatrix();
                this.scene.translate(-this.radius/2+i,0,-this.radius/2+j);
                this.scene.rotate(-Math.PI/2,1,0,0);
                this.quad.display();
	            this.scene.popMatrix();
	        }
	    }
	}
}