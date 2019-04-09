/**
 * MyMaterial
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyMaterial extends CGFappearance {
    constructor(scene, texturePath, wrap, shine, properties) {
        super(scene);
        let defaultShine = 10.0;
        let defaultProperties = [
            0.7, 0.7, 0.7, 1.0,     //Ambient
            0.4, 0.4, 0.4, 1.0,     //Diffuse
            0.05, 0.05, 0.05, 0.2,     //Specular
        ];
        let defaultWrap = [
            'REPEAT',   //x
            'REPEAT',   //y
        ];

        if(texturePath != undefined)
        {
            this.setTexture(new CGFtexture(scene, texturePath));
        }

        if(wrap != undefined) {
            this.setTextureWrap(...wrap);
        }
        else {
            this.setTextureWrap(...defaultWrap);
        }

        if(shine != undefined) {
            this.setShininess(shine);
        }
        else {
            this.setShininess(defaultShine);
        }

        if(properties != undefined)
        {
            this.setAmbient(...properties.slice(0,4));
            this.setDiffuse(...properties.slice(4,8));
            this.setSpecular(...properties.slice(8,12));
        }
        else {
            this.setAmbient(...defaultProperties.slice(0,4));
            this.setDiffuse(...defaultProperties.slice(4,8));
            this.setSpecular(...defaultProperties.slice(8,12));
        }
    }
}

