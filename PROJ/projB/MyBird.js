/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBird extends CGFobject {
	constructor(scene) {
	    super(scene);
	    //Solids
	    this.lowPolySphere = new MySphere(this.scene, 8, 4);
	    this.pyramid = new MyPyramid(this.scene, 6);
	    this.eyeTexture = new CGFtexture(this.scene, "images/eyeTexture.jpg");
	    this.log = new MyLog(this.scene, this.eyeTexture, this.eyeTexture, undefined, undefined, 8);
	    this.rightWing = new MyRightWing(this.scene);
	    this.leftWing = new MyLeftWing(this.scene);

		//Materials
		this.featherMaterial = new MyMaterial(this.scene, "images/featherTexture.jpg");
        let cheekProperties = [
            0.8, 0.4, 0.5, 1.0,     //Ambient    
            0.8, 0.4, 0.5, 0.8,  //Diffuse
            0.8, 0.4, 0.5, 1.0,		//Specular
        ];
		this.cheekMaterial = new MyMaterial(this.scene, undefined, undefined, 20, cheekProperties);
		this.beakMaterial = new MyMaterial(this.scene, "images/beakTexture.jpg");

		this.tail = new MyTriangle(this.scene, 1, 1, 0.2, this.featherMaterial);
	
	    this.wingSpeed = 0.01;

	    this.orientationAngle = 0;
	    this.speed = 0;
	    this.x = 0;
	    this.y = 0;
	    this.z = 0;

	    this.speedFactor = 1;
	    this.scaleFactor = 0.5;
	}

	display() {

		this.scene.pushMatrix();
		this.scene.translate(this.x, this.y, this.z);
		this.scene.rotate(this.orientationAngle, 0, 1, 0);
		this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

		//Body
		this.featherMaterial.apply();
        this.scene.pushMatrix();
        this.scene.scale(2.3,1.2,1.1);
        this.lowPolySphere.display();
        this.scene.popMatrix();

        //Tail
        this.scene.pushMatrix();
        this.scene.translate(-2.5, 0.5, 0);
        this.scene.rotate(-Math.PI/8, 0, 0, 1);
        this.scene.rotate(5*Math.PI/4, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.tail.display();
        this.scene.popMatrix();

		//Head
        this.scene.pushMatrix();
        this.scene.translate(2.2,0.7,0);
        
        //Head ball
        this.lowPolySphere.display();

		//Beak
		this.beakMaterial.apply();
		this.scene.pushMatrix();
        this.scene.translate(0.85, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.scale(0.3, 0.5, 0.3);
        this.pyramid.display();
        this.scene.popMatrix();

        //Cheeks
        this.cheekMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.8,0.05,0.4);
        this.scene.scale(0.15,0.2, 0.2);
      	this.lowPolySphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.8,0.05,-0.4);
        this.scene.scale(0.15,0.2, 0.2);
      	this.lowPolySphere.display();
        this.scene.popMatrix();

        //Eyes
        this.scene.pushMatrix();
        this.scene.translate(0.6,0.4,0.4);
        this.scene.rotate(-Math.PI/8, 0, 1, 0);
        this.scene.rotate(-(Math.PI/2-Math.PI/10), 0, 0, 1)
        this.scene.scale(0.2,0.1,0.2);
      	this.log.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.6,0.4,-0.4);
        this.scene.rotate(Math.PI/8, 0, 1, 0);
        this.scene.rotate(-(Math.PI/2-Math.PI/10), 0, 0, 1)
        this.scene.scale(0.2,0.1,0.2);
      	this.log.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

		//Wings
        this.featherMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.4,0.2,0.9);
        this.scene.rotate(this.wingAngle, 1, 0, 0);
        this.rightWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.4,0.2,-0.9);
        this.scene.rotate(-this.wingAngle, 1, 0, 0);
        this.leftWing.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
	}

	turn(value) {
		this.orientationAngle += value;
	}

	accelerate(value) {
		this.speed += value;
	}

	reset() {
		this.speed = 0;
		this.orientationAngle = 0;
		this.x = 0;
		this.y = 0;
		this.z = 0;
	}

	update(t) {
		this.wingAngle = 0.5*Math.sin(0.01*(1+Math.abs(this.speed))*t*this.speedFactor);
		this.x += this.speed*Math.cos(this.orientationAngle);
		this.z += -this.speed*Math.sin(this.orientationAngle);
		this.y = 0.5*Math.sin(this.wingSpeed*t*this.speedFactor);
	}
}