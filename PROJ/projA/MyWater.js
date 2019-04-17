/**
 * MyWater
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyWater extends CGFobject {
    constructor(scene, width, length, waterMaterial) {
        super(scene);
        this.width = width;
        this.length = length;
        this.material = waterMaterial;

        let texCoords = [
            0, length,
            width, length,
            0, 0,
            width, 0
        ];

        this.quad = new MyQuad(scene, texCoords);
    }

    display() {
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.scale(this.width, 1, this.length);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
    }

    moveWater(amount)
    {
        let texCoords = this.quad.getTexCoords();
        texCoords[1] += amount;
        texCoords[3] += amount;
        texCoords[5] += amount;
        texCoords[7] += amount;

        this.quad.updateTexCoords(texCoords);
    }

    update() {
        
    }
}