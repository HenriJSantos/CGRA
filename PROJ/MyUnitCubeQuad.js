/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quadPol = new MyQuad(scene);

        this.cubeMat = new CGFappearance(this.scene);
        this.cubeMat.setAmbient(0.5, 0.5, 0.5, 1.0);
        this.cubeMat.setDiffuse(1, 1, 1, 1.0);
        this.cubeMat.setSpecular(0.7, 0.7, 0.7, 1.0);
        this.cubeMat.setShininess(10.0);
        //Tangram texture
        this.sideTex = new CGFtexture(this.scene, 'images/mineSide.png');
        this.topTex = new CGFtexture(this.scene, 'images/mineTop.png');
        this.bottomTex = new CGFtexture(this.scene, 'images/mineBottom.png');
        this.cubeMat.setTextureWrap('REPEAT', 'REPEAT');
    }
    updateBuffers() {

    }
    display() {
        this.cubeMat.setTexture(this.sideTex);
        this.cubeMat.apply();
        //FRONT
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.quadPol.display();
        this.scene.popMatrix();

        //BACK
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.scale(-1,1,1);
        this.quadPol.display();
        this.scene.popMatrix();

        //RIGHT
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2, 0,1,0);

        this.quadPol.display();
        this.scene.popMatrix();

        //LEFT
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2, 0,1,0);

        this.quadPol.display();
        this.scene.popMatrix();

        this.cubeMat.setTexture(this.topTex);
        this.cubeMat.apply();
        //TOP
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.quadPol.display();
        this.scene.popMatrix();

        this.cubeMat.setTexture(this.bottomTex);
        this.cubeMat.apply();
        //BOTTOM
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.quadPol.display();
        this.scene.popMatrix();
    }
}

