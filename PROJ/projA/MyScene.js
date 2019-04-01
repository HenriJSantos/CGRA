/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.enableTextures(true);

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.cubeMap = new MyCubeMap(this, "DayLake");
        let grassTexture = new CGFtexture(this, 'textures/grassTexture.jpg');
        this.floor = new MyFloor(this, 60, grassTexture);
        let treeTopTexture = new CGFtexture(this, 'textures/treeTopTexture.jpg');
        let trunkTexture = new CGFtexture(this, 'textures/trunkTexture.jpg');
        this.tree = new MyTree(this, 2, 0.5, 3, 3, trunkTexture, treeTopTexture);
        this.treePatch = new MyTreeGroupPatch(this,6,2,0.5,3,3,trunkTexture,treeTopTexture);
        this.house = new MyHouse(this);

        //Objects connected to MyInterface
        this.scaleFactor = 1.0;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
        //this.floor.display();
        this.cubeMap.display();
        this.pushMatrix();
        this.translate(-15,0,-15);
        //this.treePatch.display();
        this.popMatrix();

        this.pushMatrix();
        //this.translate(0,2,15);
        //this.house.display();
        this.tree.display();
        this.popMatrix();

        // ---- END Primitive drawing section
    }
}