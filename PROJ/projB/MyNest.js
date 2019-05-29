class MyNest extends CGFobject {
    constructor(scene, x ,y, z) {
        super(scene);

        this.nestMaterial = new MyMaterial(scene, "images/nestTexture.jpg");
        this.sphere = new MyHalfSphere(scene, 10, 10);
        this.invertedSphere = new MyInvertedHalfSphere(scene, 10, 10);
        this.branch = new MyTreeBranch(scene, 0,0,0);
        this.numberOfBranches = 5;

        this.x = x;
        this.y = y;
        this.z = z;
    }
    updateBuffers() {

    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(Math.PI, 1,0,0);

        this.nestMaterial.apply();
        this.sphere.display();
        this.invertedSphere.display();

        for(let i = 0; i < this.numberOfBranches; i++)
        {
            this.scene.pushMatrix();
            this.scene.translate(0,.5,0);
            this.scene.translate(-Math.cos(Math.PI*2/this.numberOfBranches * i), 0,Math.sin(Math.PI*2/this.numberOfBranches * i));
            this.scene.rotate(Math.PI/3, 0,1,0);
            this.scene.translate(Math.cos(Math.PI*2/this.numberOfBranches * i), 0,-Math.sin(Math.PI*2/this.numberOfBranches * i));
            this.scene.rotate(Math.PI*2/this.numberOfBranches * i, 0,1,0);
            this.branch.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }

    getPosition() {
        return [this.x-1, this.y, this.z+1];
    }
}