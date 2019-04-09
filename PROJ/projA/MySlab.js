function invertTexCoords(texCoords) {
    let newTexCoords = [texCoords[6], texCoords[7], texCoords[4], texCoords[5], texCoords[2], texCoords[3], texCoords[0], texCoords[1]]
    return newTexCoords;
}

/**
 * MySlab
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySlab extends CGFobject {
    constructor(scene, width, height, thickness, material, borderMaterial, textCoords) {
        super(scene);
        this.quadPol = new MyQuad(scene);

        this.width = width;
        this.height = height;
        this.thickness = thickness;
        this.material = null;

        if(material != undefined)
        {
            this.material = material;
        }

        if(textCoords != undefined)
        {
            this.quadPol.updateTexCoords(textCoords);
        }

        if(borderMaterial != undefined )
        {
            this.borderMaterial = borderMaterial;
        }

        textCoords = invertTexCoords(this.quadPol.getTexCoords());
        this.quadPolBack = new MyQuad(scene, textCoords);

    }
    updateBuffers() {

    }
    display() {
        if(this.material != null) this.material.apply();

        this.scene.pushMatrix();
        this.scene.scale(this.width, this.height, this.thickness);

        //FRONT
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.quadPol.display();
        this.scene.popMatrix();

        //BACK
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.quadPolBack.display();
        this.scene.popMatrix();

        if(this.borderMaterial != null) this.borderMaterial.apply();
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

        //TOP
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.quadPol.display();
        this.scene.popMatrix();

        //BOTTOM
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.quadPol.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}

