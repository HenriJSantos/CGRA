/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        this.setUpdatePeriod(50);

        //Variables
        this.groundHeight = 3.75;
        this.birdCanDescend = true;

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.ground = new MyTerrain(this);
        this.bird = new MyBird(this, 13);
        this.house = new MyHouse(this);
        this.nest = new MyNest(this, 17, 6.37, 3.82);
        this.lightning = new MyLightning(this);

        this.createBranches(4);

        this.rightWing = new MyRightWing(this);

        this.debugSphere = new MySphere(this, 5, 5);
        let debugProperties = [
            1, 0.2, 0.2, 1.0,     //Ambient
            1, 0.2, 0.2, 1.0,     //Diffuse
            0.5, 0.05, 0.05, 0.2,     //Specular
        ];
        this.debugMaterial = new MyMaterial(this, undefined, undefined, undefined, debugProperties);

        //Objects connected to MyInterface
    }

    createBranches(numberOfBranches) {
        let zone1 = [9, 12, -3, 11];  //x1, x2, z1, z2
        let zone2 = [-12, -2, 10, 15];
        let zone3 = [-6, 2, -16, -4];
        let zone4 = [-14, -6, -4, 4];

        let zones = [zone1, zone2, zone3, zone4];
        this.branchArray = Array(numberOfBranches);
        console.log(zones[0][0]);
        for(let i = 0; i < numberOfBranches; i++)
        {
            let zone = Math.floor(Math.random() * 4);
            let xRange = Math.abs(Math.abs(zones[zone][1]) - Math.abs(zones[zone][0])) + 1;
            let zRange = Math.abs(Math.abs(zones[zone][3]) - Math.abs(zones[zone][2])) + 1;
            let xStart = zones[zone][0];
            let zStart = zones[zone][2];

            let randomX =  Math.floor(Math.random() * xRange) + xStart;
            let randomZ =  Math.floor(Math.random() * zRange) + zStart;
            let randomAngle = Math.random() * Math.PI;
            this.branchArray[i] = new MyTreeBranch(this, randomX, this.groundHeight, randomZ,  randomAngle);
        }
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    checkKeys(t) {
        if (this.gui.isKeyPressed("KeyW")) {
            this.bird.accelerate(0.05);
        }
        if (this.gui.isKeyPressed("KeyS")) {
            this.bird.accelerate(-0.05);
        }
        if (this.gui.isKeyPressed("KeyA")) {
            this.bird.turn(0.1);
        }
        if (this.gui.isKeyPressed("KeyD")) {
            this.bird.turn(-0.1);
        }
        if (this.gui.isKeyPressed("KeyR")) {
            this.bird.reset();
        }
        if (this.gui.isKeyPressed("KeyL")) {
            if(!this.lightning.isAnimating) {
                this.lightning.axiom = "X";
                this.lightning.iterate();
                this.lightning.startAnimation(t);
            }
        }
        if (this.gui.isKeyPressed("KeyP") && this.birdCanDescend) {
            if(this.bird.getBeakPosition()[1] > this.groundHeight) this.bird.verticalMovement(-0.4);
            else this.birdCanDescend = false;
        }
        else
        {
            this.bird.verticalMovement(0.2);
            if(this.bird.getBeakPosition()[1] > this.groundHeight + 6) this.birdCanDescend = true;
        }
    }

    calculateDistance(position1, position2) {
        return Math.sqrt(Math.pow(position1[0] - position2[0], 2) + Math.pow(position1[1] - position2[1], 2) + Math.pow(position1[2] - position2[2], 2));
    }

    update(t){
        this.lightning.update(t);
        this.bird.update(t);
        this.checkKeys(t);

        let catchRadius = 2;
        let beakPosition = this.bird.getBeakPosition();

        if(this.bird.isCarrying())
        {
            let branchNumber = this.bird.getCarriedBranch();
            this.branchArray[branchNumber].setPosition(beakPosition);
            this.branchArray[branchNumber].setAngle(this.bird.getOrientation() + Math.PI/2);
        }
        else
        {
            for(let i = 0; i < this.branchArray.length; i++)
            {
                let branch = this.branchArray[i];
                if(!this.bird.isCarrying() && branch.isCatchable() && this.calculateDistance(branch.getPosition(), beakPosition) <= catchRadius) {
                    this.bird.startCarrying(i);
                    branch.setPosition(beakPosition);
                    branch.setAngle(this.bird.getOrientation() + Math.PI/2);
                    branch.catch();
                }
            }
        }

        let dropRadius = 3;
        let nestPosition = this.nest.getPosition();
        if(this.bird.isCarrying() && this.calculateDistance(beakPosition,nestPosition) <= dropRadius)
        {
            let branchNumber = this.bird.getCarriedBranch();
            let dropPos = nestPosition;
            dropPos[1] += 2;
            this.branchArray[branchNumber].setPosition(dropPos);
            this.bird.stopCarrying();
        }
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        this.pushMatrix();
        this.bird.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(13,5.65,0);
        this.rotate(-Math.PI/2, 0,1,0);
        this.scale(0.8,0.8,0.8);
        this.house.display();
        this.popMatrix();

        for(let i = 0; i < this.branchArray.length; i++)
            this.branchArray[i].display();

        this.pushMatrix();
        this.rotate(Math.PI/12, 1,0,1);
        this.nest.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(0, 30, 0);
        this.scale(1,4,1);
        this.rotate(Math.PI, 0, 0, 1);
        this.lightning.display();
        this.popMatrix();

        /* //DEBUG PEAK POSITION
        this.pushMatrix();
        let beakPos = this.bird.getBeakPosition();
        this.translate(beakPos[0],beakPos[1], beakPos[2]);
        this.scale(0.1, 0.1, 0.1);
        this.debugMaterial.apply();
        this.debugSphere.display();
        this.popMatrix();*/

        this.ground.display();
        // ---- END Primitive drawing section
    }
}