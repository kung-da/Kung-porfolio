export const SAKURA_POINT_VSH = `
uniform mat4 uProjection;
uniform mat4 uModelview;
uniform vec3 uResolution;
uniform vec3 uOffset;
uniform vec3 uDOF;
uniform vec3 uFade;

attribute vec3 aPosition;
attribute vec3 aEuler;
attribute vec2 aMisc;

varying vec2 vCoord;
varying float vAlpha;
varying float vDepthFade;
varying float vDiffuse;
varying float vSpecular;
varying float vBlurStop;

varying vec3 vNormX;
varying vec3 vNormY;
varying vec3 vNormZ;

void main(void) {
  vec4 pos = uModelview * vec4(aPosition + uOffset, 1.0);
  gl_Position = uProjection * pos;
  gl_PointSize = aMisc.x * uProjection[1][1] / -pos.z * uResolution.y * 0.5;

  float dist = length(pos.xyz);
  vAlpha = smoothstep(0.0, 1.0, (dist - 0.1) / uFade.z) * aMisc.y;
  vBlurStop = pow(clamp((abs(dist - uDOF.x) - uDOF.y) / uDOF.z, 0.0, 1.0), 0.5);
  vDepthFade = min(1.0, exp((uFade.x - dist) * 0.69315 / uFade.y));

  vec3 sn = sin(aEuler);
  vec3 cs = cos(aEuler);
  mat3 rotx = mat3(1.0, 0.0, 0.0, 0.0, cs.x, sn.x, 0.0, -sn.x, cs.x);
  mat3 roty = mat3(cs.y, 0.0, -sn.y, 0.0, 1.0, 0.0, sn.y, 0.0, cs.y);
  mat3 rotz = mat3(cs.z, sn.z, 0.0, -sn.z, cs.z, 0.0, 0.0, 0.0, 1.0);
  mat3 rotmat = rotx * roty * rotz;
  mat3 trrotm = mat3(
    rotmat[0][0], rotmat[1][0], rotmat[2][0],
    rotmat[0][1], rotmat[1][1], rotmat[2][1],
    rotmat[0][2], rotmat[1][2], rotmat[2][2]
  );

  vNormX = trrotm[0];
  vNormY = trrotm[1];
  vNormZ = trrotm[2];

  vec3 normal = rotmat[2];
  const vec3 light = vec3(0.58, 0.72, -0.38);
  float lit = dot(light, normal);
  if (lit < 0.0) {
    normal = -normal;
    lit = dot(light, normal);
  }

  vDiffuse = 0.54 + lit * 0.58;
  vec3 eye = normalize(-pos.xyz);
  vec3 halfv = normalize(eye + light);
  vSpecular = pow(max(dot(halfv, normal), 0.0), 26.0);
}
`;

export const SAKURA_POINT_FSH = `
#ifdef GL_ES
precision highp float;
#endif

varying float vAlpha;
varying float vDepthFade;
varying float vDiffuse;
varying float vSpecular;
varying float vBlurStop;

varying vec3 vNormX;
varying vec3 vNormY;
varying vec3 vNormZ;

float ellipse(vec2 p, vec2 origin, vec2 radius) {
  vec2 lp = (p - origin) / radius;
  return length(lp) - 1.0;
}

void main(void) {
  vec3 point = vec3(gl_PointCoord - vec2(0.5), 0.0) * 2.0;
  float nz = vNormZ.z;
  if (abs(nz) < 0.0001) discard;

  vec3 mapped = point + vec3(0.0, 0.0, -1.0) * dot(vNormZ, point) / nz;
  vec2 coord = vec2(dot(vNormX, mapped), dot(vNormY, mapped));

  const float sn = 0.258819045102521;
  const float cs = 0.965925826289068;
  mat2 petalRot = mat2(cs, -sn, sn, cs);
  vec2 petal = vec2(abs(coord.x), coord.y) * petalRot;

  float shape;
  if (petal.x < 0.0) {
    shape = ellipse(petal, vec2(0.065, 0.024) * 0.5, vec2(0.36, 0.96) * 0.5);
  } else {
    shape = ellipse(petal, vec2(0.065, 0.024) * 0.5, vec2(0.58, 0.96) * 0.5);
  }
  if (shape > vBlurStop) discard;

  float grady = mix(0.0, 1.0, pow(coord.y * 0.5 + 0.5, 0.35));
  float body = (vBlurStop > 0.001) ? (0.5 - shape / (vBlurStop * 2.0)) : 1.0;
  float edge = smoothstep(0.0, 1.0, body);
  float rim = smoothstep(-0.06, 0.03, shape) * smoothstep(vBlurStop, 0.0, shape);
  float centerVein = exp(-abs(coord.x) * 23.0) * smoothstep(-0.38, 0.42, coord.y) * smoothstep(0.58, -0.2, coord.y);
  float sideVeins = (
    exp(-abs(coord.x - coord.y * 0.18 - 0.055) * 34.0) +
    exp(-abs(coord.x + coord.y * 0.18 + 0.055) * 34.0)
  ) * smoothstep(-0.35, 0.28, coord.y) * 0.055;
  float blushBand = smoothstep(-0.55, 0.18, coord.y) * smoothstep(0.68, -0.04, abs(coord.x));
  float tipNotch = smoothstep(0.16, 0.0, length((coord - vec2(0.0, 0.54)) * vec2(1.35, 1.0)));
  float fiber = sin((coord.y * 42.0 + coord.x * 16.0)) * 0.012;

  vec3 base = mix(vec3(1.0, 0.73, 0.82), vec3(1.0, 0.92, 0.94), clamp(shape + 0.56, 0.0, 1.0));
  vec3 color = base * vec3(1.0, grady * 0.96 + 0.08, grady * 0.98 + 0.1);
  color = mix(color, vec3(1.0, 0.54, 0.70), blushBand * 0.18);
  color = mix(color, vec3(1.0, 0.97, 0.98), rim * 0.22);
  color -= vec3(0.06, 0.02, 0.025) * tipNotch;
  color += vec3(0.18, 0.04, 0.08) * (centerVein * 0.13 + sideVeins);
  color += fiber;
  color *= vDiffuse;
  color += vec3(1.0, 0.9, 0.96) * vSpecular * 0.28;
  color = mix(vec3(0.30, 0.08, 0.14), color, vDepthFade);

  float alpha = edge * vAlpha * 1.14;
  alpha *= 1.0 - tipNotch * 0.38;
  alpha *= smoothstep(0.96, 0.22, length(gl_PointCoord - vec2(0.5)));

  gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.86));
}
`;
