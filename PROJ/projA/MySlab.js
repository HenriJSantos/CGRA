/**
 * MySlab
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySlab extends CGFobject {
    constructor(scene, width, height, thickness) {
        super(scene);
        this.plane = new MyQuad(scene);

        this.width = width;
        this.height = height;
        this.thickness = thickness;
    }
    updateBuffers() {

    }
    display() {
        //FRONT
        this.scene.pushMatrix();
        this.scene.translate(0,0,this.thickness/2);
        this.scene.scale(this.width, this.height, 0);
        this.plane.display();
        this.scene.popMatrix();

        //BACK
        this.scene.pushMatrix();
        this.scene.translate(0,0,-this.thickness/2);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(this.width, this.height, 0);
        this.plane.display();
        this.scene.popMatrix();

        //RIGHT SIDE
        this.scene.pushMatrix();
        this.scene.translate(this.width/2,0,0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(this.thickness, this.height, 0);
        this.plane.display();
        this.scene.popMatrix();

        //LEFT SIDE
        this.scene.pushMatrix();
        this.scene.translate(-this.width/2,0,0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(this.thickness, this.height, 0);
        this.plane.display();
        this.scene.popMatrix();

        //TOP
        this.scene.pushMatrix();
        this.scene.translate(0,this.height/2,0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(this.width, this.thickness, 0);
        this.plane.display();
        this.scene.popMatrix();

        //BOTTOM
        this.scene.pushMatrix();
        this.scene.translate(0,-this.height/2,0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(this.width, this.thickness, 0);
        this.plane.display();
        this.scene.popMatrix();
    }
}

