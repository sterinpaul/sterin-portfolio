"use client";

import { useEffect, useMemo, useState } from "react";
import { PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

/**
 * The page-wide background layer: raymarched liquid-chrome metaballs (ported from
 * the "A · Liquid Chrome" design). One ball follows the cursor; the whole form
 * drifts to a new spot as you scroll. The canvas is fixed behind the content.
 */

type Key = { p: number; x: number; y: number; z: number; s: number };

// Where the form sits at each point of overall page scroll (0 = top, 1 = bottom).
const KEYS: Key[] = [
  { p: 0.0, x: 1.75, y: 0.0, z: 0.0, s: 1.0 },
  { p: 0.18, x: -2.4, y: -0.15, z: -1.2, s: 0.78 },
  { p: 0.45, x: 2.7, y: 0.25, z: -2.4, s: 0.6 },
  { p: 0.72, x: -2.7, y: -0.1, z: -2.0, s: 0.6 },
  { p: 1.0, x: 0.0, y: -0.55, z: -0.8, s: 0.85 },
];

const smooth = (t: number) => t * t * (3 - 2 * t);

function sampleKeys(p: number): Key {
  if (p <= KEYS[0].p) return KEYS[0];
  for (let i = 0; i < KEYS.length - 1; i++) {
    const a = KEYS[i];
    const b = KEYS[i + 1];
    if (p <= b.p) {
      const t = smooth((p - a.p) / (b.p - a.p));
      return {
        p,
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        z: a.z + (b.z - a.z) * t,
        s: a.s + (b.s - a.s) * t,
      };
    }
  }
  return KEYS[KEYS.length - 1];
}

function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

const VERT = "void main(){gl_Position=vec4(position.xy,0.,1.);}";

// Shader from the design, plus o (scroll offset, uv units) and s (scroll scale).
// Alpha is 0 where nothing is hit so the page background shows through.
const FRAG = `
precision highp float;
uniform vec2 r; uniform float t; uniform vec2 m; uniform vec2 o; uniform float s;
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
float map(vec3 p){
  p/=s;
  float d=length(p-vec3(sin(t*.7)*.5,cos(t*.5)*.25,0.))-.78;
  d=smin(d,length(p-vec3(cos(t*.6)*.95,sin(t*.8)*.55,sin(t*.4)*.4))-.42,.55);
  d=smin(d,length(p-vec3(sin(t*.45+2.)*.7,-.75+cos(t*.9)*.2,.2))-.32,.5);
  d=smin(d,length(p-vec3(m.x*1.5,m.y*1.1,.45))-.3,.6);
  d+=.035*sin(p.x*5.+t*1.2)*sin(p.y*5.+t)*sin(p.z*5.+t*.7);
  return d*s;}
vec3 nor(vec3 p){vec2 k=vec2(1.,-1.)*.002;return normalize(k.xyy*map(p+k.xyy)+k.yyx*map(p+k.yyx)+k.yxy*map(p+k.yxy)+k.xxx*map(p+k.xxx));}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*r)/r.y-o;
  vec3 ro=vec3(0.,0.,3.3); vec3 rd=normalize(vec3(uv,-1.7));
  // Skip pixels whose ray misses the bounding sphere of all blobs (most of the screen).
  float R=2.2*s; float b=dot(ro,rd); float c=dot(ro,ro)-R*R; float disc=b*b-c;
  if(disc<0.){gl_FragColor=vec4(0.);return;}
  float d=max(0.,-b-sqrt(disc)); float hit=0.;
  float mh=1e9; float md=d; // closest approach, used to anti-alias the silhouette
  for(int i=0;i<STEPS;i++){float h=map(ro+rd*d); if(h<mh){mh=h;md=d;} if(h<.003){hit=1.;break;} d+=h; if(d>7.)break;}
  // Rays that just miss get partial coverage across ~2 pixels instead of a hard on/off edge.
  float a=1.;
  if(hit<.5){float pw=2.*md/(1.7*r.y); a=1.-smoothstep(0.,pw,mh); if(a<=0.){gl_FragColor=vec4(0.);return;} d=md;}
  vec3 p=ro+rd*d; vec3 n=nor(p); vec3 rf=reflect(rd,n);
  float fr=pow(1.-max(dot(n,-rd),0.),2.2);
  vec3 ir=.5+.5*cos(6.2831*(fr*1.1+rf.y*.3+vec3(0.,.33,.67)+t*.04));
  float env=smoothstep(-.3,.7,rf.y);
  float spec=pow(max(dot(rf,normalize(vec3(.5,.8,.6))),0.),48.);
  float rim=pow(max(dot(rf,normalize(vec3(-.8,-.2,.4))),0.),6.);
  vec3 col=mix(vec3(.015),vec3(.75),env)*.55+ir*fr*.85+spec*1.2+rim*.25*ir;
  gl_FragColor=vec4(pow(col,vec3(.4545)),a);}
`;

// World x of the old keys (±2.7) maps to uv offset; 1.75 -> 0.42 as in the design.
const X_TO_UV = 0.24;

function LiquidChrome({ reduced }: { reduced: boolean }) {
  const narrowScreen = useMemo(() => window.innerWidth < 820, []);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        defines: { STEPS: narrowScreen ? 36 : 52 },
        transparent: true,
        depthTest: false,
        uniforms: {
          r: { value: new THREE.Vector2(1, 1) },
          t: { value: 0 },
          m: { value: new THREE.Vector2() },
          o: { value: new THREE.Vector2(1.75 * X_TO_UV, 0) },
          s: { value: 1 },
        },
      }),
    [narrowScreen],
  );
  const size = useMemo(() => new THREE.Vector2(), []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const u = material.uniforms;
    const k = sampleKeys(scrollProgress());
    const narrow = state.size.width < 820;

    state.gl.getDrawingBufferSize(size);
    u.r.value.copy(size);
    if (!reduced) u.t.value += dt;

    // Same easing as the design (~0.05 per frame at 60fps).
    u.m.value.x = THREE.MathUtils.damp(u.m.value.x, state.pointer.x, 3, dt);
    u.m.value.y = THREE.MathUtils.damp(u.m.value.y, state.pointer.y, 3, dt);

    const ox = (narrow ? k.x * 0.28 : k.x) * X_TO_UV;
    const oy = (narrow ? k.y - 0.95 : k.y) * X_TO_UV;
    const ts = narrow ? k.s * 0.68 : k.s;
    u.o.value.x = THREE.MathUtils.damp(u.o.value.x, ox, 1.6, dt);
    u.o.value.y = THREE.MathUtils.damp(u.o.value.y, oy, 1.6, dt);
    u.s.value = THREE.MathUtils.damp(u.s.value, ts, 1.6, dt);
  });

  return (
    <mesh frustumCulled={false} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}

// Pixel budget for the shader: the blob is soft, so a capped, upscaled buffer looks the same
// but keeps GPU time per frame low enough that scrolling never waits on it.
function budgetDpr(factor = 1) {
  const area = window.innerWidth * window.innerHeight;
  const max = window.innerWidth < 820 ? 0.75 : 0.9;
  return Math.max(0.35, Math.min(max, Math.sqrt(520_000 / area)) * factor);
}

export default function ChromeScene() {
  const [reduced, setReduced] = useState(false);
  const [quality, setQuality] = useState(1);
  const [source, setSource] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    setSource(document.body);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!source) return null;

  return (
    <div className="scene" aria-hidden="true" data-sy>
      <Canvas
        dpr={budgetDpr(quality)}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        eventSource={source}
        eventPrefix="client"
      >
        {/* If the device starts dropping frames, render fewer pixels (and recover when it can). */}
        <PerformanceMonitor
          onDecline={() => setQuality((q) => Math.max(0.6, q - 0.2))}
          onIncline={() => setQuality((q) => Math.min(1, q + 0.1))}
        />
        <LiquidChrome reduced={reduced} />
      </Canvas>
    </div>
  );
}
