const elements = {
  petName: document.querySelector("#petName"),
  breed: document.querySelector("#breedInput"),
  weight: document.querySelector("#weightInput"),
  tweak: document.querySelector("#tweakPrompt"),
  petPhoto: document.querySelector("#petPhoto"),
  photoPreview: document.querySelector("#photoPreview"),
  visualSummary: document.querySelector("#visualSummary"),
  dnaSummary: document.querySelector("#dnaSummary"),
  traitList: document.querySelector("#traitList"),
  colorSwatches: document.querySelector("#colorSwatches"),
  matchEstimate: document.querySelector("#matchEstimate"),
  matchHint: document.querySelector("#matchHint"),
  promptOutput: document.querySelector("#promptOutput"),
  generateButton: document.querySelector("#generateButton"),
  homeTitle: document.querySelector("#homeTitle"),
  petAvatar: document.querySelector("#petAvatar"),
  petBubble: document.querySelector("#petBubble"),
  petState: document.querySelector("#petState"),
  sleepNeed: document.querySelector("#sleepNeed"),
  patienceLevel: document.querySelector("#patienceLevel"),
  previewStateLabel: document.querySelector("#previewStateLabel"),
  previewFrameStrip: document.querySelector("#previewFrameStrip"),
  selectedStatePrompt: document.querySelector("#selectedStatePrompt")
};

const petStates = {
  idle: {
    label: "Idle",
    row: 0,
    frames: 6,
    duration: 240,
    mood: "Awake",
    prompt: "Subtle breathing, tiny blink, cream ears resting, same Puffo face."
  },
  "running-right": {
    label: "Walk",
    row: 1,
    frames: 8,
    duration: 92,
    mood: "Moving",
    prompt: "Tiny quick walk with floppy cream ears and compact white body preserved."
  },
  waiting: {
    label: "Sleep",
    row: 6,
    frames: 6,
    duration: 360,
    mood: "Resting",
    prompt: "Quiet low-energy loop used as Puffo's nap state for this MVP."
  },
  failed: {
    label: "Annoyed",
    row: 5,
    frames: 8,
    duration: 190,
    mood: "Needs space",
    prompt: "Soft side-eye and tiny disappointment, never aggressive or distressed."
  },
  review: {
    label: "Review",
    row: 8,
    frames: 6,
    duration: 150,
    mood: "Reviewing",
    prompt: "Head tilt review pose while the owner checks whether this feels like Puffo."
  }
};

const defaultTraits = [
  "white fluffy coat",
  "cream floppy ears",
  "large dark button eyes",
  "round black nose",
  "soft white muzzle",
  "tiny compact body",
  "slightly skeptical birthday face"
];

let uploadedPhotoNames = ["Puffo.JPG"];
let palette = ["#fbf8ed", "#f3ead9", "#d8bd91", "#26251f"];
let traits = [...defaultTraits];
let currentState = "idle";
let sleepHours = 8;
let interactionCount = 0;
let frameClock = 0;
let lastFrameTime = performance.now();
let resetTimer;

function clean(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function hexFromRgb(rgb) {
  return `#${rgb
    .map((value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0"))
    .join("")}`;
}

function luminance([red, green, blue]) {
  return red * 0.299 + green * 0.587 + blue * 0.114;
}

function rgbFromHex(hex) {
  const value = hex.replace("#", "");
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16)
  ];
}

function renderSprite(target, stateId = "idle", frame = 0) {
  if (!target) return;
  const state = petStates[stateId] || petStates.idle;
  const frameIndex = frame % state.frames;

  target.dataset.state = stateId;
  target.dataset.frame = String(frameIndex);
  target.style.backgroundPosition = `${frameIndex * (100 / 7)}% ${state.row * (100 / 8)}%`;
}

function renderFrameStrip(stateId) {
  const state = petStates[stateId] || petStates.idle;
  const frames = Array.from({ length: state.frames }, (_, index) => {
    const frame = document.createElement("span");
    frame.className = "frame-cell";

    const sprite = document.createElement("span");
    sprite.className = "puffo-sprite";
    sprite.setAttribute("aria-hidden", "true");
    renderSprite(sprite, stateId, index);

    const label = document.createElement("small");
    label.textContent = String(index + 1).padStart(2, "0");

    frame.append(sprite, label);
    return frame;
  });

  elements.previewFrameStrip.replaceChildren(...frames);
}

function setState(stateId, options = {}) {
  currentState = stateId;
  frameClock = 0;
  renderSprite(elements.petAvatar, stateId, 0);

  const state = petStates[stateId] || petStates.idle;
  elements.petState.textContent = state.mood;
  elements.previewStateLabel.textContent = `${state.label} - ${state.frames} frames`;
  elements.selectedStatePrompt.textContent = state.prompt;
  renderFrameStrip(stateId);

  document.querySelectorAll("[data-state-choice]").forEach((button) => {
    const isSelected = button.dataset.stateChoice === stateId;
    button.classList.toggle("is-selected", isSelected);
  });

  if (options.message) {
    showBubble(options.message);
  }
}

function animateSprites(now) {
  const state = petStates[currentState] || petStates.idle;

  if (now - lastFrameTime >= state.duration) {
    lastFrameTime = now;
    frameClock = (frameClock + 1) % state.frames;
    document.querySelectorAll(".live-sprite").forEach((sprite) => {
      renderSprite(sprite, currentState, frameClock);
    });
  }

  requestAnimationFrame(animateSprites);
}

function showBubble(message) {
  elements.petBubble.textContent = message;
}

function applyPalette(colors) {
  palette = colors.slice(0, 5);
  elements.colorSwatches.replaceChildren(
    ...palette.map((color) => {
      const swatch = document.createElement("span");
      swatch.style.background = color;
      swatch.title = color;
      return swatch;
    })
  );
}

function extractPalette(image) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });
  canvas.width = 52;
  canvas.height = 52;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const buckets = new Map();

  for (let index = 0; index < pixels.length; index += 4) {
    const rgb = [pixels[index], pixels[index + 1], pixels[index + 2]];
    const alpha = pixels[index + 3];
    const light = luminance(rgb);

    if (alpha < 170 || light < 22 || light > 248) continue;

    const key = rgb.map((value) => Math.round(value / 30) * 30).join(",");
    buckets.set(key, (buckets.get(key) || 0) + 1);
  }

  const colors = [...buckets.entries()]
    .sort((first, second) => second[1] - first[1])
    .slice(0, 4)
    .map(([key]) => hexFromRgb(key.split(",").map(Number)));

  return colors.length ? colors : palette;
}

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Could not read ${file.name}`));
    };

    image.src = url;
  });
}

function renderPhotoPreview(files) {
  const fragment = document.createDocumentFragment();
  files.slice(0, 3).forEach((file) => {
    const image = document.createElement("img");
    image.src = URL.createObjectURL(file);
    image.alt = file.name;
    image.onload = () => URL.revokeObjectURL(image.src);
    fragment.append(image);
  });

  elements.photoPreview.replaceChildren(fragment);
}

async function handlePhotoUpload(event) {
  const files = [...event.target.files].filter((file) => file.type.startsWith("image/"));
  if (!files.length) return;

  uploadedPhotoNames = files.map((file) => file.name);
  renderPhotoPreview(files);

  try {
    const images = await Promise.all(files.map(loadImageFromFile));
    const extracted = images.flatMap(extractPalette);
    applyPalette(extracted);
    traits = buildTraits(files.length);
    elements.visualSummary.textContent =
      `${files.length} photo${files.length > 1 ? "s" : ""} loaded. Confirm the DNA before generating more animation frames.`;
    markStep("dna");
  } catch {
    elements.visualSummary.textContent = "Some photos could not be read. Try JPG or PNG.";
  }

  updateText();
}

function buildTraits(photoCount) {
  const ownerNotes = clean(elements.tweak.value)
    .split(/[,.，。]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);

  const confidenceTrait =
    photoCount >= 3 ? "front face + body references" : "needs more angles for stronger markings";

  return [...defaultTraits.slice(0, 6), confidenceTrait, ...ownerNotes];
}

function renderTraits() {
  elements.traitList.replaceChildren(
    ...traits.map((trait) => {
      const item = document.createElement("span");
      item.textContent = trait;
      return item;
    })
  );
}

function markStep(activeStep) {
  const order = ["photo", "dna", "preview"];
  const activeIndex = order.indexOf(activeStep);

  document.querySelectorAll(".flow-step").forEach((step) => {
    const stepIndex = order.indexOf(step.dataset.step);
    step.classList.toggle("is-active", stepIndex <= activeIndex);
  });
}

function buildPrompt() {
  const name = clean(elements.petName.value) || "Puffo";
  return `Create a cute, movable companion-app pet from uploaded photos.

Pet name: ${name}
Species: dog
Breed and body: ${clean(elements.breed.value)}
Weight and age notes: ${clean(elements.weight.value)}
Reference photos: ${uploadedPhotoNames.join(", ")}
Extracted palette: ${palette.join(", ")}
Locked visual DNA: ${traits.join("; ")}

Owner correction:
${clean(elements.tweak.value)}

Generation rules:
- Preserve the same dog across every frame: white fluffy coat, cream floppy ears, dark button eyes, round black nose, soft muzzle, tiny paws, compact body.
- Make the avatar recognizable and lovingly stylized, not photorealistic and not generic.
- Generate visible frame differences for idle, walk, sleep, and annoyed states.
- The pet should keep boundaries: if the owner interacts too much, Puffo can ask for quiet time.
- Export as a Petdex/OpenPets-compatible pet package when the owner approves the likeness.`;
}

function updateText() {
  const name = clean(elements.petName.value) || "Puffo";
  const photoCount = uploadedPhotoNames.length;

  elements.homeTitle.textContent = `${name}'s Home`;
  elements.dnaSummary.textContent =
    photoCount >= 3
      ? `${photoCount} photos found: ready for a stronger likeness pass`
      : `${photoCount} photo${photoCount === 1 ? "" : "s"} found: good start`;
  elements.matchEstimate.textContent =
    photoCount >= 3 ? "Likeness target: strong first pass" : "Likeness target: recognizable first pass";
  elements.matchHint.textContent =
    photoCount >= 3
      ? "Use owner corrections to preserve markings across animation rows."
      : "Add side and body photos later; today this demo proves the creation flow.";
  elements.sleepNeed.textContent = `${sleepHours.toFixed(1)} / 12h`;
  elements.patienceLevel.textContent =
    interactionCount >= 6 ? "Needs space" : interactionCount >= 3 ? "Careful" : "Open";
  elements.promptOutput.textContent = buildPrompt();
  renderTraits();
}

function loadDefaultReferencePhoto() {
  const image = new Image();
  image.alt = "Puffo reference photo";

  image.onload = () => {
    elements.photoPreview.replaceChildren(image);
    applyPalette(extractPalette(image));
    updateText();
  };

  image.onerror = () => {
    elements.photoPreview.textContent = "Add Puffo.JPG";
    uploadedPhotoNames = [];
    updateText();
  };

  image.src = "./Puffo.JPG";
}

function returnToIdle(delay = 1600) {
  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => {
    if (currentState !== "waiting") {
      setState("idle", { message: "I'll stay nearby." });
      updateText();
    }
  }, delay);
}

function interact(action) {
  const name = clean(elements.petName.value) || "Puffo";
  interactionCount += action === "pet" ? 2 : 1;

  if (interactionCount >= 7 && action !== "sleep") {
    setState("failed", { message: `${name} gives a tiny side-eye: a quiet minute, please.` });
    returnToIdle(2600);
    updateText();
    return;
  }

  if (action === "call") {
    setState("running-right", { message: `${name} trots over, then decides how close is close enough.` });
    returnToIdle();
  }

  if (action === "play") {
    setState("running-right", { message: "Short play session. No endless fetching today." });
    sleepHours = Math.max(0, sleepHours - 0.18);
    returnToIdle(1900);
  }

  if (action === "sleep") {
    setState("waiting", { message: "I'll nap now. Wake me gently later." });
    sleepHours = Math.min(12, sleepHours + 0.8);
    interactionCount = Math.max(0, interactionCount - 3);
  }

  if (action === "pet") {
    setState("idle", { message: interactionCount >= 4 ? "Behind the ears is okay. Not forever." : "That spot is okay." });
    returnToIdle(1400);
  }

  updateText();
}

function generatePreview() {
  markStep("preview");
  traits = buildTraits(uploadedPhotoNames.length);
  setState("review", { message: "Look closely. Does this still feel like Puffo?" });
  updateText();
  returnToIdle(2400);
}

function tickBioClock() {
  if (currentState === "waiting") {
    sleepHours = Math.min(12, sleepHours + 0.08);
  } else {
    sleepHours = Math.max(0, sleepHours - 0.03);
  }

  if (sleepHours < 6.2 && currentState !== "waiting") {
    setState("waiting", { message: "My clock says I need more sleep today." });
  }

  interactionCount = Math.max(0, interactionCount - 0.4);
  updateText();
}

elements.petPhoto.addEventListener("change", handlePhotoUpload);
elements.generateButton.addEventListener("click", generatePreview);

[elements.petName, elements.breed, elements.weight, elements.tweak].forEach((field) => {
  field.addEventListener("input", () => {
    traits = buildTraits(uploadedPhotoNames.length);
    updateText();
  });
});

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => interact(button.dataset.action));
});

document.querySelectorAll("[data-state-choice]").forEach((button) => {
  button.addEventListener("click", () => {
    setState(button.dataset.stateChoice, {
      message: `${petStates[button.dataset.stateChoice].label} preview selected.`
    });
  });
});

applyPalette(palette);
renderTraits();
setState("idle");
loadDefaultReferencePhoto();
updateText();
setInterval(tickBioClock, 9000);
requestAnimationFrame(animateSprites);
