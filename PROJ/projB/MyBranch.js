class MyBranch extends CGFobject {
    constructor(scene, diameter, length, nSides) {
        super(scene);

        let number = 8;
        if(nSides != undefined)
        {
            number = nSides
        }
        this.log = new MyCircle(scene, number);
        this.trunk = new MySemiCone(scene, number);

        let properties = [
            0.4, 0.4, 0.4, 1.0,     //Ambient
            0.7, 0.7, 0.7, 1.0 ,    //Diffuse
            0.2, 0.2, 0.2, 1.0,     //Specular
        ];

        this.branchMat = new MyMaterial(scene, "images/trunkTexture.jpg", undefined, undefined, properties);
        this.logMat = new MyMaterial(scene, "images/trunkTexture.jpg"), undefined, undefined, properties;

        this.length = length;
        this.diameter = diameter;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.diameter, this.length, this.diameter);

        this.branchMat.apply();
        this.trunk.display();

        this.logMat.apply();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.log.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.scale(0.5,0.5,0.5);
        this.log.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }

    setDiameter(diameter) {
        this.diameter = diameter;
    }

    setLength(length) {
        this.length = length;
    }
}
