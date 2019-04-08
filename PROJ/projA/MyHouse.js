/**
 * MyHouse
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHouse extends CGFobject {
    constructor(scene) {
        super(scene);
        this.walls_height = 4;
        this.backwall_width = 10;
        this.walls_thick = 0.5;
        this.sideWalls_width = this.backwall_width/1.5;

        this.doorHeight = 3/4 * this.walls_height;

        this.setLeftWallSize();

        this.backWindowWidth = this.backwall_width/2;
        this.backWindowHeight = this.walls_height/2;
        this.backWindowThick = this.walls_thick/4;
        this.backBordersHeight = (this.walls_height - this.backWindowHeight)/2;
        this.backSideBordersHeight = this.walls_height - 2*this.backBordersHeight;
        this.backSideBordersWidth = (this.backwall_width - this.backWindowWidth)/2;

        let frontWallWidth = this.backwall_width/2.5;
        let doorTopWidth = (this.backwall_width - frontWallWidth*2);
        let doorTopHeight = this.walls_height - this.doorHeight;

        let woodMaterial = new MyMaterial(scene, 'textures/HouseTextures/woodWall.jpeg');
        let roofMaterial = new MyMaterial(scene, 'textures/HouseTextures/roofTexture.jpg');
        let woodWindowMat = new MyMaterial(scene, 'textures/HouseTextures/woodWindow.png');
        let woodWindowBorderMat = new MyMaterial(scene, 'textures/HouseTextures/woodWindowBorder.png');
        let glassWindowMat = new MyMaterial(scene, 'textures/HouseTextures/GlassWindowTexture.png');

        let doorTopTextCoords = this.getWallTextCoords(doorTopWidth, doorTopHeight);
        let sideWallTextCoords = this.getWallTextCoords(this.sideWalls_width);
        let backWallTextCoords = this.getWallTextCoords(this.backwall_width);
        let leftWallsTextCoords = this.getWallTextCoords(this.leftWallWidht);
        let leftBordersTextCoords = this.getWallTextCoords(this.leftWindowWidth, this.leftBordersHeight);

        this.backWindow = new MySlab(scene, this.backWindowWidth, this.backWindowHeight, this.backWindowThick, glassWindowMat);
        this.backWall = new MySlab(scene, this.backwall_width, this.walls_height, this.walls_thick, woodMaterial, undefined, backWallTextCoords);

        this.frontWalls = new MySlab(scene, frontWallWidth, this.walls_height, this.walls_thick, woodMaterial);
        this.doorTopWall = new MySlab(scene, doorTopWidth, doorTopHeight, this.walls_thick, woodMaterial, undefined, doorTopTextCoords);

        this.rightSideWall = new MySlab(scene, this.sideWalls_width, this.walls_height, this.walls_thick, woodMaterial, undefined, sideWallTextCoords);
        this.leftSideWalls = new MySlab(scene, this.leftWallWidht, this.walls_height, this.walls_thick, woodMaterial, undefined, leftWallsTextCoords);
        this.leftBorders = new MySlab(scene, this.leftWindowWidth, this.leftBordersHeight, this.walls_thick, woodMaterial, undefined, leftBordersTextCoords);
        this.leftWindow = new MySlab(scene, this.leftWindowWidth/2, this.leftWindowHeight, this.leftWindowThick, woodWindowMat, woodWindowBorderMat);

        this.floor = new MySlab(scene, this.backwall_width, this.sideWalls_width + this.walls_thick*2, 0);
        this.ceiling = new MySlab(scene, this.backwall_width + this.walls_thick*2, this.sideWalls_width + this.walls_thick*4, 0);
        this.roof = new MyRoof(scene, roofMaterial);
        this.door = new MyDoor(scene, 'textures/HouseTextures/doorTexture.png', 'textures/HouseTextures/knobTexture.jpg');
    }

    setLeftWallSize() {
        this.leftWindowWidth = this.sideWalls_width / 2;
        this.leftWindowHeight = this.walls_height / 2;
        this.leftWindowThick = this.walls_thick / 4;
        this.leftWindowAngle = Math.PI / 3;
        this.leftWallWidht = (this.sideWalls_width - this.leftWindowWidth) / 2;
        this.leftBordersHeight = (this.walls_height - this.leftWindowHeight) / 2;
    }

    getWallTextCoords(width, height) {
        if(height === undefined) height = this.walls_height;
        let referenceSize = this.backwall_width/2.5;
        let textCoords = [
            0, height/this.walls_height,
            width/referenceSize, height/this.walls_height,
            0, 0,
            width/referenceSize, 0,
        ];

        return textCoords;
    }

    display() {
        //FRONT WALL1
        this.scene.pushMatrix();
        this.scene.translate(-(this.backwall_width - this.backwall_width/2.5)/2,0,this.walls_thick/2);
        this.frontWalls.display();
        this.scene.popMatrix();

        //FRONT WALL2
        this.scene.pushMatrix();
        this.scene.translate((this.backwall_width - this.backwall_width/2.5)/2,0,this.walls_thick/2);
        this.frontWalls.display();
        this.scene.popMatrix();

        //FRONT WALL3
        this.scene.pushMatrix();
        this.scene.translate(0,this.doorHeight/2,this.walls_thick/2);
        this.doorTopWall.display();
        this.scene.popMatrix();

        //RIGHT WALL
        this.scene.pushMatrix();
        this.scene.translate(this.backwall_width/2 - this.walls_thick/2,0,-this.sideWalls_width/2);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.rightSideWall.display();
        this.scene.popMatrix();

        //LEFT WALL1
        this.scene.pushMatrix();
        this.scene.translate(-this.backwall_width/2 + this.walls_thick/2,0, -this.leftWallWidht/2);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.leftSideWalls.display();
        this.scene.popMatrix();

        //LEFT WALL2
        this.scene.pushMatrix();
        this.scene.translate(-this.backwall_width/2 + this.walls_thick/2,0, -(this.leftWallWidht*1.5 + this.leftWindowWidth));
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.leftSideWalls.display();
        this.scene.popMatrix();

        //LEFT BORDER1
        this.scene.pushMatrix();
        this.scene.translate(-this.backwall_width/2 + this.walls_thick/2, -this.leftBordersHeight*1.5, -this.leftWallWidht - this.leftWindowWidth/2);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.leftBorders.display();
        this.scene.popMatrix();

        //LEFT BORDER1
        this.scene.pushMatrix();
        this.scene.translate(-this.backwall_width/2 + this.walls_thick/2, this.leftBordersHeight*1.5, -this.leftWallWidht - this.leftWindowWidth/2);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.leftBorders.display();
        this.scene.popMatrix();

        //LEFT WINDOW1
        this.scene.pushMatrix();
        this.scene.translate(-this.backwall_width/2, 0, -this.leftWallWidht);
        this.scene.rotate(this.leftWindowAngle, 0,1,0);
        this.scene.translate(-this.leftWindowWidth/4,0,0);
        this.leftWindow.display();
        this.scene.popMatrix();

        //LEFT WINDOW2
        this.scene.pushMatrix();
        this.scene.translate(-this.backwall_width/2, 0, -this.leftWallWidht - this.leftWindowWidth);
        this.scene.rotate(-this.leftWindowAngle, 0,1,0);
        this.scene.translate(-this.leftWindowWidth/4,0,0);
        this.scene.rotate(Math.PI, 1,0,0);
        this.leftWindow.display();
        this.scene.popMatrix();

        //BACK WALL
        this.scene.pushMatrix();
        this.scene.translate(0 ,0,-(this.sideWalls_width + this.walls_thick/2));
        this.backWall.display();
        this.scene.popMatrix();

        //FLOOR
        this.scene.pushMatrix();
        this.scene.translate(0, -this.walls_height/2 + 0.001,-this.sideWalls_width/2);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.floor.display();
        this.scene.popMatrix();

        //CEILING
        this.scene.pushMatrix();
        this.scene.translate(0, this.walls_height/2,-this.sideWalls_width/2);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.ceiling.display();
        this.scene.popMatrix();

        //ROOF
        this.scene.pushMatrix();
        this.scene.translate(0, this.walls_height/2,-this.sideWalls_width/2);
        this.scene.scale(this.backwall_width/2 + this.walls_thick, 3, this.sideWalls_width + this.walls_thick*4);
        this.roof.display();
        this.scene.popMatrix();

        //DOOR
        this.scene.pushMatrix();
        this.scene.translate(0,  - (this.walls_height - this.doorHeight)/2, this.walls_thick/2);
        this.door.display();
        this.scene.popMatrix();
    }

    updateBuffers() {}
}

