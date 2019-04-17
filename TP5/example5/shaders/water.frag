#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D waterTex;
uniform sampler2D waterMap;
uniform float timeFactor;

void main() {
	vec4 color = texture2D(waterTex, vTextureCoord+vec2(timeFactor*.01,timeFactor*.01));
	gl_FragColor = color;
}
