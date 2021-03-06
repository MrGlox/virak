#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 v_uv;

float random (vec2 st, float seed) {
  const float a = 12.9898;
  const float b = 78.233;
  const float c = 43758.543123;
  return fract(sin(dot(st, vec2(a, b)) * seed) * c);
}

void main(){    
  vec3 color = random(v_uv, u_time) * vec3(1.0);
  gl_FragColor  = vec4(color, 1.0);
}


/**
 * CUSTOM BETTER NOISE
 */
// uniform vec2 u_resolution;
// uniform vec2 u_mouse;
// uniform float u_time;
// uniform vec3 u_color_a;
// uniform vec3 u_color_b;

// varying vec2 v_uv;

// // 2D Random
// float random (vec2 st) {
//     return fract(sin(dot(st, vec2(12.9898,78.233)) * sin(u_time))
//                  * 43758.5453123);
// }

// // 2D Noise based on Morgan McGuire @morgan3d
// // https://www.shadertoy.com/view/4dS3Wd
// float noise (vec2 st) {
//     vec2 i = floor(st);
//     vec2 f = fract(st);

//     // Four corners in 2D of a tile
//     float a = random(i);
//     float b = random(i + vec2(1.0, 0.0));
//     float c = random(i + vec2(0.0, 1.0));
//     float d = random(i + vec2(1.0, 1.0));

//     // Smooth Interpolation

//     // Cubic Hermine Curve.  Same as SmoothStep()
//     vec2 u = f*f*(3.0-2.0*f);
//     // u = smoothstep(0.,1.,f);

//     // Mix 4 coorners percentages
//     return mix(a, b, u.x) +
//             (c - a)* u.y * (1.0 - u.x) +
//             (d - b) * u.x * u.y;
// }

// void main() {
//     vec2 st = v_uv;

//     // Scale the coordinate system to see
//     // some noise in action
//     vec2 pos = vec2(st*1000.0);

//     // Use the noise function
//     float n = noise(pos); 
//     n = smoothstep(0.4, 0.6, n);

//     gl_FragColor = vec4(vec3(n), 1.0);
// }