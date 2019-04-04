/**
 * MyCampfire
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCampfire extends CGFobject {
	constructor(scene, logTexture, trunkTexture, lit) {
		super(scene);
		this.sphere = new MySphere(this.scene, 4, 4);
		this.log = new MyLog(this.scene, logTexture, trunkTexture);
		this.lit = lit;
		this.tick = 0;
		this.smokeRate = 10;
		this.smoke = [];
	}

	display() {
	    let angle = 2*Math.PI/9
	    for (let i = 0; i < 9; i++) {
	        this.scene.pushMatrix();
	        this.scene.scale(0.5,0.5,0.5);
	        this.scene.translate(2*Math.cos(angle*i), 0, 2*Math.sin(angle*i));
	        this.scene.rotate(-angle*i,0,0,1);
	        this.sphere.display();
	        this.scene.popMatrix();
	    }

	    this.scene.pushMatrix();
	    this.scene.translate(0.7, 0, 0);
	    this.scene.rotate(Math.PI/9, 0, 0, 1);
	    this.scene.scale(0.25,1.3,0.25);
	    this.log.display();
	    this.scene.popMatrix();

	    this.scene.pushMatrix();
	    this.scene.translate(0.7*Math.cos(2/3*Math.PI), 0, 0.7*Math.sin(2/3*Math.PI));
	    this.scene.rotate(-2/3*Math.PI, 0, 1, 0);
	    this.scene.rotate(Math.PI/9, 0, 0, 1);
	    this.scene.scale(0.25,1.3,0.25);
	    this.log.display();
	    this.scene.popMatrix();

	    this.scene.pushMatrix();
	    this.scene.translate(0.7*Math.cos(4/3*Math.PI), 0, 0.7*Math.sin(4/3*Math.PI));
	    this.scene.rotate(-4/3*Math.PI, 0, 1, 0);
	    this.scene.rotate(Math.PI/9, 0, 0, 1);
	    this.scene.scale(0.25,1.3,0.25);
	    this.log.display();
	    this.scene.popMatrix();

	    if(this.lit) {
			if(this.tick % this.smokeRate == 0) this.smoke.push(new MySmokeParticle(this.scene));
			this.tick++;

			for (let i in this.smoke) {
				if(this.smoke[i].y_pos > 5)
					delete this.smoke[i];
				else
					this.smoke[i].display();
			}
	    }
	}
}
