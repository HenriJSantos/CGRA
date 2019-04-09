/**
 * MyTable
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTable extends CGFobject {
    constructor(scene, width, length, height, material) {
        super(scene);

        this.width = width;
        this.length = length;
        this.height = height;
        this.tableThick = 0.3;
        this.material = material;

        this.legHeight = height - this.tableThick;
        this.legThick = 0.3;

        this.leg = new MySlab(scene, this.legThick, this.legHeight, this.legThick, material);
        this.tableTop = new MySlab(scene, this.width, this.length, this.tableThick, material);
    }
    updateBuffers() {

    }
    display() {
        this.material.apply();

        //Table Top
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.tableTop.display();
        this.scene.popMatrix();

        //Leg1
        this.scene.pushMatrix();
        this.scene.translate(-this.width/2 + this.legThick/2, -this.height/2, -this.length/2 + this.legThick/2);
        this.leg.display();
        this.scene.popMatrix();

        //Leg2
        this.scene.pushMatrix();
        this.scene.translate(this.width/2 - this.legThick/2, -this.height/2, -this.length/2 + this.legThick/2);
        this.leg.display();
        this.scene.popMatrix();

        //Leg3
        this.scene.pushMatrix();
        this.scene.translate(-this.width/2 + this.legThick/2, -this.height/2, this.length/2 - this.legThick/2);
        this.leg.display();
        this.scene.popMatrix();

        //Leg4
        this.scene.pushMatrix();
        this.scene.translate(this.width/2 - this.legThick/2, -this.height/2, this.length/2 -this.legThick/2);
        this.leg.display();
        this.scene.popMatrix();
    }
}