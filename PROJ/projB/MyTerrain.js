/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        this.terrainSize = 60;

        this.terrainTexture = new CGFtexture(this.scene, "images/terrain.jpg");
        this.terrainHeightMap = new CGFtexture(this.scene, "images/heightmap.png");
        this.terrainGradient = new CGFtexture(this.scene, "images/altimetry.png");
        this.ground = new Plane(scene, 60);
        this.shader = new CGFshader(this.scene.gl, "shaders/terrainShaders/terrain.vert", "shaders/terrainShaders/terrain.frag");
    }

    display() {
        this.shader.setUniformsValues({ gradient: 2 });
        this.shader.setUniformsValues({ uSampler2: 1 });
        this.shader.setUniformsValues({ uSampler: 0 });

        this.terrainTexture.bind(0);
        this.terrainHeightMap.bind(1);
        this.terrainGradient.bind(2);

        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix()
        this.scene.scale(this.terrainSize,1,this.terrainSize);
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.ground.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
    updateBuffers() {}
}