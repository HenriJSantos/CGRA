attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler2;

varying vec2 vTextureCoord;
varying float height;

void main() {
    vec3 offset=vec3(0.0,0.0,0.0);

    vec4 tex = texture2D (uSampler2, aTextureCoord);
    offset = aVertexNormal*tex.b*10.0;

    vec3 position = aVertexPosition + offset;

    gl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);

    vTextureCoord = aTextureCoord;
    height = tex.b;
}