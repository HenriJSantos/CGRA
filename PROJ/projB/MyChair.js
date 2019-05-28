/**
 * MyChair
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyChair extends CGFobject {
    constructor(scene, width, length, height, material) {
        super(scene);

        this.width = width;
        this.length = length;
        this.height = height;
        this.seatThick = 0.3;
        this.material = material;

        this.legHeight = height - this.seatThick;
        this.legThick = 0.3;

        this.backHeight = height * 1.5;

        this.leg = new MySlab(scene, this.legThick, this.legHeight, this.legThick, material);
        this.chairSeat = new MySlab(scene, this.width, this.length - this.seatThick, this.seatThick, material);
        this.chairBack =  new MySlab(scene, this.width, this.backHeight, this.seatThick, material);
    }
    updateBuffers() {

    }
    display() {
        this.material.apply();

        //Chair Seat
        this.scene.pushMatrix();
        this.scene.translate(0,0,this.seatThick/2);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.chairSeat.display();
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

        //Chair Back
        this.scene.pushMatrix();
        this.scene.translate(0,this.backHeight/2 - this.seatThick/2 ,-this.length/2 +this.seatThick/2);
        this.chairBack.display();
        this.scene.popMatrix();
    }
}