/**
 * MyParticle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyParticle extends CGFobject {
	constructor(scene, texture) {
	    super(scene);
	    this.iterationsAlive = 0;
	    this.x_movement = -0.02+0.04*Math.random();
	    this.y_movement = 0.01+0.03*Math.random();
	    this.z_movement = -0.02+0.04*Math.random();
	    this.size = 0.02+0.1*Math.random();
	    this.x_pos = 0;
	    this.y_pos = -0.2;
	    this.z_pos = 0;
	    this.sphere = new MySphere(this.scene, 10, 10);

	    this.baseMaterial = new CGFappearance(this.scene);
        this.baseMaterial.setAmbient(0.4, 0.4, 0.4, 1.0);
        this.baseMaterial.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.baseMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.baseMaterial.setShininess(10.0);
        this.baseMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.baseMaterial.setTexture(texture);
	}

	display() {
		this.baseMaterial.apply();
	    this.scene.pushMatrix();
	    this.scene.translate(this.x_pos, this.y_pos, this.z_pos);
	    this.scene.scale(this.size, this.size, this.size);
	    this.sphere.display();
	    this.scene.popMatrix();
	}

	update() {
		this.iterationsAlive++;
	    this.y_movement *= 1.01;
	    this.x_pos += this.x_movement;
	    this.y_pos += this.y_movement;
	    this.z_pos += this.z_movement;
	}
}

