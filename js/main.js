// Configuración del renderizador
var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('myCanvas'),
  antialias: true,
});
renderer.setClearColor(0x000aff);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Configuración de la cámara
var camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.set(0, 0, 300);

// Configuración de la escena
var scene = new THREE.Scene();


// Crear estilos personalizados para dat.GUI
const style = document.createElement("style");
style.innerHTML = `
  /* Fondo y bordes del menú */
  .dg {
    background-color: #040fff !important; /* Color azul personalizado */
    border: 2px solid #040fff !important;
    border-radius: 8px;
  }

  /* Color de las carpetas */
  .dg .title {
    color: #fff !important; /* Texto blanco */
    background-color: #040fff !important; /* Fondo azul */
    padding: 4px 8px;
    font-size: 14px !important;
  }

  /* Sliders y campos de entrada */
  .dg .cr.number input[type="text"] {
    background-color: #040fff !important; /* Fondo azul */
    color: #fff !important; /* Texto blanco */
    border: 1px solid #040fff !important;
  }

  /* Inputs de color */
  .dg .cr.color input {
    border: 1px solid #040fff !important;
  }

  /* Hover sobre opciones */
  .dg .cr:hover {
    background-color: #333 !important; /* Fondo oscuro en hover */
  }

  /* Botones */
  .dg .button {
    background-color: #040fff !important;
    color: #fff !important;
    border: 1px solid #040fff !important;
    border-radius: 4px !important;
    padding: 5px 10px;
  }
`;
document.head.appendChild(style);

// Crear un contenedor para dat.GUI
const guiContainer = document.createElement("div");
guiContainer.style.position = "fixed";
guiContainer.style.top = "10px";
guiContainer.style.right = "10px";
guiContainer.style.zIndex = "1000"; // Asegura que esté por encima de otros elementos
guiContainer.style.display = "none"; // Oculto por defecto
document.body.appendChild(guiContainer);

// Configuración de dat.GUI en el contenedor
const gui = new dat.GUI({ autoPlace: false });
guiContainer.appendChild(gui.domElement);

// Luces
var ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Luz ambiental
scene.add(ambientLight);

var pointLight = new THREE.PointLight(0xffffff, 0.5); // Luz puntual
pointLight.position.set(5, 5, 5); // Posición inicial
scene.add(pointLight);

// Objeto de configuración para las luces
const lightSettings = {
  ambientLightColor: "#ffffff",
  ambientLightIntensity: 0.7,
  pointLightColor: "#ffffff",
  pointLightIntensity: 0.5,
  pointLightX: 5,
  pointLightY: 5,
  pointLightZ: 5,
};

// Configurar controles de luz ambiental
const ambientLightFolder = gui.addFolder("Ambient");
ambientLightFolder.addColor(lightSettings, "ambientLightColor").onChange((value) => {
  ambientLight.color.set(value);
});
ambientLightFolder.add(lightSettings, "ambientLightIntensity", 0, 1, 0.1).onChange((value) => {
  ambientLight.intensity = value;
});
ambientLightFolder.open();

// Configurar controles de luz puntual
const pointLightFolder = gui.addFolder("Puntual");
pointLightFolder.addColor(lightSettings, "pointLightColor").onChange((value) => {
  pointLight.color.set(value);
});
pointLightFolder.add(lightSettings, "pointLightIntensity", 0, 1, 0.1).onChange((value) => {
  pointLight.intensity = value;
});
pointLightFolder.add(lightSettings, "pointLightX", -10, 10, 0.1).onChange((value) => {
  pointLight.position.x = value;
});
pointLightFolder.add(lightSettings, "pointLightY", -10, 10, 0.1).onChange((value) => {
  pointLight.position.y = value;
});
pointLightFolder.add(lightSettings, "pointLightZ", -10, 10, 0.1).onChange((value) => {
  pointLight.position.z = value;
});
pointLightFolder.open();

// Mostrar/ocultar el menú al hacer doble clic
let guiVisible = false;

window.addEventListener("dblclick", function () {
  guiVisible = !guiVisible;
  guiContainer.style.display = guiVisible ? "block" : "none";
});





// Array de URLs de texturas (imagen 1, imagen 2, imagen 3, etc.)
var textureURLs = [
  'assets/FACE1-01.jpg',
  'assets/FACE1-02.jpg',
  'assets/FACE1-03.jpg',
  'assets/FACE1-03.jpg',
  'assets/FACE1-04.jpg',
  'assets/FACE1-05.jpg',
  'assets/FACE1-06.jpg',
  'assets/FACE2-01.jpg',
  'assets/FACE2-02.jpg',
  'assets/FACE2-03.jpg',
  'assets/FACE2-04.jpg',
  'assets/FACE2-06.jpg',
  'assets/FACE2-07.jpg',
  'assets/FACE3-01.jpg',
  'assets/FACE3-02.jpg',
  'assets/FACE3-03.jpg',
  'assets/FACE3-04.jpg',
  'assets/FACE3-05.jpg',
  'assets/FACE3-07.jpg',
  'assets/FACE4-01.jpg',
  'assets/FACE4-02.jpg',
  'assets/FACE4-04.jpg',
  'assets/FACE4-05.jpg',
  'assets/FACE4-06.jpg',
  'assets/FACE4-07.jpg',
  'assets/FACE4-08.jpg',
  'assets/bskvk.png',
];


// Cargar texturas
var textureLoader = new THREE.TextureLoader();
var textures = textureURLs.map((url) => textureLoader.load(url));

// Esfera
var geometry = new THREE.SphereGeometry(180, 32, 32);
var material = new THREE.MeshLambertMaterial({
  map: textures[0],
  side: THREE.BackSide,
});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Torus principal
var torusGeometry = new THREE.TorusGeometry(60, 13, 100, 100);
var torusMaterial = new THREE.MeshLambertMaterial({ map: textures[0] });
var torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
torusMesh.visible = false;
scene.add(torusMesh);

// Torus pequeño
var torusGeometry2 = new THREE.TorusGeometry(30, 13, 100, 100);
var torusMaterial2 = new THREE.MeshLambertMaterial({ map: textures[0] });
var torusMesh2 = new THREE.Mesh(torusGeometry2, torusMaterial2);
torusMesh2.visible = false;
scene.add(torusMesh2);

// Interacción
var isMouseDown = false;
var lastMouseX = 0;
var lastMouseY = 0;
var inertiaX = 0;
var inertiaY = 0;
var inertiaDecay = 0.95;

function onMouseDown(event) {
  isMouseDown = true;
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;
}

function onMouseMove(event) {
  if (isMouseDown) {
    var deltaX = event.clientX - lastMouseX;
    var deltaY = event.clientY - lastMouseY;

    inertiaX = deltaX * 0.005;
    inertiaY = deltaY * 0.005;

    mesh.rotation.x += inertiaY;
    mesh.rotation.y += inertiaX;
    torusMesh.rotation.x += inertiaY;
    torusMesh.rotation.y += inertiaX;
    torusMesh2.rotation.x += inertiaY;
    torusMesh2.rotation.y += inertiaX;

    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
  }
}

function onMouseUp() {
  isMouseDown = false;
}

var textureIndex = 0;
function changeTexture() {
  textureIndex = (textureIndex + 1) % textures.length;
  var newTexture = textures[textureIndex];
  mesh.material.map = newTexture;
  mesh.material.needsUpdate = true;
  torusMesh.material.map = newTexture;
  torusMesh.material.needsUpdate = true;
  torusMesh2.material.map = newTexture;
  torusMesh2.material.needsUpdate = true;
}

var torusActive = false;
function handleKeyDown(event) {
  torusActive = !torusActive;
  torusMesh.visible = torusActive;
  torusMesh2.visible = torusActive;
}

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);
 /////////



// Audio y Web Audio API
var audio = new Audio();
audio.crossOrigin = 'anonymous';
audio.loop = true;

// Establecer el audio preestablecido
audio.src = 'https://cdn.glitch.me/e3acd9f6-ba16-43c2-ad77-8a84c86c28e5/EXXE.2.mp3?v=1735612732383';
audio.play();

// Crear un contexto de audio
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioContext.createAnalyser();
var source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination); // Conectar para que el audio se escuche

analyser.fftSize = 256;
var frequencyData = new Uint8Array(analyser.frequencyBinCount);

var micStream = null; // Variable para almacenar el micrófono
var micAmplificationFactor = 4; // Factor inicial de amplificación (ajustado para mayor impacto)

// Crear un contenedor principal para los controles
var inputContainer = document.createElement('div');
inputContainer.style.position = 'fixed';
inputContainer.style.top = '300px';
inputContainer.style.left = '50%';
inputContainer.style.transform = 'translateX(-50%)';
inputContainer.style.padding = '10px';
inputContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
inputContainer.style.color = 'white';
inputContainer.style.borderRadius = '5px';
inputContainer.style.display = 'none'; // Oculto por defecto
document.body.appendChild(inputContainer);

// Crear un input para cargar el archivo de audio
var audioInput = document.createElement('input');
audioInput.type = 'file';
audioInput.id = 'audioInput';
audioInput.accept = 'audio/*';
audioInput.style.display = 'block';
audioInput.style.margin = '0 auto';
inputContainer.appendChild(audioInput);

// Botón para habilitar el micrófono
var micButton = document.createElement('button');
micButton.textContent = 'Usar Micrófono';
micButton.style.display = 'block';
micButton.style.margin = '10px auto'; // Centrar el botón horizontalmente
micButton.style.padding = '10px 20px';
micButton.style.backgroundColor = 'blue';
micButton.style.color = 'white';
micButton.style.border = 'none';
micButton.style.borderRadius = '5px';
micButton.style.cursor = 'pointer';
micButton.addEventListener('click', enableMicrophone);
inputContainer.appendChild(micButton);

// Control de amplificación
var amplificationControl = document.createElement('input');
amplificationControl.type = 'range';
amplificationControl.min = 4; // Incremento del rango mínimo
amplificationControl.max = 80; // Incremento del rango máximo
amplificationControl.step = 0.2;
amplificationControl.value = micAmplificationFactor;
amplificationControl.style.margin = '10px auto';
amplificationControl.style.display = 'block';
amplificationControl.style.width = '300px';
inputContainer.appendChild(amplificationControl);

amplificationControl.addEventListener('input', (event) => {
  micAmplificationFactor = parseFloat(event.target.value);
});

// Evento para mostrar el contenedor al hacer doble clic
document.addEventListener('dblclick', () => {
  inputContainer.style.display = 'block';
});

// Evento para ocultar el contenedor al presionar cualquier tecla
document.addEventListener('keydown', () => {
  inputContainer.style.display = 'none';
});

// Evento cuando el usuario selecciona un archivo de audio
audioInput.addEventListener('change', function (event) {
  var file = event.target.files[0];
  if (file && file.type.startsWith('audio/')) {
    var objectURL = URL.createObjectURL(file);
    audio.src = objectURL;
    audio.play();

    // Reconecta el nuevo audio al analyser y al destino
    source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination); // Asegura que se escuche el audio cargado
  } else {
    alert('Por favor selecciona un archivo de audio válido.');
  }
});

// Función para capturar audio del micrófono
function enableMicrophone() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      // Crear una fuente de media desde el micrófono
      micStream = audioContext.createMediaStreamSource(stream);

      // Conectar el micrófono al analyser (no al destino)
      micStream.connect(analyser);

      // Pausar el audio pregrabado
      audio.pause();

      // Desconectar el analyser del destino para silenciarlo
      analyser.disconnect(audioContext.destination);
    })
    .catch(error => {
      console.error('Error al acceder al micrófono:', error);
    });
}

// Función para actualizar la escala del torus
function updateTorusScale() {
  analyser.getByteFrequencyData(frequencyData);

  // Amplifica las frecuencias si se usa el micrófono
  if (micStream) {
    frequencyData = frequencyData.map(value => value * micAmplificationFactor);
  }

  var midRange = frequencyData.slice(frequencyData.length / 2, frequencyData.length);
  var average = midRange.reduce((sum, value) => sum + value, 0) / midRange.length;

  var scale = 1 + Math.pow(average / 256, 1.5) * 3;
  torusMesh2.scale.set(scale, scale, scale);
  torusMesh.scale.set(scale, scale, scale);
}

// Evento de redimensionamiento de ventana
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Función para cambiar dinámicamente las texturas
function dynamicChangeTexture() {
  changeTexture();

  analyser.getByteFrequencyData(frequencyData);

  var midRange = frequencyData.slice(
    frequencyData.length / 3,
    (frequencyData.length / 3) * 2
  );
  var average = midRange.reduce((sum, value) => sum + value, 0) / midRange.length;

  intervalTime = 500 - (average / 90) * 450 * micAmplificationFactor;
  intervalTime = Math.max(50, intervalTime);

  setTimeout(dynamicChangeTexture, intervalTime);
}

function render() {
  updateTorusScale();

  if (!isMouseDown) {
    mesh.rotation.y += 0.005;
    torusMesh.rotation.y += 0.01 + inertiaX;
    torusMesh.rotation.x += 0.005 + inertiaY;
    torusMesh2.rotation.y += 0.02 + inertiaX;
    torusMesh2.rotation.x += 0.01 + inertiaY;

    inertiaX *= inertiaDecay;
    inertiaY *= inertiaDecay;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

// Intervalo inicial
var intervalTime = 50;

// Inicia el bucle de cambio dinámico de texturas
dynamicChangeTexture();






//////

// Crear un objeto para mapear teclas a imágenes
var keyToImageMap = {

  a: 'assets/teclado/Asset 3.png',
  s: 'assets/teclado/dd2.png',
  d: 'assets/teclado/forms 1.png',
  f: 'assets/teclado/trib3 14.png',
  g: 'assets/teclado/Asset 10.png',
  h: 'assets/teclado/forms 2.png',
  j: 'assets/teclado/Asset 13.png',
  k: 'assets/teclado/lines.png',
  l: 'assets/teclado/Asset 12.png',
  ñ: 'assets/teclado/trib2 9.png',
  z: 'assets/teclado/trib2 3.png',
  x: 'assets/teclado/Asset 15.png',
  c: 'assets/teclado/Asset 8.png',
  v: 'assets/teclado/Asset 3.png',
  b: 'assets/teclado/trib3 12.png',
  n: 'assets/teclado/Asset 10.png',
  m: 'assets/teclado/trib3 11.png',
  q: 'assets/teclado/trib 8.png',
  w: 'assets/teclado/lines 3.png',
  e: 'assets/teclado/trib 12.png',
  r: 'assets/teclado/img_mask.png',
  t: 'assets/teclado/trib 9.png',
  y: 'assets/teclado/Asset 17.png',
  u: 'assets/teclado/trib 10.png',
  i: 'assets/teclado/lines 5.png',
  o: 'assets/teclado/trib 13.png',
  p: 'assets/teclado/dd4.png',
  // Agrega más teclas y URLs según sea necesario
};

// Crear un material y geometría para las imágenes
var planeMaterial = new THREE.MeshBasicMaterial({
  transparent: true,
  opacity: 1,
});
var planeGeometry = new THREE.PlaneGeometry(120, 120);
var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.visible = false;
scene.add(planeMesh);

planeMesh.position.set(0, 0, 100);

// Detectar teclas presionadas y cargar imágenes
window.addEventListener('keydown', function (event) {
  var imageUrl = keyToImageMap[event.key];
  if (imageUrl) {
    textureLoader.load(
      imageUrl,
      function (texture) {
        planeMaterial.map = texture;
        planeMaterial.needsUpdate = true;
        planeMesh.visible = true; // Mostrar la imagen
      },
      undefined,
      function (error) {
        console.error('Error al cargar la imagen:', error);
      }
    );
  }
});

window.addEventListener('keyup', function (event) {
  if (keyToImageMap[event.key]) {
    planeMesh.visible = false; // Ocultar la imagen al soltar la tecla
  }
});



render();

// Array de URLs de imágenes para el carrusel
var imageUrls = [
  'assets/FACE4-07.jpg',
  'assets/FACE3-05.jpg',
  'assets/FACE4-05.jpg',
  'assets/FACE4-06.jpg',
  'assets/FACE4-08.jpg',
  'assets/FACE3-07.jpg',
  'assets/FACE4-01.jpg',
];

// Crear un contenedor HTML para la imagen flotante
var floatingImage = document.createElement('img');
floatingImage.src = imageUrls[0]; // Mostrar la primera imagen al inicio
floatingImage.style.position = 'fixed';
floatingImage.style.top = '0';
floatingImage.style.left = '0';
floatingImage.style.maxWidth = '400px'; // Ajusta el tamaño de la imagen si es necesario
floatingImage.style.maxHeight = '300px'; // Ajusta el tamaño de la imagen si es necesario
floatingImage.style.cursor = 'pointer';
floatingImage.style.display = 'none'; // Oculto por defecto

// Agregar la imagen al cuerpo del documento
document.body.appendChild(floatingImage);

// Mostrar la imagen al hacer doble clic en cualquier parte de la pantalla
window.addEventListener('dblclick', function (event) {
  if (
    event.target !== floatingImage &&
    event.target !== floatingTorus3Container &&
    event.target !== floatingTextContainer
  ) {
    floatingImage.style.display = 'block';
    floatingTorus3Container.style.display = 'block';
    floatingTextContainer.style.display = 'block'; // Mostrar la ventana flotante del texto
  }
});

// Ocultar la imagen al hacer clic sobre ella misma
floatingImage.addEventListener('click', function (event) {
  floatingImage.style.display = 'none';
  event.stopPropagation();
});

// Configurar el carrusel automático
let currentImageIndex = 0;
function startImageCarousel() {
  setInterval(() => {
    if (floatingImage.style.display === 'block') {
      currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
      floatingImage.src = imageUrls[currentImageIndex];
    }
  }, 900); // Cambiar la imagen cada 3 segundos
}
startImageCarousel();

// Crear una ventana flotante para el torus3 de Three.js
var floatingTorus3Container = document.createElement('div');
floatingTorus3Container.style.position = 'fixed';
floatingTorus3Container.style.bottom = '0';
floatingTorus3Container.style.right = '0';
floatingTorus3Container.style.width = '300px';
floatingTorus3Container.style.height = '300px';
floatingTorus3Container.style.background = 'blue'; // Fondo azul
floatingTorus3Container.style.display = 'none'; // Oculto por defecto
floatingTorus3Container.style.cursor = 'pointer';

// Agregar el contenedor al cuerpo del documento
document.body.appendChild(floatingTorus3Container);

// Ocultar la ventana del torus3 al hacer clic sobre ella misma
floatingTorus3Container.addEventListener('click', function (event) {
  floatingTorus3Container.style.display = 'none';
  event.stopPropagation();
});

// Configurar Three.js para el torus3 en la ventana flotante
var torus3Renderer = new THREE.WebGLRenderer();
torus3Renderer.setSize(300, 300);
torus3Renderer.setClearColor(0x0000ff); // Fondo azul
floatingTorus3Container.appendChild(torus3Renderer.domElement);

var torus3Scene = new THREE.Scene();
var torus3Camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
torus3Camera.position.z = 5;

// Crear la geometría y material del torus3
var torus3Geometry = new THREE.TorusGeometry(1, 0.3, 16, 100); // Torus de 1 unidad de radio y 0.3 de grosor
var torus3Material = new THREE.MeshBasicMaterial({
  color: 0x000000,
  wireframe: true, // Textura de wireframe negro
});
var torus3Mesh = new THREE.Mesh(torus3Geometry, torus3Material);
torus3Scene.add(torus3Mesh);

// Animación del torus3
function animateTorus3() {
  if (floatingTorus3Container.style.display === 'block') {
    torus3Mesh.rotation.x += 0.01;
    torus3Mesh.rotation.y += 0.01;
    torus3Renderer.render(torus3Scene, torus3Camera);
  }
  requestAnimationFrame(animateTorus3);
}
animateTorus3();
// Crear una ventana flotante para texto explicativo
var floatingTextContainer = document.createElement('div');
floatingTextContainer.style.position = 'fixed';
floatingTextContainer.style.bottom = '0';
floatingTextContainer.style.left = '0';
floatingTextContainer.style.width = '600px';
floatingTextContainer.style.height = '50px';
floatingTextContainer.style.background = 'blue'; // Fondo negro
floatingTextContainer.style.color = 'white'; // Texto blanco
floatingTextContainer.style.padding = '10px';
floatingTextContainer.style.fontSize = '16px';
floatingTextContainer.style.lineHeight = '1.5';
floatingTextContainer.style.display = 'block'; // Visible al cargar la página
floatingTextContainer.style.cursor = 'pointer';

// Contenido HTML del contenedor con un enlace
floatingTextContainer.innerHTML = `
  Click + hold and move cursor  to rotate / press any key to activate-deactivate 3D shapes and images /
  <a href="https://glitch.com/edit/#!/treeejss" target="_blank" style="color: white;">remix this project</a> / double click to activate menu
  - developed by <a href="https://www.instagram.com/hyperbolico_0/" target="_blank" style="color: white;">Hyperbolico</a>
`;

// Agregar el contenedor de texto al cuerpo del documento
document.body.appendChild(floatingTextContainer);

// Variable para rastrear si ya ocurrió la primera interacción
let firstInteractionOccurred = false;

// Ocultar la ventana al presionar cualquier tecla (solo la primera vez)
function hideOnFirstKey(event) {
  if (!firstInteractionOccurred) {
    floatingTextContainer.style.display = 'none';
    firstInteractionOccurred = true;
    document.removeEventListener('keydown', hideOnFirstKey); // Quitar el listener
  }
}

// Mostrar la ventana al hacer doble clic después de la primera interacción
document.addEventListener('dblclick', function () {
  if (firstInteractionOccurred) {
    floatingTextContainer.style.display = 'block';
  }
});

// Ocultar la ventana al hacer clic en ella
floatingTextContainer.addEventListener('click', function (event) {
  floatingTextContainer.style.display = 'none';
  event.stopPropagation();
});

// Escuchar la interacción de la primera tecla
document.addEventListener('keydown', hideOnFirstKey);
