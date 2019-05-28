/**
 * MyFloor
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFloor extends CGFobject {
	constructor(scene, width, length, groundTexture) {
		super(scene);
		this.width = width;
		this.length = length
		this.groundTexture = groundTexture;

        let texCoords = [
            0, length,
            width, length,
            0, 0,
            width, 0
        ];
		this.quad = new MyQuad(scene, texCoords);

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

	    for(let i = -this.width/4; i < this.width/4; i++) {
	        for (let j = -this.length/4; j < this.length/4; j++) {
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