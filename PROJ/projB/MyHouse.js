/**
 * MyHouse
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHouse extends CGFobject {
    constructor(scene) {
        super(scene);
        this.walls_height = 5;
        this.backwall_width = 10;
        this.walls_thick = 0.5;
        this.sideWalls_width = this.backwall_width/1.5;

        this.doorHeight = 3/4 * this.walls_height;
        this.doorWidth = this.backwall_width/5;

        this.setLeftWallSize();
        this.setBackWallSizes();

        let frontWallWidth = this.backwall_width/2.5;
        let doorTopWidth = (this.backwall_width - frontWallWidth*2);
        let doorTopHeight = this.walls_height - this.doorHeight;

        let woodMaterial = new MyMaterial(scene, 'images/HouseTextures/woodWall.jpeg');
        let roofMaterial = new MyMaterial(scene, 'images/HouseTextures/roofTexture.jpg');
        let woodWindowMat = new MyMaterial(scene, 'images/HouseTextures/woodWindow.png');
        let woodWindowBorderMat = new MyMaterial(scene, 'images/HouseTextures/woodWindowBorder.png');
        let glassWindowMat = new MyMaterial(scene, 'images/HouseTextures/GlassWindowTexture.png');
        this.ceilingMat = new MyMaterial(scene, 'images/HouseTextures/ceilingTexture.png', ['CLAMP_TO_EDGE', 'CLAMP_TO_EDGE']);

        let doorTopTextCoords = this.getWallTextCoords(doorTopWidth, doorTopHeight);
        let sideWallTextCoords = this.getWallTextCoords(this.sideWalls_width);
        let backBorderSideTextCoords= this.getWallTextCoords(this.backSideBordersWidth, this.backSideBordersHeight);
        let leftWallsTextCoords = this.getWallTextCoords(this.leftWallWidht);
        let leftBordersTextCoords = this.getWallTextCoords(this.leftWindowWidth, this.leftBordersHeight);
        let backBorderTextCoords = this.getWallTextCoords(this.backwall_width, this.backBordersHeight);
        let ceilingTextCoords = [
            -0.1, 1.1,
            1.1, 1.1,
            -0.1, -0.1,
            1.1, -0.1,
        ];

        this.backWindow = new MySlab(scene, this.backWindowWidth, this.backWindowHeight, this.backWindowThick, glassWindowMat);
        this.backBorder = new MySlab(scene, this.backwall_width, this.backBordersHeight, this.walls_thick, woodMaterial, undefined, backBorderTextCoords);
        this.backBorderSides = new MySlab(scene, this.backSideBordersWidth, this.backSideBordersHeight, this.walls_thick, woodMaterial, undefined, backBorderSideTextCoords);

        this.frontWalls = new MySlab(scene, frontWallWidth, this.walls_height, this.walls_thick, woodMaterial);
        this.doorTopWall = new MySlab(scene, doorTopWidth, doorTopHeight, this.walls_thick, woodMaterial, undefined, doorTopTextCoords);

        this.rightSideWall = new MySlab(scene, this.sideWalls_width, this.walls_height, this.walls_thick, woodMaterial, undefined, sideWallTextCoords);
        this.leftSideWalls = new MySlab(scene, this.leftWallWidht, this.walls_height, this.walls_thick, woodMaterial, undefined, leftWallsTextCoords);
        this.leftBorders = new MySlab(scene, this.leftWindowWidth, this.leftBordersHeight, this.walls_thick, woodMaterial, undefined, leftBordersTextCoords);
        this.leftWindow = new MySlab(scene, this.leftWindowWidth/2, this.leftWindowHeight, this.leftWindowThick, woodWindowMat, woodWindowBorderMat, undefined, true);

        this.floor = new MySlab(scene, this.backwall_width, this.sideWalls_width + this.walls_thick*2, 0.001);
        this.ceiling = new MyQuad(scene, ceilingTextCoords);
        this.roof = new MyRoof(scene, roofMaterial);
        this.door = new MyDoor(scene, this.doorWidth, this.doorHeight, 'images/HouseTextures/doorTexture.png', 'images/HouseTextures/knobTexture.jpg');

        this.rugWIdth = this.backwall_width/1.8;
        this.rugLength = this.sideWalls_width/1.8;
        this.rugThick = 0.1;
        let rugMat = new MyMaterial(scene, 'images/HouseTextures/rugTexture.png');

        this.rug = new MySlab(scene, this.rugWIdth, this.rugLength, this.rugThick, rugMat);
        let tableMat = new MyMaterial(scene, 'images/HouseTextures/woodenTable.jpg');
        this.tableHeight = 1.5;
        this.table = new MyTable(scene, 3, 2, this.tableHeight, tableMat);

        let chairMat = new MyMaterial(scene, 'images/HouseTextures/chairTexture.png');
        this.chairHeight = 1;
        this.chair = new MyChair(scene, 1.5,1.5,this.chairHeight ,chairMat);

        this.garageLength = this.sideWalls_width;
        this.garageHeight = this.walls_height - this.walls_thick;
        this.garage = new MyGarage(scene, this.sideWalls_width, this.garageHeight, Math.ceil(this.sideWalls_width), this.walls_thick/2);


    }

    setBackWallSizes() {
        this.backWindowWidth = this.backwall_width / 2;
        this.backWindowHeight = this.walls_height / 1.5;
        this.backWindowThick = this.walls_thick / 4;
        this.backBordersHeight = (this.walls_height - this.backWindowHeight) / 2;
        this.backSideBordersHeight = this.walls_height - 2 * this.backBordersHeight;
        this.backSideBordersWidth = (this.backwall_width - this.backWindowWidth) / 2;
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
        this.displayFrontWall();

        this.scene.pushMatrix();
        this.scene.translate(this.backwall_width/2 + this.garageLength/2, this.garageHeight/2, -this.sideWalls_width/2);
        this.garage.display();
        this.scene.popMatrix();

        //RIGHT WALL
        this.scene.pushMatrix();
        this.scene.translate(this.backwall_width/2 - this.walls_thick/2,0,-this.sideWalls_width/2);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.rightSideWall.display();
        this.scene.popMatrix();

        //LeftWall
        this.displayLeftWall();

        //BACK WALL
        this.displayBackWall();

        //FLOOR
        this.scene.pushMatrix();
        this.scene.translate(0, -this.walls_height/2 + 0.01,-this.sideWalls_width/2);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.floor.display();
        this.scene.popMatrix();

        //CEILING
        this.ceilingMat.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, this.walls_height/2,-this.sideWalls_width/2);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.scene.scale(this.backwall_width + this.walls_thick*2, this.sideWalls_width + this.walls_thick*4, 1);
        this.ceiling.display();
        this.scene.popMatrix();

        //ROOF
        this.scene.pushMatrix();
        this.scene.translate(0, this.walls_height/2,-this.sideWalls_width/2);
        this.scene.scale(this.backwall_width/2 + this.walls_thick, 3, this.sideWalls_width + this.walls_thick*4);
        this.roof.display();
        this.scene.popMatrix();

        //RUG
        this.scene.pushMatrix();
        this.scene.translate(0, -this.walls_height/2 + this.rugThick/2,-this.sideWalls_width/2);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.rug.display();
        this.scene.popMatrix();

        //TABLE
        this.scene.pushMatrix();
        this.scene.translate(0, -this.walls_height/2 + this.tableHeight,-this.sideWalls_width/2);
        this.table.display();
        this.scene.popMatrix();

        let displacement = 0.9;
        //CHAIR1
        this.scene.pushMatrix();
        this.scene.translate(0, -this.walls_height/2 + this.chairHeight,-this.sideWalls_width/2 - displacement);
        this.chair.display();
        this.scene.popMatrix();

        //CHAIR2
        this.scene.pushMatrix();
        this.scene.translate(0, -this.walls_height/2 + this.chairHeight, -this.sideWalls_width/2 + displacement);
        this.scene.rotate(Math.PI, 0,1,0);
        this.chair.display();
        this.scene.popMatrix();
    }

    displayFrontWall() {
        //FRONT WALL1
        this.scene.pushMatrix();
        this.scene.translate(-(this.backwall_width - this.backwall_width / 2.5) / 2, 0, this.walls_thick / 2);
        this.frontWalls.display();
        this.scene.popMatrix();

        //FRONT WALL2
        this.scene.pushMatrix();
        this.scene.translate((this.backwall_width - this.backwall_width / 2.5) / 2, 0, this.walls_thick / 2);
        this.frontWalls.display();
        this.scene.popMatrix();

        //FRONT WALL3
        this.scene.pushMatrix();
        this.scene.translate(0, this.doorHeight / 2, this.walls_thick / 2);
        this.doorTopWall.display();
        this.scene.popMatrix();

        //DOOR
        this.scene.pushMatrix();
        this.scene.translate(0, -this.walls_height/2  + this.doorHeight/2, this.walls_thick / 2);
        this.door.display();
        this.scene.popMatrix();
    }

    displayLeftWall() {
        //LEFT WALL1
        this.scene.pushMatrix();
        this.scene.translate(-this.backwall_width / 2 + this.walls_thick / 2, 0, -this.leftWallWidht / 2);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.leftSideWalls.display();
        this.scene.popMatrix();

        //LEFT WALL2
        this.scene.pushMatrix();
        this.scene.translate(-this.backwall_width / 2 + this.walls_thick / 2, 0, -(this.leftWallWidht * 1.5 + this.leftWindowWidth));
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.leftSideWalls.display();
        this.scene.popMatrix();

        //LEFT BORDER1
        this.scene.pushMatrix();
        this.scene.translate(-this.backwall_width / 2 + this.walls_thick / 2, -this.leftBordersHeight * 1.5, -this.leftWallWidht - this.leftWindowWidth / 2);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.leftBorders.display();
        this.scene.popMatrix();

        //LEFT BORDER1
        this.scene.pushMatrix();
        this.scene.translate(-this.backwall_width / 2 + this.walls_thick / 2, this.leftBordersHeight * 1.5, -this.leftWallWidht - this.leftWindowWidth / 2);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.leftBorders.display();
        this.scene.popMatrix();

        //LEFT WINDOW1
        this.scene.pushMatrix();
        this.scene.translate(-this.backwall_width / 2, 0, -this.leftWallWidht);
        this.scene.rotate(this.leftWindowAngle, 0, 1, 0);
        this.scene.translate(-this.leftWindowWidth / 4, 0, 0);
        this.leftWindow.display();
        this.scene.popMatrix();

        //LEFT WINDOW2
        this.scene.pushMatrix();
        this.scene.translate(-this.backwall_width / 2, 0, -this.leftWallWidht - this.leftWindowWidth);
        this.scene.rotate(-this.leftWindowAngle, 0, 1, 0);
        this.scene.translate(-this.leftWindowWidth / 4, 0, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.leftWindow.display();
        this.scene.popMatrix();
    }

    displayBackWall() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -(this.sideWalls_width + this.walls_thick / 2));
        this.backWindow.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, this.backWindowHeight/2 + this.backBordersHeight/2, -(this.sideWalls_width + this.walls_thick / 2));
        this.backBorder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -this.backWindowHeight/2 - this.backBordersHeight/2, -(this.sideWalls_width + this.walls_thick / 2));
        this.backBorder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.backWindowWidth/2 + this.backSideBordersWidth/2, 0, -(this.sideWalls_width + this.walls_thick / 2));
        this.backBorderSides.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-this.backWindowWidth/2 - this.backSideBordersWidth/2, 0, -(this.sideWalls_width + this.walls_thick / 2));
        this.backBorderSides.display();
        this.scene.popMatrix();
    }

    updateBuffers() {}
}

