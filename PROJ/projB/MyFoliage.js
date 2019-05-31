class MyFoliage extends CGFobject {
    constructor(scene, numberOfLeaves) {
        super(scene);
        this.leaf = new MyLeaf(scene);
        this.numberOfLeaves = numberOfLeaves;

        this.leafPos = [numberOfLeaves];
        for (let i = 0; i < this.numberOfLeaves; i++) {
            let array = [3];
            array[0] = Math.random()*2;
            array[1] = Math.random();
            this.leafPos[i] = array;
        }

        this.offset = Math.random();
    }

    display() {
        let angle = Math.PI*2 / this.numberOfLeaves;
        this.scene.pushMatrix();
        this.scene.translate(0, -this.offset, 0);
        for (let i = 0; i < this.numberOfLeaves; i++) {
            this.scene.pushMatrix();
            this.scene.translate(0, this.leafPos[i][0], 0);
            this.scene.rotate(Math.PI*this.leafPos[i][1]/2, 1,0,0);
            this.scene.rotate(Math.PI*this.leafPos[i][1]/2, 0,1,0);
            this.scene.rotate(i*angle, 0,1,0);
            this.scene.translate(0,0,1);
            this.scene.rotate(Math.PI/2, 1,0,0);
            this.leaf.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}

