/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBird extends CGFobject {
	constructor(scene, baseAltitude) {
	    super(scene);
	    this.bodyLength = 2.3;
	    this.headDiameter = 1;
	    this.headHeight = 0.7;
	    this.beakLength = 0.5;
	    this.beakDiameter = 0.3;

	    //Solids
	    this.lowPolySphere = new MySphere(this.scene, 8, 4);
	    this.beak = new MyCone(this.scene, 6);
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
		this.beakMaterial = new MyMaterial(this.scene, "images/beakTexture.jpg", undefined, 20, cheekProperties);

		this.tail = new MyTriangle(this.scene, 1, 1, 0.2, this.featherMaterial);
	
	    this.wingSpeed = 0.01;

	    this.orientationAngle = 0;
	    this.speed = 0;
	    this.maxSpeed = 3;
	    this.x = 0;
	    this.y = baseAltitude;
	    this.z = 0;

	    this.speedFactor = 1;
	    this.scaleFactor = 0.5;

        this.baseAltitude = baseAltitude;
        this.currentAltitude = baseAltitude;
        this.verticalTilt = 0;
        this.descending = false;

        this.beakPosition = [this.x, this.y, this.z];

        this.carrying = false;
        this.branchNumber;
	}

	display() {

		this.scene.pushMatrix();
		this.scene.translate(this.x, this.y, this.z);
		this.scene.rotate(this.orientationAngle, 0, 1, 0);
        this.scene.rotate(this.verticalTilt, 0, 0, 1);
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

		//Body
		this.featherMaterial.apply();
        this.scene.pushMatrix();
        this.scene.scale(this.bodyLength,1.2,1.1);
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
        this.scene.translate(2.2,this.headHeight,0);
        
        //Head ball
        this.lowPolySphere.display();

		//Beak
		this.beakMaterial.apply();
		this.scene.pushMatrix();
        this.scene.translate(0.85, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.scale(this.beakDiameter, this.beakLength, this.beakDiameter);
        this.beak.display();
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
        this.scene.rotate(this.wingAngle*2, 1, 0, 0);
        this.rightWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.4,0.2,-0.9);
        this.scene.rotate(-this.wingAngle*2, 1, 0, 0);
        this.leftWing.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
	}

	turn(value) {
		this.orientationAngle += value;
	}

	accelerate(value) {
        if(this.speed >= this.maxSpeed)
        {
            this.speed = this.maxSpeed;
            return;
        }
		this.speed += value;
		if(this.speed < 0)
			this.speed = 0;
	}

	verticalMovement(value) {
	    let startAltitude = this.currentAltitude;
	    this.currentAltitude += value;
	    if(this.currentAltitude >= this.baseAltitude)
        {
            this.currentAltitude = this.baseAltitude;
        }
        let endAltitude = this.currentAltitude;
	    this.descending = (endAltitude < startAltitude);

	    let tiltFactor = .9;
	    if(this.speed  === 0) tiltFactor = 1.2;
	    let smoothFactor = 0.6;
	    let previousTilt = this.verticalTilt;
	    let harshTilt = ((endAltitude - startAltitude)*tiltFactor * (this.maxSpeed - this.speed));
	    let smoothTilt = harshTilt - (harshTilt - previousTilt)*smoothFactor;
	    this.verticalTilt = smoothTilt;
    }

	reset() {
		this.speed = 0;
		this.orientationAngle = 0;
		this.x = 0;
		this.y = this.baseAltitude;
		this.z = 0;
		this.verticalTilt = 0;
		this.currentAltitude = this.baseAltitude;
	}

	update(t) {
		let newAngle = 0.01*(1+Math.abs(this.speed))*t*this.speedFactor;
        if(! this.descending) this.wingAngle = 0.5*Math.sin(newAngle);
		this.x += this.speed*Math.cos(this.orientationAngle);
		this.z += -this.speed*Math.sin(this.orientationAngle);
		this.y = this.currentAltitude;
		if(! this.descending) this.y += 0.5*Math.sin(this.wingSpeed*t*this.speedFactor);
        if(! this.descending) this.leftWing.update(newAngle);
        if(! this.descending) this.rightWing.update(newAngle);
	}

	getBeakPosition() {
	    let xDist = (this.bodyLength/2 + this.headDiameter / 2  + this.beakLength/4);
        let tiltDist = xDist - this.verticalTilt*0.7;
        let verticalOffset = 0;
        if(this.verticalTilt < 0){
            tiltDist = xDist + this.verticalTilt*0.3;
            verticalOffset = -0.1;
        }
        let xPos = (this.x + tiltDist*Math.cos(this.orientationAngle)*(this.scaleFactor*2));
        let yPos = (this.y + (this.headHeight/2 + Math.sin(this.verticalTilt)*xDist + verticalOffset)*(this.scaleFactor*2));
        let zPos = (this.z + tiltDist*Math.sin(-this.orientationAngle)*(this.scaleFactor*2));
        return [xPos, yPos, zPos];
    }

    getOrientation() {
	    return this.orientationAngle;
    }

    startCarrying(branchNumber) {
	    this.carrying = true;
	    this.branchNumber = branchNumber;
    }

    stopCarrying() {
	    this.carrying = false;
	    this.branchNumber = null;
    }

    isCarrying() {
	    return this.carrying;
    }

    getCarriedBranch() {
	    return this.branchNumber;
    }
}