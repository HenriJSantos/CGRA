class MyTreeBranch extends CGFobject {
    constructor(scene, x ,y, z, angle) {
        super(scene);

        let trunkTexture = new CGFtexture(scene, 'images/trunkTexture.jpg');
        let logTexture = new CGFtexture(scene, 'images/logTexture.jpg');
        this.log = new MyLog(scene, logTexture, trunkTexture, 1, 0.1, 6);

        this.x = x;
        this.y = y;
        this.z = z;

        if(angle !== undefined) this.orientationAngle = angle;
        else this.orientationAngle = 0;
        this.catchable = true;
    }
    updateBuffers() {

    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.orientationAngle, 0,1,0);
        this.scene.rotate(Math.PI/2, 0,0,1);

        this.scene.pushMatrix();
        this.log.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,.9,0);

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/6, 1,0,0);
        this.scene.scale(.8,0.3,.8);
        this.log.display();
        this.scene.popMatrix();

        this.scene.rotate(Math.PI/6, 1,0,0);
        this.scene.scale(1,0.6,1);
        this.log.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    getPosition() {
        return [this.x, this.y, this.z];
    }

    setPosition(position) {
        this.x = position[0] + 0.5*Math.cos(this.orientationAngle);
        this.y = position[1];
        this.z = position[2] - 0.5*Math.sin(this.orientationAngle);
    }

    setAngle(angle) {
        this.orientationAngle = angle;
    }

    isCatchable() {
        return this.catchable;
    }

    catch() {
        this.catchable = false;
    }
}

