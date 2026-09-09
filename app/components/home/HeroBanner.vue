<template>
  <div class="w-full space-y-6">
    
    <!-- HERO PRINCIPAL: SU ALTURA SE ADAPTA DIRECTAMENTE A LA FOTO -->
    <section class="relative w-full h-auto bg-black  overflow-hidden px-6 sm:px-12 lg:px-20 pt-6 pb-6">
      
      <!-- CONTENEDOR DEL AGUJERO NEGRO (CANVAS WEBGL) -->
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <canvas ref="blackHoleCanvas" class="w-full h-full block opacity-0 transition-opacity duration-700"></canvas>
      </div>

      <!-- TEXTO MASIVO DE FONDO (GAMING SUBIDO EN DESKTOP) -->
      <div class="absolute inset-0 z-0 flex items-center lg:items-start lg:pt-24 justify-center pointer-events-none select-none overflow-hidden">
        <h1 class="font-['Rajdhani'] font-black uppercase text-white/30 drop-shadow-[0_0_55px_rgba(255,255,255,0.22)] text-[22vw] sm:text-[26vw] lg:text-[30vw] leading-none tracking-tighter transition-all">
          GAMING
        </h1>
      </div>

      <!-- PERSONAJE / RENDER 3D: DICTA LA ALTURA DE LA SECCIÓN Y TOCA BORDES LATERALES -->
      <div class="relative z-10 w-full flex items-end justify-center pointer-events-none overflow-hidden">
        <img 
          src="~/assets/img/fotofrente.png" 
          alt="Gaming Player" 
          class="w-full h-auto object-cover object-bottom filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] transition-transform duration-1000 ease-in-out"
        />
      </div>

      <!-- CONTENIDO FLOTANTE INFERIOR (SUBIDO EN DESKTOP AL 42%) -->
      <div class="absolute inset-x-0 top-[65%] sm:top-[50%] lg:top-[42%] z-20 max-w-[1500px] mx-auto px-6 sm:px-12 lg:px-20 w-full flex items-end justify-between pointer-events-none">
        
        <div class="max-w-sm w-full space-y-4 text-center sm:text-left bg-black/50 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-4 sm:p-0 rounded-2xl border border-white/10 sm:border-none pointer-events-auto">
          <h2 class="font-['Rajdhani'] text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-none drop-shadow-md">
            Compite y Domina <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              Los Torneos
            </span>
          </h2>

          <!-- BOTÓN PRINCIPAL TAMAÑO CTA -->
          <div class="flex items-center justify-center sm:justify-start gap-3 pt-2">
            <NuxtLink 
              to="/valorant" 
              class="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-zinc-200 text-black font-['Rajdhani'] font-black text-lg uppercase tracking-wider transition-all duration-300 shadow-xl shadow-white/10 w-full sm:w-auto"
            >
              <span>Crear Torneo</span>
              <UIcon name="i-heroicons-arrow-up-right" class="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </NuxtLink>
          </div>
        </div>

      </div>

    </section>

    <!-- BANDA INFERIOR EDITORIAL -->
    <div class="max-w-[1380px] mx-auto px-4 sm:px-6">
      <section class="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        <!-- Bloque Izquierdo: Social Proof -->
        <div class="md:col-span-5 lg:col-span-4 bg-zinc-900 border border-zinc-800/80 rounded-full py-4 px-6 flex items-center justify-between shadow-md">
          <div class="flex -space-x-2.5">
            <span class="w-9 h-9 rounded-full border-2 border-zinc-900 bg-red-600 flex items-center justify-center text-xs font-bold text-white shadow">V</span>
            <span class="w-9 h-9 rounded-full border-2 border-zinc-900 bg-zinc-700 flex items-center justify-center text-xs font-bold text-white shadow">L</span>
            <span class="w-9 h-9 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[10px] font-mono text-zinc-300 font-bold">+50</span>
          </div>
          <div class="text-right">
            <p class="text-[11px] font-mono text-zinc-400 uppercase">Organizaciones</p>
            <p class="font-['Rajdhani'] font-bold text-zinc-200 text-sm">Verificadas</p>
          </div>
        </div>

        <!-- Bloque Derecho: Descripción -->
        <div class="md:col-span-7 lg:col-span-8 bg-zinc-900/60 border border-zinc-800/80 rounded-3xl md:rounded-full py-4 px-8 flex items-center">
          <p class="text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal text-left">
            Explora el ecosistema de torneos eSports clasificados por disciplina, modalidades únicas, seguimiento de brackets en vivo e historial competitivo sin complicaciones.
          </p>
        </div>

      </section>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const blackHoleCanvas = ref(null)

let THREE, renderer, scene, camera, animFrameId
let rtScene, rtA, rtB, matSim, matBright, matBlur, matComp, mesh

const GLSL_COMMON = `
  vec3 decode(vec3 e){ e = min(e, vec3(0.996)); return e / (1.0 - e); }
  vec3 encode(vec3 c){ return c / (1.0 + c); }
`

const VERT = 'void main(){ gl_Position = vec4(position, 1.0); }'
const VERT_UV = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }'

const FRAG_SIM = GLSL_COMMON + `
uniform float uTime, uCamDist, uYaw, uPitch, uVel, uTemp, uPasos;
uniform vec2 uRes;

float hash21(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise2(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p){
  float v = 0.0; float a = 0.55;
  for(int i = 0; i < 3; i++){
    v += a * noise2(p);
    p = p * 2.13 + vec2(13.7, 7.1);
    a *= 0.5;
  }
  return v;
}

vec3 colorGas(float r, float rIn, float rOut){
  float t = clamp((r - rIn) / (rOut - rIn), 0.0, 1.0);
  vec3 nucleo = mix(vec3(1.00, 0.98, 0.94), vec3(0.80, 0.90, 1.00), uTemp);
  vec3 medio  = vec3(1.00, 0.60, 0.20);
  vec3 borde  = vec3(0.50, 0.14, 0.03);
  vec3 c = mix(nucleo, medio, smoothstep(0.0, 0.40, t));
  return mix(c, borde, smoothstep(0.40, 1.0, t));
}

vec4 disco(vec3 p, vec3 rd, float rIn, float rOut){
  float r = length(p.xz);
  if(r < rIn - 0.4 || r > rOut) return vec4(0.0);

  float H = 0.085 + 0.34 * pow(clamp((r - 2.0) / 11.0, 0.0, 1.0), 1.7);
  float y = p.y / H;
  if(abs(y) > 3.5) return vec4(0.0);

  float vertical = exp(-y * y * 2.1);
  float bruma = exp(-y * y * 0.45) * 0.16;

  float ang = atan(p.z, p.x);
  float omega = uVel * 0.9 / pow(r, 1.5);
  float a1 = ang + uTime * omega * 9.0;

  float brazos = fbm(vec2(r * 2.2, a1 * 2.4));
  float hebras = fbm(vec2(r * 14.0 - uTime * 0.05, a1 * 1.3) + 7.3);
  float hilos  = noise2(vec2(r * 46.0, a1 * 4.0));

  float dens = brazos * 0.42 + hebras * 0.38 + hilos * 0.14;
  dens = smoothstep(0.12, 1.05, dens);
  dens = dens * dens * (1.2 + 0.5 * hebras);
  dens = dens * vertical + bruma * (0.4 + 0.6 * brazos);
  dens *= smoothstep(rIn - 0.4, rIn + 0.45, r);
  dens *= 1.0 - smoothstep(rOut - 2.6, rOut, r);

  if(dens < 0.003) return vec4(0.0);

  float perfil = pow(3.0 / r, 1.9);
  vec3 col = colorGas(r, rIn, rOut);
  col = mix(col, vec3(1.0, 0.99, 0.95), clamp(perfil * 0.45, 0.0, 0.9));

  return vec4(col * perfil * dens, dens);
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  float cy = cos(uYaw); float sy = sin(uYaw);
  float cp = cos(uPitch); float sp = sin(uPitch);
  vec3 ro = uCamDist * vec3(cy * cp, sp, sy * cp);
  vec3 fw = normalize(-ro);
  vec3 rt = normalize(cross(fw, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(rt, fw);
  vec3 rd = normalize(fw * 1.5 + uv.x * rt + uv.y * up);

  vec3 p = ro; vec3 v = rd;
  vec3 hVec = cross(p, v);
  float h2 = dot(hVec, hVec);

  float rIn = 3.0; float rOut = 13.0;
  vec3 col = vec3(0.0);
  float transmit = 1.0;
  float capturado = 0.0;
  float minR = 100000.0;

  for(int i = 0; i < 80; i++){
    if(float(i) >= uPasos) break;

    float r2 = dot(p, p);
    float r = sqrt(r2);
    minR = min(minR, r);

    float dt = clamp(r * 0.08, 0.025, 0.5);
    float grosor = 0.085 + 0.34 * pow(clamp((r - 2.0) / 11.0, 0.0, 1.0), 1.7);
    if(abs(p.y) < grosor * 3.5 && r > rIn - 1.0 && r < rOut + 0.5) dt *= 0.5;

    vec3 a = -1.5 * h2 * p / (r2 * r2 * r);
    v += a * dt;
    p += v * dt;

    if(dot(p, p) < 1.0){ capturado = 1.0; break; }

    if(transmit > 0.012){
      vec4 d = disco(p, normalize(v), rIn, rOut);
      if(d.a > 0.0){
        col += d.rgb * transmit * dt * 4.6;
        transmit *= exp(-d.a * dt * 2.8);
      }
    }

    if(dot(p, p) > 1400.0) break;
  }

  float halo = exp(-abs(minR - 1.5) * 3.0);
  col += vec3(1.0, 0.80, 0.52) * halo * 0.45 * mix(1.0, 0.35, capturado);
  col += vec3(1.0, 0.62, 0.32) * exp(-minR * 0.34) * 0.10;

  gl_FragColor = vec4(encode(col), 1.0);
}
`

const FRAG_BRIGHT = GLSL_COMMON + `
uniform sampler2D tSrc;
varying vec2 vUv;
void main(){
  vec3 c = decode(texture2D(tSrc, vUv).rgb);
  c = max(c - 0.85, vec3(0.0));
  gl_FragColor = vec4(encode(c), 1.0);
}
`

const FRAG_BLUR = GLSL_COMMON + `
uniform sampler2D tSrc;
uniform vec2 uDir, uRes;
varying vec2 vUv;
void main(){
  vec2 px = uDir / uRes;
  vec3 suma = decode(texture2D(tSrc, vUv).rgb) * 0.227;
  float pesos[4];
  pesos[0] = 0.194; pesos[1] = 0.121; pesos[2] = 0.054; pesos[3] = 0.016;
  for(int i = 1; i <= 4; i++){
    float o = float(i) * 1.6;
    suma += decode(texture2D(tSrc, vUv + px * o).rgb) * pesos[i-1];
    suma += decode(texture2D(tSrc, vUv - px * o).rgb) * pesos[i-1];
  }
  gl_FragColor = vec4(encode(suma), 1.0);
}
`

const FRAG_COMP = GLSL_COMMON + `
uniform sampler2D tEscena, tBloom;
uniform float uAspecto;
varying vec2 vUv;
vec3 aces(vec3 x){
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}
void main(){
  vec2 centro = vUv - 0.5;
  centro.x *= uAspecto;
  float radial = length(centro);

  vec3 col = decode(texture2D(tEscena, vUv).rgb);
  col += decode(texture2D(tBloom, vUv).rgb) * 0.75;
  col = aces(col);
  col = pow(col, vec3(1.0 / 1.10));
  col *= 1.0 - smoothstep(0.45, 1.05, radial) * 0.55;

  gl_FragColor = vec4(col, 1.0);
}
`

let uSim, uBright, uBlur, uComp
let yaw = 0, pitch = 0.12, dist = 27

async function initThree() {
  const canvas = blackHoleCanvas.value
  if (!canvas) return

  // Importación dinámica para evitar ralentizar la carga inicial de la página
  THREE = await import('three')

  const parent = canvas.parentElement
  const width = parent.clientWidth
  const height = parent.clientHeight

  renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' })
  renderer.setPixelRatio(0.75) // Renderizado a resolución optimizada
  renderer.setSize(width, height)

  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  uSim = {
    uTime: { value: 0 },
    uRes: { value: new THREE.Vector2(width * renderer.getPixelRatio(), height * renderer.getPixelRatio()) },
    uCamDist: { value: dist },
    uYaw: { value: yaw },
    uPitch: { value: pitch },
    uVel: { value: 1.45 },
    uTemp: { value: 0.76 },
    uPasos: { value: 80.0 }
  }

  uBright = { tSrc: { value: null } }
  uBlur = { tSrc: { value: null }, uDir: { value: new THREE.Vector2(1, 0) }, uRes: { value: new THREE.Vector2(1, 1) } }
  uComp = { tEscena: { value: null }, tBloom: { value: null }, uAspecto: { value: width / height } }

  matSim = new THREE.ShaderMaterial({ uniforms: uSim, vertexShader: VERT, fragmentShader: FRAG_SIM })
  matBright = new THREE.ShaderMaterial({ uniforms: uBright, vertexShader: VERT_UV, fragmentShader: FRAG_BRIGHT })
  matBlur = new THREE.ShaderMaterial({ uniforms: uBlur, vertexShader: VERT_UV, fragmentShader: FRAG_BLUR })
  matComp = new THREE.ShaderMaterial({ uniforms: uComp, vertexShader: VERT_UV, fragmentShader: FRAG_COMP })

  mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), matSim)
  scene.add(mesh)

  rebuildRenderTargets(width, height)
  window.addEventListener('resize', onResize)

  // Mostrar el canvas con una transición suave una vez inicializado
  canvas.classList.remove('opacity-0')
  animFrameId = requestAnimationFrame(animate)
}

function rebuildRenderTargets(w, h) {
  const pr = renderer.getPixelRatio()
  const W = w * pr
  const H = h * pr

  if (rtScene) { rtScene.dispose(); rtA.dispose(); rtB.dispose(); }

  const opts = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat }
  rtScene = new THREE.WebGLRenderTarget(W, H, opts)
  rtA = new THREE.WebGLRenderTarget(W * 0.5, H * 0.5, opts)
  rtB = new THREE.WebGLRenderTarget(W * 0.5, H * 0.5, opts)
}

function onResize() {
  if (!renderer || !blackHoleCanvas.value) return
  const parent = blackHoleCanvas.value.parentElement
  const w = parent.clientWidth
  const h = parent.clientHeight

  renderer.setSize(w, h)
  uSim.uRes.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio())
  uComp.uAspecto.value = w / h
  rebuildRenderTargets(w, h)
}

function animate(time) {
  animFrameId = requestAnimationFrame(animate)

  yaw += 0.0015 // Movimiento orbital suave continuo

  uSim.uTime.value = time * 0.001
  uSim.uYaw.value = yaw
  uSim.uPitch.value = pitch

  mesh.material = matSim
  renderer.setRenderTarget(rtScene)
  renderer.render(scene, camera)

  mesh.material = matBright
  uBright.tSrc.value = rtScene.texture
  renderer.setRenderTarget(rtA)
  renderer.render(scene, camera)

  mesh.material = matBlur
  uBlur.uRes.value.set(rtA.width, rtA.height)
  uBlur.uDir.value.set(1, 0)
  uBlur.tSrc.value = rtA.texture
  renderer.setRenderTarget(rtB)
  renderer.render(scene, camera)

  uBlur.uDir.value.set(0, 1)
  uBlur.tSrc.value = rtB.texture
  renderer.setRenderTarget(rtA)
  renderer.render(scene, camera)

  mesh.material = matComp
  uComp.tEscena.value = rtScene.texture
  uComp.tBloom.value = rtA.texture
  renderer.setRenderTarget(null)
  renderer.render(scene, camera)
}

onMounted(() => {
  initThree()
})

onBeforeUnmount(() => {
  if (animFrameId) cancelAnimationFrame(animFrameId)
  window.removeEventListener('resize', onResize)
  if (renderer) renderer.dispose()
})
</script>