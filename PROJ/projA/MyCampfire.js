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
		this.smokeTexture = new CGFtexture(this.scene, 'textures/smokeTexture.jpg');
		this.fireTexture = new CGFtexture(this.scene, 'textures/fireTexture.jpg');
		this.lit = lit;
		this.smoke = [];
		this.fire = [];
		this.smokeRate = 5;
		this.fireRate = 1;
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

		for (let i in this.smoke) {
			this.smoke[i].display();
		}

		for (let i in this.fire) {
			this.fire[i].display();
		}
	}

	update(currTime) {
		if(this.scene.campfireLit)
			this.lit = true;
		else
			this.lit = false;
		if(this.lit) {
			if(Math.round(currTime/100) % this.smokeRate == 0)
				this.smoke.push(new MyParticle(this.scene, this.smokeTexture));

			if(Math.round(currTime/100) % this.fireRate == 0)
				this.fire.push(new MyParticle(this.scene, this.fireTexture));
		}

		for (let i in this.smoke) {
			this.smoke[i].update();
			if(this.smoke[i].iterationsAlive >= 150)
				delete this.smoke[i];
		}

		for (let i in this.fire) {
			this.fire[i].update();
			if(this.fire[i].iterationsAlive >= 50)
				delete this.fire[i];
		}
	}
}
