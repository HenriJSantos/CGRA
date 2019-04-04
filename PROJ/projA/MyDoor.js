/**
 * MyDoor
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyDoor extends CGFobject {
    constructor(scene, doorTexture, knobTexture) {
        super(scene);
        this.door = new MySlab(scene, 2, 3, 0.3);
        this.doorKnob = new MySlab(scene, 0.4, 0.1, 0.1);
        this.doorKnob1 = new MySlab(scene, 0.1, 0.05, 0.1);

        this.doorMaterial = new MyMaterial(scene, doorTexture);

        this.knobMaterial = new MyMaterial(scene, knobTexture);
    }
    updateBuffers() {

    }
    display() {
        //DOOR
        this.doorMaterial.apply();
        this.scene.pushMatrix();
        this.door.display();
        this.scene.popMatrix();

        //KNOB
        this.scene.pushMatrix();
        this.scene.translate(-0.1, 0.1, 0);
        this.knobMaterial.apply();
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

