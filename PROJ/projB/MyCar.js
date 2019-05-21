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

        let carMatProperties = [
            0.6, 0.6, 0.6, 1.0,     //Ambient
            0.4, 0.4, 0.4, 1.0,     //Diffuse
            0.8, 0.8, 0.8, 1.0,     //Specular
        ];
        let carMat = new MyMaterial(scene, 'textures/CarTextures/redTexture.png', undefined, 15, carMatProperties);
        let carWindowMat = new MyMaterial(scene, 'textures/CarTextures/CarFrontGlass.png', undefined, 15, carMatProperties);
        let carSideWindowMat = new MyMaterial(scene, 'textures/CarTextures/CarSideWindow.png', undefined, 15, carMatProperties);
        let carLowerMat = new MyMaterial(scene, 'textures/CarTextures/CarLowerText.png', undefined, 15, carMatProperties);
        let carUnderMat = new MyMaterial(scene, 'textures/CarTextures/UnderCarriage.png', undefined, 15, carMatProperties);

        this.lowerFrame = new MySlab(scene, this.width, this.length, this.bottomheight, carUnderMat, carLowerMat);
        this.upperFrame = new MySlab(scene, this.width, this.upFrameLength, this.bottomheight, carMat);
        this.front = new MyTriangle(scene, this.frontLength, this.frontHeight, this.width, carMat);
        this.frontWindow = new MyTriangle(scene, this.frontWindowLength, this.frontWindowHeight, this.width, carWindowMat);
        this.body = new MySlab(scene, this.width, this.bodyLength, this.frontWindowHeight, carMat, carSideWindowMat);
        this.backWindow = new MyTriangle(scene, this.backWindowLength, this.frontWindowHeight, this.width, carWindowMat);

        this.wheelThick = 0.6;
        this.wheelDiameter = 1;
        let wheelTex = new CGFtexture(scene, 'textures/CarTextures/WheelTexture.png');
        let tireTex = new CGFtexture(scene, 'textures/CarTextures/tireTexture.png');
        this.wheel = new MyLog(scene, wheelTex, tireTex, this.wheelThick, this.wheelDiameter, 20);
        this.backWheelOffset = 0.15 * this.length;
        this.frontWheelOffset = 0.2 * this.length;

        this.headLightMatOff = new MyMaterial(scene, 'textures/CarTextures/headLight.png', undefined, 15, carMatProperties);
        this.headLightMatOn = new MyMaterial(scene, 'textures/CarTextures/headLightOn.png', undefined, 15, carMatProperties);
        let frontLightWidth = width/4;
        this.frontLightLength = 0.1;
        this.lightHeight = this.bottomheight/2;
        this.frontLight = new MySlab(scene, frontLightWidth, this.frontLightLength, this.lightHeight, this.headLightMatOff);

        let LicensePlateSideMat= new MyMaterial(scene, 'textures/CarTextures/white.png', undefined, 10, carMatProperties);
        let LicensePlateMat= new MyMaterial(scene, 'textures/CarTextures/CGRALicensePlate.png', undefined, 10, carMatProperties);
        this.licenseWidth = this.width/2;
        this.licenseHeight = this.bottomheight/1.5;
        this.licensePlate = new MySlab(scene, this.licenseWidth, this.licenseHeight, this.frontLightLength, LicensePlateMat, LicensePlateSideMat);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.lowerFrame.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, this.bottomheight/2,- this.length/2 - this.frontLightLength/2);
        this.licensePlate.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.width/3, this.bottomheight/2 + this.bottomheight/4 - this.lightHeight,this.length/2 + this.frontLightLength/2);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.frontLight.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-this.width/3, this.bottomheight/2 + this.bottomheight/4 - this.lightHeight,this.length/2 + this.frontLightLength/2);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.frontLight.display();
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

    turnOnLights()
    {
        this.frontLight.changeMaterial(this.headLightMatOn);
    }

    turnOffLights()
    {
        this.frontLight.changeMaterial(this.headLightMatOff);
    }

    updateBuffers() {}
}