/**
 * MyDoor
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyDoor extends CGFobject {
    constructor(scene, doorWidth, doorHeight, doorTexture, knobTexture) {
        super(scene);
        this.doorHeight = doorHeight;

        this.doorMaterial = new MyMaterial(scene, doorTexture);

        this.knobMaterial = new MyMaterial(scene, knobTexture);

        this.door = new MySlab(scene, doorWidth, this.doorHeight, 0.3, this.doorMaterial);
        this.doorKnob = new MySlab(scene, 0.4, 0.1, 0.1, this.knobMaterial);
        this.doorKnob1 = new MySlab(scene, 0.1, 0.05, 0.1), this.knobMaterial;
    }
    updateBuffers() {

    }
    display() {
        //DOOR
        this.scene.pushMatrix();
        this.door.display();
        this.scene.popMatrix();

        //KNOB
        this.scene.pushMatrix();
        this.scene.translate(-0.1, 0.1, 0);
        this.scene.pushMatrix();
        this.scene.translate(-0.35, 0, 0.3);
        this.doorKnob.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0.2);
        this.doorKnob1.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        //KNOB
        this.scene.pushMatrix();
        this.scene.translate(-0.1, 0.1, 0);
        this.scene.rotate(Math.PI, 1,0,0);
        this.scene.pushMatrix();
        this.scene.translate(-0.35, 0, 0.3);
        this.doorKnob.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0.2);
        this.doorKnob1.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}

