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
  selectedStatePrompt: document.querySelector("#selectedStatePrompt"),
  petSwitches: document.querySelectorAll("[data-pet-switch]")
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

const petProfiles = {
  dog: {
    name: "Puffo",
    switchLabel: "Puffo",
    species: "dog",
    avatar: "sprite",
    photoPaths: ["./Puffo.JPG"],
    photoNames: ["Puffo.JPG"],
    photoAlt: "Puffo reference photo",
    palette: ["#fbf8ed", "#f3ead9", "#d8bd91", "#26251f"],
    breed: "Tiny Cavachon, small toy size",
    weight: "Small and soft; exact weight to confirm",
    tweak:
      "Keep Puffo's white fluffy coat, cream floppy ears, dark button eyes, round black nose, soft white muzzle, tiny paws, compact body, and slightly skeptical birthday expression. Make him cute and polished, not photorealistic and not generic.",
    traits: [
      "white fluffy coat",
      "cream floppy ears",
      "large dark button eyes",
      "round black nose",
      "soft white muzzle",
      "tiny compact body",
      "slightly skeptical birthday face"
    ],
    visualSummary:
      "Use 3-5 photos for stronger likeness: face, side body, favorite pose, and any special markings.",
    identityRule:
      "white fluffy coat, cream floppy ears, dark button eyes, round black nose, soft muzzle, tiny paws, compact body",
    statePrompts: {
      idle: "Subtle breathing, tiny blink, cream ears resting, same Puffo face.",
      "running-right": "Tiny quick walk with floppy cream ears and compact white body preserved.",
      waiting: "Quiet low-energy loop used as Puffo's nap state for this MVP.",
      failed: "Soft side-eye and tiny disappointment, never aggressive or distressed.",
      review: "Head tilt review pose while the owner checks whether this feels like Puffo."
    },
    messages: {
      initial: "I smelled cake. Is it for me?",
      idle: "I'll stay nearby.",
      generate: "Look closely. Does this still feel like Puffo?",
      sleepClock: "My clock says I need more sleep today.",
      call: "Puffo trots over, then decides how close is close enough.",
      play: "Short play session. No endless fetching today.",
      sleep: "I'll nap now. Wake me gently later.",
      pet: "That spot is okay.",
      petCareful: "Behind the ears is okay. Not forever.",
      annoyed: "Puffo gives a tiny side-eye: a quiet minute, please."
    }
  },
  cat: {
    name: "Nutty",
    switchLabel: "Nutty",
    species: "cat",
    avatar: "sprite",
    spritePath: "./pets/nutty-v2-full-hatch/spritesheet.webp?v=nutty-v2-markings",
    photoPaths: ["./cat-photo-1.jpg", "./cat-photo-2.jpg"],
    photoNames: ["cat-photo-1.jpg", "cat-photo-2.jpg"],
    photoAlt: "Gray and white cat reference photos",
    palette: ["#2f3b43", "#687780", "#bf8f5d", "#f1eee5", "#a8b077"],
    breed: "Gray domestic shorthair, window-hammock cat",
    weight: "Medium build; exact weight to confirm",
    tweak:
      "Preserve Nutty's blue-gray short coat, white chest bib, white chin stripe, pale green eyes, upright ears, long white whiskers, warm brown patch above the right eye, brown mottled body patches, and calm window-watching personality. Make Nutty cute and polished, not photorealistic and not generic.",
    traits: [
      "blue-gray short coat",
      "white chest bib",
      "white chin stripe",
      "warm brown patch above right eye",
      "brown mottled body patches",
      "pale green eyes",
      "upright ears",
      "long white whiskers"
    ],
    visualSummary:
      "Two Nutty references loaded: one close face angle and one hammock body angle. The right-eye brown patch and body mottling are locked visual DNA.",
    identityRule:
      "blue-gray coat, white chest and chin stripe, pale green eyes, warm brown patch above the right eye, brown mottling on body and tail, upright ears, long white whiskers, compact curled body",
    statePrompts: {
      idle: "Slow blink, tiny ear twitch, green eyes alert, right-eye brown patch and mottled body preserved.",
      "running-right": "Side-view cat walk with four paws alternating, tail balancing, gray coat, white chest, and brown body mottling preserved.",
      waiting: "Curled window nap with closed eyes, tail wrapped around body, soft breathing, mottled coat preserved.",
      failed: "Flattened ears, narrowed green eyes, tail flicking, and warm brown markings intact; annoyed but not distressed.",
      review: "Head tilt and focused green-eyed look while owner checks right-eye patch, white bib, and body mottling."
    },
    messages: {
      initial: "I saw something move outside.",
      idle: "I'll watch from the window.",
      generate: "Check the green eyes, white bib, right-eye brown patch, and body mottling.",
      sleepClock: "My cat clock says it is nap time.",
      call: "Nutty looks over, then takes the scenic route.",
      play: "One quick pounce. Then window patrol.",
      sleep: "Window nap scheduled. Do not disturb.",
      pet: "Chin scratches are under review.",
      petCareful: "Two more scratches. Maybe.",
      annoyed: "Nutty flicks one ear: too much attention."
    }
  }
};

let activePetId = "dog";
let activePet = petProfiles[activePetId];
let uploadedPhotoNames = [...activePet.photoNames];
let palette = [...activePet.palette];
let traits = [...activePet.traits];
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

function ensureCatMarkup(target) {
  if (target.querySelector(".cat-body")) return;

  target.replaceChildren(
    Object.assign(document.createElement("span"), { className: "cat-tail" }),
    Object.assign(document.createElement("span"), { className: "cat-body" }),
    Object.assign(document.createElement("span"), { className: "cat-chest" }),
    Object.assign(document.createElement("span"), { className: "cat-head" }),
    Object.assign(document.createElement("span"), { className: "cat-ear cat-ear-left" }),
    Object.assign(document.createElement("span"), { className: "cat-ear cat-ear-right" }),
    Object.assign(document.createElement("span"), { className: "cat-eye cat-eye-left" }),
    Object.assign(document.createElement("span"), { className: "cat-eye cat-eye-right" }),
    Object.assign(document.createElement("span"), { className: "cat-nose" }),
    Object.assign(document.createElement("span"), { className: "cat-chin" }),
    Object.assign(document.createElement("span"), { className: "cat-whisker cat-whisker-left" }),
    Object.assign(document.createElement("span"), { className: "cat-whisker cat-whisker-right" })
  );
}

function renderSprite(target, stateId = "idle", frame = 0) {
  if (!target) return;
  const state = petStates[stateId] || petStates.idle;
  const frameIndex = frame % state.frames;

  target.dataset.state = stateId;
  target.dataset.frame = String(frameIndex);

  if (activePet.avatar === "css-cat") {
    target.classList.remove("puffo-sprite");
    target.classList.add("cat-avatar");
    target.style.backgroundPosition = "";
    ensureCatMarkup(target);
    return;
  }

  target.classList.add("puffo-sprite");
  target.classList.remove("cat-avatar");
  target.replaceChildren();
  target.style.backgroundPosition = `${frameIndex * (100 / 7)}% ${state.row * (100 / 8)}%`;
}

function renderFrameStrip(stateId) {
  const state = petStates[stateId] || petStates.idle;
  const frames = Array.from({ length: state.frames }, (_, index) => {
    const frame = document.createElement("span");
    frame.className = "frame-cell";

    const sprite = document.createElement("span");
    sprite.className = activePet.avatar === "css-cat" ? "cat-avatar" : "puffo-sprite";
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
  elements.selectedStatePrompt.textContent = activePet.statePrompts[stateId] || state.prompt;
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
  elements.photoPreview.classList.toggle("is-grid", files.length > 1);
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

  return [...activePet.traits.slice(0, 6), confidenceTrait, ...ownerNotes];
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
  const name = clean(elements.petName.value) || activePet.name;
  return `Create a cute, movable companion-app pet from uploaded photos.

Pet name: ${name}
Species: ${activePet.species}
Breed and body: ${clean(elements.breed.value)}
Weight and age notes: ${clean(elements.weight.value)}
Reference photos: ${uploadedPhotoNames.join(", ")}
Extracted palette: ${palette.join(", ")}
Locked visual DNA: ${traits.join("; ")}

Owner correction:
${clean(elements.tweak.value)}

Generation rules:
- Preserve the same ${activePet.species} across every frame: ${activePet.identityRule}.
- Make the avatar recognizable and lovingly stylized, not photorealistic and not generic.
- Generate visible frame differences for idle, walk, sleep, and annoyed states.
- The pet should keep boundaries: if the owner interacts too much, ${name} can ask for quiet time.
- Export as a Petdex/OpenPets-compatible pet package when the owner approves the likeness.`;
}

function updateText() {
  const name = clean(elements.petName.value) || activePet.name;
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

function setActivePet(petId) {
  activePetId = petProfiles[petId] ? petId : "dog";
  activePet = petProfiles[activePetId];
  uploadedPhotoNames = [...activePet.photoNames];
  palette = [...activePet.palette];
  traits = [...activePet.traits];
  sleepHours = activePetId === "cat" ? 7.4 : 8;
  interactionCount = 0;
  frameClock = 0;

  document.body.dataset.pet = activePetId;
  elements.petName.value = activePet.name;
  elements.breed.value = activePet.breed;
  elements.weight.value = activePet.weight;
  elements.tweak.value = activePet.tweak;
  elements.visualSummary.textContent = activePet.visualSummary;
  elements.generateButton.textContent = `Generate ${activePet.name} Preview`;
  elements.petAvatar.setAttribute("aria-label", `Animated ${activePet.name}`);
  elements.petPhoto.value = "";

  if (activePet.spritePath) {
    document.documentElement.style.setProperty("--pet-sprite-url", `url("${activePet.spritePath}")`);
  } else {
    document.documentElement.style.removeProperty("--pet-sprite-url");
  }

  elements.petSwitches.forEach((button) => {
    const isSelected = button.dataset.petSwitch === activePetId;
    button.classList.toggle("is-selected", isSelected);
  });

  markStep("photo");
  applyPalette(palette);
  loadDefaultReferencePhotos();
  setState("idle", { message: activePet.messages.initial });
  updateText();
}

function loadDefaultReferencePhotos() {
  const images = activePet.photoPaths.map((path, index) => {
    const image = new Image();
    image.alt = activePet.photoPaths.length > 1 ? `${activePet.photoAlt} ${index + 1}` : activePet.photoAlt;
    image.src = path;
    return image;
  });

  elements.photoPreview.classList.toggle("is-grid", images.length > 1);
  elements.photoPreview.replaceChildren(...images);

  const extracted = [];
  let finished = 0;

  images.forEach((image) => {
    image.onload = () => {
      extracted.push(...extractPalette(image));
      finished += 1;
      if (finished === images.length) {
        applyPalette(extracted);
        updateText();
      }
    };

    image.onerror = () => {
      finished += 1;
      if (finished === images.length && !extracted.length) {
        elements.photoPreview.textContent = `Add ${activePet.photoNames.join(", ")}`;
        uploadedPhotoNames = [];
        updateText();
      }
    };
  });
}

function returnToIdle(delay = 1600) {
  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => {
    if (currentState !== "waiting") {
      setState("idle", { message: activePet.messages.idle });
      updateText();
    }
  }, delay);
}

function interact(action) {
  interactionCount += action === "pet" ? 2 : 1;

  if (interactionCount >= 7 && action !== "sleep") {
    setState("failed", { message: activePet.messages.annoyed });
    returnToIdle(2600);
    updateText();
    return;
  }

  if (action === "call") {
    setState("running-right", { message: activePet.messages.call });
    returnToIdle();
  }

  if (action === "play") {
    setState("running-right", { message: activePet.messages.play });
    sleepHours = Math.max(0, sleepHours - 0.18);
    returnToIdle(1900);
  }

  if (action === "sleep") {
    setState("waiting", { message: activePet.messages.sleep });
    sleepHours = Math.min(12, sleepHours + 0.8);
    interactionCount = Math.max(0, interactionCount - 3);
  }

  if (action === "pet") {
    setState("idle", { message: interactionCount >= 4 ? activePet.messages.petCareful : activePet.messages.pet });
    returnToIdle(1400);
  }

  updateText();
}

function generatePreview() {
  markStep("preview");
  traits = buildTraits(uploadedPhotoNames.length);
  setState("review", { message: activePet.messages.generate });
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
    setState("waiting", { message: activePet.messages.sleepClock });
  }

  interactionCount = Math.max(0, interactionCount - 0.4);
  updateText();
}

elements.petPhoto.addEventListener("change", handlePhotoUpload);
elements.generateButton.addEventListener("click", generatePreview);
elements.petSwitches.forEach((button) => {
  button.addEventListener("click", () => setActivePet(button.dataset.petSwitch));
});

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

setActivePet("dog");
setInterval(tickBioClock, 9000);
requestAnimationFrame(animateSprites);
