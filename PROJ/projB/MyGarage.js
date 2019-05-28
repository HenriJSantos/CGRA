/**
 * MyGarage
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyGarage extends CGFobject {
    constructor(scene, width, height, lengthBlocks, Topthickness) {
        super(scene);

        this.topWidth = width;
        this.height = height;
        this.topThick = Topthickness;

        this.triangleThick = Topthickness/2;
        this.triangleDiag =  width/7;
        this.triangleSize = Math.sqrt(Math.pow(this.triangleDiag,2)/2);

        this.topLength = this.triangleDiag*lengthBlocks;

        this.columnRadius = 0.3;

        let TopMat = new MyMaterial(scene, 'images/HouseTextures/yellowTent.png');
        let BordersMat = new MyMaterial(scene, 'images/HouseTextures/yellowTentBorders.png');
        this.woodMat = new MyMaterial(scene, 'images/HouseTextures/WoodPillar.jpeg');

        this.top = new MySlab(scene, this.topWidth, this.topLength, this.topThick, TopMat, BordersMat);
        this.triangle = new MyTriangle(scene, this.triangleSize, this.triangleSize, this.triangleThick, BordersMat);
        this.column = new MyPrism(scene, 6);
    }

    display() {
        //TOP
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.top.display();
        this.scene.popMatrix();

        this.woodMat.apply();
        //COLUMN1
        this.scene.pushMatrix();
        this.scene.translate(this.topWidth/2 - this.columnRadius - this.triangleThick,-this.height - this.topThick/2,this.topLength/2 - this.columnRadius - this.triangleThick);
        this.scene.scale(this.columnRadius,this.height, this.columnRadius);
        this.column.display();
        this.scene.popMatrix();

        //COLUMN2
        this.scene.pushMatrix();
        this.scene.translate(this.topWidth/2 - this.columnRadius - this.triangleThick,-this.height - this.topThick/2,-(this.topLength/2 - this.columnRadius - this.triangleThick));
        this.scene.scale(this.columnRadius,this.height, this.columnRadius);
        this.column.display();
        this.scene.popMatrix();

        this.createBorders();
    }

    createBorders() {
        for (let i = 0; i < this.topWidth / this.triangleDiag; i++) {
            this.scene.pushMatrix();
            this.scene.translate(-this.topWidth / 2 + this.triangleDiag / 2 + this.triangleDiag * i, -this.topThick / 2, this.topLength / 2 - this.triangleThick / 2);
            this.scene.rotate(Math.PI / 4, 0, 0, 1);
            this.triangle.display();
            this.scene.popMatrix();
        }

        for (let i = 0; i < this.topWidth / this.triangleDiag; i++) {
            this.scene.pushMatrix();
            this.scene.translate(-this.topWidth / 2 + this.triangleDiag / 2 + this.triangleDiag * i, -this.topThick / 2, -this.topLength / 2 + this.triangleThick / 2);
            this.scene.rotate(Math.PI / 4, 0, 0, 1);
            this.triangle.display();
            this.scene.popMatrix();
        }

        //SIDE BORDER
        for (let i = 0; i < this.topLength / this.triangleDiag; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.topWidth / 2 - this.triangleThick / 2, -this.topThick / 2, this.topLength / 2 - this.triangleDiag / 2 - this.triangleDiag * i);
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.scene.rotate(Math.PI / 4, 0, 0, 1);
            this.triangle.display();
            this.scene.popMatrix();
        }
    }

    updateBuffers() {}
}