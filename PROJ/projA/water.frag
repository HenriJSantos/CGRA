#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D waterMap;
uniform sampler2D waterTex;
uniform float timeStep;

void main() {
    vec2 NewTexCoord = vTextureCoord;

	vec4 color = texture2D(waterTex, NewTexCoord + timeStep);

	gl_FragColor = color;
}