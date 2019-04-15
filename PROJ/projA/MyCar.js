/**
 * MyCar
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCar extends CGFobject {
    constructor(scene, width, length, height) {
        super(scene);
        this.width = width;
        this.length = length;
        this.bottomheight = height/5;

        this.frontHeight = height/5;
        this.frontLength = length/3;
        this.upFrameLength = length/3 * 2;

        this.frontWindowLength = length/6;
        this.frontWindowHeight = height/5 * 1.5;
        this.bodyLength = length/4;
        this.backWindowLength = length/5;

        let carMat = new MyMaterial(scene);

        this.lowerFrame = new MySlab(scene, this.width, this.length, this.bottomheight, carMat);
        this.upperFrame = new MySlab(scene, this.width, this.upFrameLength, this.bottomheight, carMat);
        this.front = new MyTriangle(scene, this.frontLength, this.frontHeight, this.width, carMat);
        this.frontWindow = new MyTriangle(scene, this.frontWindowLength, this.frontWindowHeight, this.width, carMat);
        this.body = new MySlab(scene, this.width, this.bodyLength, this.frontWindowHeight, carMat);
        this.backWindow = new MyTriangle(scene, this.backWindowLength, this.frontWindowHeight, this.width, carMat);

        this.wheelThick = 0.6;
        this.wheelDiameter = 1;
        let wheelTex1 = new CGFtexture(this, 'textures/HouseTextures/knobTexture.jpg');
        this.wheel = new MyLog(scene, wheelTex1, wheelTex1, this.wheelThick, this.wheelDiameter);
        this.backWheelOffset = 0.15 * this.length;
        this.frontWheelOffset = 0.2 * this.length;

    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.lowerFrame.display();
        this.scene.popMatrix();

        //BACK WHEEL
        this.scene.pushMatrix();
        this.scene.translate(this.width/2 + this.wheelThick/2,-this.wheelDiameter/2 ,-this.length/2 + this.backWheelOffset);
        this.scene.rotate(Math.PI/2, 0,0,1);
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.width/2 + this.wheelThick/2,-this.wheelDiameter/2 ,this.length/2 - this.frontWheelOffset);
        this.scene.rotate(Math.PI/2, 0,0,1);
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-this.width/2 - this.wheelThick/2 + this.wheelThick,-this.wheelDiameter/2 ,this.length/2 - this.frontWheelOffset);
        this.scene.rotate(Math.PI/2, 0,0,1);
        this.wheel.display();
        this.scene.popMatrix();

        //BACK WHEEL
        this.scene.pushMatrix();
        this.scene.translate(-this.width/2 - this.wheelThick/2 + this.wheelThick,-this.wheelDiameter/2 ,-this.length/2 + this.backWheelOffset);
        this.scene.rotate(Math.PI/2, 0,0,1);
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,this.bottomheight + this.bottomheight/2 + this.frontWindowHeight/2, -this.bodyLength/2);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.body.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,this.bottomheight, -this.length/2 + this.upFrameLength/2);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.upperFrame.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,this.bottomheight + this.bottomheight/2 + this.frontWindowHeight/2, this.length/6 - this.frontWindowLength/2);
        this.scene.rotate(-Math.PI/2, 0,1,0);
        this.frontWindow.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,this.bottomheight + this.bottomheight/2 + this.frontWindowHeight/2, -this.length/4 - this.backWindowLength/2);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.backWindow.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,this.frontHeight/2 + this.bottomheight/2,this.length/2 - this.frontLength/2);
        this.scene.rotate(-Math.PI/2, 0,1,0);
        this.front.display();
        this.scene.popMatrix();
    }

    updateBuffers() {}
}