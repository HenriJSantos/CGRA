class MyTreeBranch extends CGFobject {
    constructor(scene) {
        super(scene);

        let trunkTexture = new CGFtexture(scene, 'images/trunkTexture.jpg');
        let logTexture = new CGFtexture(scene, 'images/logTexture.jpg');
        this.log = new MyLog(scene, logTexture, trunkTexture, 1, 0.1, 6);
    }
    updateBuffers() {

    }
    display() {
        this.scene.pushMatrix();
        this.log.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,1,0);

        this.scene.pushMatrix();
        this.scene.translate(0,.45,.25);
        this.scene.rotate(-Math.PI/3, 1,0,0);
        this.log.display();
        this.scene.popMatrix();

        this.scene.rotate(Math.PI/6, 1,0,0);
        this.scene.scale(1,0.6,1);
        this.log.display();
        this.scene.popMatrix();
    }
}

