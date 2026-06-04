const elements = {
  petName: document.querySelector("#petName"),
  breed: document.querySelector("#breedInput"),
  weight: document.querySelector("#weightInput"),
  tweak: document.querySelector("#tweakPrompt"),
  petPhoto: document.querySelector("#petPhoto"),
  phonePetPhoto: document.querySelector("#phonePetPhoto"),
  photoPreview: document.querySelector("#photoPreview"),
  matchGrid: document.querySelector("#matchGrid"),
  matchSummary: document.querySelector("#matchSummary"),
  visualSummary: document.querySelector("#visualSummary"),
  dnaSummary: document.querySelector("#dnaSummary"),
  traitList: document.querySelector("#traitList"),
  colorSwatches: document.querySelector("#colorSwatches"),
  matchEstimate: document.querySelector("#matchEstimate"),
  matchHint: document.querySelector("#matchHint"),
  promptOutput: document.querySelector("#promptOutput"),
  generateButton: document.querySelector("#generateButton"),
  homeTitle: document.querySelector("#homeTitle"),
  homeMoodLabel: document.querySelector("#homeMoodLabel"),
  petAvatar: document.querySelector("#petAvatar"),
  petBubble: document.querySelector("#petBubble"),
  petState: document.querySelector("#petState"),
  sleepNeed: document.querySelector("#sleepNeed"),
  patienceLevel: document.querySelector("#patienceLevel"),
  previewStateLabel: document.querySelector("#previewStateLabel"),
  actionTabs: document.querySelector("#actionTabs"),
  actionMeta: document.querySelector("#actionMeta"),
  previewFrameStrip: document.querySelector("#previewFrameStrip"),
  selectedStatePrompt: document.querySelector("#selectedStatePrompt"),
  commandInput: document.querySelector("#commandInput"),
  trainCommand: document.querySelector("#trainCommand"),
  trainingLevel: document.querySelector("#trainingLevel"),
  contextInput: document.querySelector("#contextInput"),
  memorySummary: document.querySelector("#memorySummary"),
  memoryCapsules: document.querySelector("#memoryCapsules"),
  summarizeButton: document.querySelector("#summarizeButton"),
  voiceMemoryButton: document.querySelector("#voiceMemoryButton"),
  voiceStatus: document.querySelector("#voiceStatus"),
  homePrompt: document.querySelector("#homePrompt"),
  homeVoiceButton: document.querySelector("#homeVoiceButton"),
  sendPrompt: document.querySelector("#sendPrompt"),
  intentSummary: document.querySelector("#intentSummary"),
  firstLookStep: document.querySelector("#firstLookStep"),
  firstLookStatus: document.querySelector("#firstLookStatus"),
  memoryStep: document.querySelector("#memoryStep"),
  reviewStep: document.querySelector("#reviewStep"),
  petSwitches: document.querySelectorAll("[data-pet-switch]")
};

const suggestionPrompts = {
  appearance: "Appearance: mention eye color, coat pattern, ear shape, body size, tail, and any markings.",
  behavior: "Behavior: describe how they ask for attention, refuse things, play, or get annoyed.",
  habit: "Daily habit: describe where they sleep, when they eat, what route or room they love.",
  story: "Story: tell one specific memory, like a birthday, first day home, favorite toy, or funny moment."
};

const actionOrder = [
  "idle",
  "running-right",
  "running-left",
  "waving",
  "jumping",
  "waiting",
  "failed",
  "running",
  "review"
];

const petStates = {
  idle: {
    label: "Idle",
    row: 0,
    frames: 6,
    duration: 240,
    mood: "Awake",
    cue: "stay",
    prompt: "Subtle breathing, tiny blink, stable face and markings.",
    qa: "The pet should feel alive without sliding around the canvas."
  },
  "running-right": {
    label: "Walk Right",
    row: 1,
    frames: 8,
    duration: 92,
    mood: "Moving",
    cue: "walk",
    prompt: "Right-facing walk cycle with visible paw alternation and preserved body silhouette.",
    qa: "Four limbs should move as a real walk cycle, not just a bouncing sticker."
  },
  "running-left": {
    label: "Walk Left",
    row: 2,
    frames: 8,
    duration: 92,
    mood: "Moving",
    cue: "back",
    prompt: "Left-facing walk cycle with the same markings mirrored consistently.",
    qa: "Markings should stay attached to the same body zones across the turn."
  },
  waving: {
    label: "Come",
    row: 3,
    frames: 4,
    duration: 180,
    mood: "Listening",
    cue: "come",
    prompt: "Small attention gesture, as if deciding whether to come closer.",
    qa: "Expression should stay recognizable while the front body moves."
  },
  jumping: {
    label: "Play",
    row: 4,
    frames: 5,
    duration: 135,
    mood: "Playful",
    cue: "play",
    prompt: "Short playful hop or pounce with clear anticipation and landing.",
    qa: "Motion should have anticipation, lift, and recovery, not one rigid hop."
  },
  waiting: {
    label: "Nap",
    row: 6,
    frames: 6,
    duration: 360,
    mood: "Resting",
    cue: "sleep",
    prompt: "Low-energy nap loop with slow breathing and preserved markings.",
    qa: "Sleeping pose should still look like the same pet when eyes are closed."
  },
  failed: {
    label: "Annoyed",
    row: 5,
    frames: 8,
    duration: 190,
    mood: "Needs space",
    cue: "space",
    prompt: "Boundary state: annoyed, skeptical, or overstimulated without distress.",
    qa: "The pet can refuse attention while still feeling lovable."
  },
  running: {
    label: "Zoom",
    row: 7,
    frames: 6,
    duration: 86,
    mood: "Energized",
    cue: "run",
    prompt: "Fast playful movement loop with stable visual DNA.",
    qa: "The action should read as energetic motion, not a different character."
  },
  review: {
    label: "Review",
    row: 8,
    frames: 6,
    duration: 150,
    mood: "Reviewing",
    cue: "look",
    prompt: "Head tilt review pose while the owner checks likeness.",
    qa: "This is the owner's checkpoint for face, markings, body, and personality."
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
      "running-left": "Tiny return walk with the same cream ears, white coat, and compact Cavachon body.",
      waving: "Puffo lifts attention gently, deciding whether the command is worth obeying.",
      jumping: "A small birthday-party hop with soft paws, floppy ears, and Puffo's skeptical face intact.",
      waiting: "Quiet low-energy loop used as Puffo's nap state for this MVP.",
      failed: "Soft side-eye and tiny disappointment, never aggressive or distressed.",
      running: "Brief excited zoom, still tiny and fluffy, never changing into a generic dog.",
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
      annoyed: "Puffo gives a tiny side-eye: a quiet minute, please.",
      training: "Puffo understood the cue a little better.",
      commandResist: "Puffo heard you. He is considering whether this applies to him.",
      commands: {
        idle: "Puffo settles into a tiny stay.",
        "running-right": "Puffo walks over in his own time.",
        "running-left": "Puffo pads back across the room.",
        waving: "Puffo comes close, but not all the way.",
        jumping: "Puffo does one happy hop.",
        waiting: "Puffo accepts the nap cue.",
        failed: "Puffo needs a quiet reset.",
        running: "Puffo does a short zoom.",
        review: "Puffo holds still for inspection."
      }
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
      "running-left": "Return walk with four paws alternating, tail balance, white bib, right-eye brown patch, and mottled body preserved.",
      waving: "Nutty glances over with a small paw or head gesture, deciding whether the cue deserves attention.",
      jumping: "One compact cat pounce with shoulder compression, tail counterbalance, green eyes, and markings intact.",
      waiting: "Curled window nap with closed eyes, tail wrapped around body, soft breathing, mottled coat preserved.",
      failed: "Flattened ears, narrowed green eyes, tail flicking, and warm brown markings intact; annoyed but not distressed.",
      running: "Quick cat dash with low body, alternating paws, tail steering, white bib and brown patches preserved.",
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
      annoyed: "Nutty flicks one ear: too much attention.",
      training: "Nutty remembers the cue, though she has opinions.",
      commandResist: "Nutty heard you and chose to audit the request.",
      commands: {
        idle: "Nutty pauses, eyes still on the window.",
        "running-right": "Nutty walks over with deliberate paws.",
        "running-left": "Nutty turns back with tail balance.",
        waving: "Nutty acknowledges you with minimal effort.",
        jumping: "Nutty gives one precise pounce.",
        waiting: "Nutty approves the nap cue.",
        failed: "Nutty needs space now.",
        running: "Nutty darts, then pretends nothing happened.",
        review: "Nutty holds the look long enough for review."
      }
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
let ambientTimer;
let hasGeneratedFirstLook = false;
let selectedMatchCount = 0;
let recognition;
let recognitionTarget = "context";
let ownerMemories = {
  dog: ["birthday cake smell", "gentle but stubborn"],
  cat: ["window hammock", "selective affection"]
};
const trainingProgress = {
  dog: 2,
  cat: 1
};

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

function renderActionTabs() {
  const tabs = actionOrder.map((stateId) => {
    const state = petStates[stateId];
    const button = document.createElement("button");
    button.className = "state-tab";
    button.type = "button";
    button.dataset.stateChoice = stateId;

    const label = document.createElement("span");
    label.textContent = state.label;

    const meta = document.createElement("small");
    meta.textContent = `${state.frames}f / row ${state.row}`;

    button.append(label, meta);
    return button;
  });

  elements.actionTabs.replaceChildren(...tabs);
}

function renderActionMeta(stateId) {
  const state = petStates[stateId] || petStates.idle;
  const prompt = activePet.statePrompts[stateId] || state.prompt;
  const name = clean(elements.petName.value) || activePet.name;
  const items = [
    ["Cue", `${name}, ${state.cue}`],
    ["Atlas", `row ${state.row}, ${state.frames} frames`],
    ["QA", state.qa]
  ].map(([label, value]) => {
    const item = document.createElement("span");
    const strong = document.createElement("strong");
    const text = document.createElement("em");
    strong.textContent = label;
    text.textContent = value;
    item.append(strong, text);
    return item;
  });

  elements.actionMeta.replaceChildren(...items);
  elements.selectedStatePrompt.textContent = prompt;
}

function setState(stateId, options = {}) {
  currentState = stateId;
  frameClock = 0;
  renderSprite(elements.petAvatar, stateId, 0);

  const state = petStates[stateId] || petStates.idle;
  elements.petState.textContent = state.mood;
  elements.homeMoodLabel.textContent =
    stateId === "failed" ? "Needs space" : stateId === "waiting" ? "Sleepy" : stateId === "idle" ? "Happy" : state.mood;
  elements.previewStateLabel.textContent = `${state.label} - ${state.frames} frames`;
  renderActionMeta(stateId);
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

function createMatchCard({ src, label, selected = true }) {
  const card = document.createElement("article");
  card.className = "match-card";
  card.classList.toggle("is-selected", selected);

  if (src) {
    const image = document.createElement("img");
    image.src = src;
    image.alt = label;
    image.onload = () => {
      if (src.startsWith("blob:")) URL.revokeObjectURL(src);
    };
    card.append(image);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "match-placeholder";
    placeholder.textContent = label;
    card.append(placeholder);
  }

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = selected ? "This is my pet" : "Add this angle";
  button.addEventListener("click", () => {
    const nextSelected = !card.classList.contains("is-selected");
    card.classList.toggle("is-selected", nextSelected);
    button.textContent = nextSelected ? "This is my pet" : "Not this one";
    selectedMatchCount = elements.matchGrid.querySelectorAll(".match-card.is-selected").length;
    elements.matchSummary.textContent = `${selectedMatchCount} reference${selectedMatchCount === 1 ? "" : "s"} selected`;
    updateText();
  });

  card.append(button);
  return card;
}

function renderMatchGridFromFiles(files) {
  const cards = files.slice(0, 4).map((file, index) =>
    createMatchCard({
      src: URL.createObjectURL(file),
      label: index === 0 ? "Seed photo" : `Likely match ${index + 1}`,
      selected: true
    })
  );

  cards.push(
    createMatchCard({
      src: "",
      label: "Add side body, favorite pose, or special marking",
      selected: false
    })
  );

  selectedMatchCount = Math.min(files.length, 4);
  elements.matchSummary.textContent = `${selectedMatchCount} reference${selectedMatchCount === 1 ? "" : "s"} selected`;
  elements.matchGrid.replaceChildren(...cards);
}

function renderDefaultMatchGrid() {
  const cards = activePet.photoPaths.map((path, index) =>
    createMatchCard({
      src: path,
      label: activePet.photoPaths.length > 1 ? `${activePet.name} reference ${index + 1}` : `${activePet.name} seed photo`,
      selected: true
    })
  );

  cards.push(
    createMatchCard({
      src: "",
      label: "Ask owner for side body or favorite pose",
      selected: false
    })
  );

  selectedMatchCount = activePet.photoPaths.length;
  elements.matchSummary.textContent = `${selectedMatchCount} demo reference${selectedMatchCount === 1 ? "" : "s"} selected`;
  elements.matchGrid.replaceChildren(...cards);
}

async function handlePhotoUpload(event) {
  const files = [...event.target.files].filter((file) => file.type.startsWith("image/"));
  if (!files.length) return;

  uploadedPhotoNames = files.map((file) => file.name);
  renderPhotoPreview(files);
  renderMatchGridFromFiles(files);
  elements.firstLookStatus.textContent = "Reading photo...";

  try {
    const images = await Promise.all(files.map(loadImageFromFile));
    const extracted = images.flatMap(extractPalette);
    applyPalette(extracted);
    traits = buildTraits(files.length);
    elements.visualSummary.textContent =
      `${files.length} photo${files.length > 1 ? "s" : ""} loaded. A first look is ready; add memory to make it feel closer.`;
    generatePreview({ automatic: true });
  } catch {
    elements.visualSummary.textContent = "Some photos could not be read. Try JPG or PNG.";
    elements.firstLookStatus.textContent = "Try JPG or PNG.";
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

function currentMemories() {
  return ownerMemories[activePetId] || [];
}

function addMemory(value) {
  const memory = clean(value).replace(/^[-•]\s*/, "");
  if (!memory) return;

  const memories = currentMemories();
  if (!memories.some((item) => item.toLowerCase() === memory.toLowerCase())) {
    memories.unshift(memory);
  }

  ownerMemories[activePetId] = memories.slice(0, 8);
}

function renderMemoryCapsules() {
  const capsules = currentMemories().slice(0, 6).map((memory) => {
    const item = document.createElement("span");
    item.textContent = memory;
    return item;
  });

  elements.memoryCapsules.replaceChildren(...capsules);
  elements.memorySummary.textContent =
    capsules.length > 0 ? `${capsules.length} remembered detail${capsules.length === 1 ? "" : "s"}` : "Add one habit or story";
}

function summarizeContext() {
  const context = clean(elements.contextInput.value);
  if (!context) {
    elements.voiceStatus.textContent = "Add a sentence first, or use Speak.";
    return;
  }

  const pieces = context
    .split(/[.!?。！？\n]/)
    .map((item) => clean(item))
    .filter(Boolean)
    .slice(0, 4);

  pieces.forEach(addMemory);

  const memory = currentMemories()[0];
  if (memory) {
    const correction = `${activePet.tweak} Personality and memory cues: ${currentMemories().slice(0, 4).join("; ")}.`;
    elements.tweak.value = correction;
    traits = buildTraits(uploadedPhotoNames.length);
    const response = memoryResponse(memory);
    elements.intentSummary.textContent = `Pet responds: ${response}`;
    showBubble(response);
    markStep("respond");
  }

  renderMemoryCapsules();
  updateText();
}

function memoryResponse(memory) {
  const name = clean(elements.petName.value) || activePet.name;
  if (activePetId === "cat") {
    return `${name} stores that away, then pretends it was already obvious.`;
  }

  if (/cake|birthday|food|treat/i.test(memory)) {
    return `${name} remembers the smell first. Very important evidence.`;
  }

  return `${name} remembers that. It changes how this version should feel.`;
}

function markStep(activeStep) {
  const order = ["photo", "first-look", "memory", "respond"];
  const activeIndex = Math.max(0, order.indexOf(activeStep));

  document.querySelectorAll(".flow-step").forEach((step) => {
    const stepIndex = order.indexOf(step.dataset.step);
    step.classList.toggle("is-active", stepIndex <= activeIndex);
  });

  document.querySelectorAll(".phone-step").forEach((step) => {
    const stepIndex = order.indexOf(step.dataset.phoneStep);
    step.classList.toggle("is-done", stepIndex < activeIndex);
    step.classList.toggle("is-active", stepIndex === activeIndex);
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
Owner memories: ${currentMemories().join("; ")}

Owner correction:
${clean(elements.tweak.value)}

Generation rules:
- Preserve the same ${activePet.species} across every frame: ${activePet.identityRule}.
- Make the avatar recognizable and lovingly stylized, not photorealistic and not generic.
- Generate visible frame differences for idle, walk, sleep, and annoyed states.
- Use owner memories to shape responses, boundaries, habits, and expression choices.
- The pet should keep boundaries: if the owner interacts too much, ${name} can ask for quiet time.
- Export as a Petdex/OpenPets-compatible pet package when the owner approves the likeness.`;
}

function updateText() {
  const name = clean(elements.petName.value) || activePet.name;
  const photoCount = uploadedPhotoNames.length;

  elements.homeTitle.textContent = name;
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
  elements.trainingLevel.textContent = `Training ${trainingProgress[activePetId]} / 5`;
  elements.homePrompt.placeholder = `Tell ${name} a memory...`;
  renderTraits();
  renderMemoryCapsules();
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
  hasGeneratedFirstLook = false;

  document.body.dataset.pet = activePetId;
  elements.petName.value = activePet.name;
  elements.breed.value = activePet.breed;
  elements.weight.value = activePet.weight;
  elements.tweak.value = activePet.tweak;
  elements.commandInput.value = `${activePet.name}, come`;
  elements.homePrompt.value = "";
  elements.contextInput.value = "";
  elements.intentSummary.textContent = "AI understood: waiting for a photo or memory.";
  elements.visualSummary.textContent = activePet.visualSummary;
  elements.generateButton.textContent = `Generate ${activePet.name}'s first look`;
  elements.petAvatar.setAttribute("aria-label", `Animated ${activePet.name}`);
  elements.petPhoto.value = "";
  elements.phonePetPhoto.value = "";
  elements.firstLookStatus.textContent = "Add yours for a first look.";

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
  renderDefaultMatchGrid();
  renderActionTabs();
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
  markStep("respond");
  interactionCount += action === "pet" ? 2 : 1;

  if (interactionCount >= 7 && action !== "sleep") {
    setState("failed", { message: activePet.messages.annoyed });
    returnToIdle(2600);
    updateText();
    return;
  }

  if (action === "call") {
    setState("waving", { message: activePet.messages.call });
    returnToIdle();
  }

  if (action === "play") {
    setState(activePetId === "cat" ? "jumping" : "running", { message: activePet.messages.play });
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

function inferCommandState(command) {
  const text = clean(command).toLowerCase();

  if (/sleep|nap|rest|bed/.test(text)) return "waiting";
  if (/come|call|here/.test(text)) return "waving";
  if (/play|jump|toy|pounce/.test(text)) return "jumping";
  if (/left|back|return/.test(text)) return "running-left";
  if (/walk/.test(text)) return "running-right";
  if (/run|zoom|dash/.test(text)) return "running";
  if (/review|look|pose|photo/.test(text)) return "review";
  if (/sit|stay|wait/.test(text)) return "idle";

  return "review";
}

function trainCue() {
  markStep("respond");
  const command = clean(elements.commandInput.value) || `${activePet.name}, come`;
  const stateId = inferCommandState(command);
  const score = trainingProgress[activePetId];
  const nameIncluded = command.toLowerCase().includes(activePet.name.toLowerCase());
  const shouldResist = interactionCount >= 6 || (!nameIncluded && score < 3);

  if (shouldResist) {
    interactionCount += 1;
    setState("failed", { message: activePet.messages.commandResist });
    returnToIdle(2400);
    updateText();
    return;
  }

  trainingProgress[activePetId] = Math.min(5, score + 1);
  interactionCount = Math.max(0, interactionCount + (stateId === "waiting" ? -1 : 1));

  if (stateId === "waiting") {
    sleepHours = Math.min(12, sleepHours + 0.5);
  }

  setState(stateId, {
    message: activePet.messages.commands[stateId] || activePet.messages.training
  });
  returnToIdle(stateId === "waiting" ? 3600 : 1900);
  updateText();
}

function commandIntentLabel(stateId, text) {
  if (/remember|loved|used to|favorite|memory|story|habit|diary|生日|喜欢|记得|以前/.test(text.toLowerCase())) {
    return "memory";
  }

  return petStates[stateId]?.cue || "review";
}

function processPetPrompt() {
  const command = clean(elements.homePrompt.value);
  if (!command) {
    elements.intentSummary.textContent = "AI understood: waiting for your words.";
    return;
  }

  const stateId = inferCommandState(command);
  const intent = commandIntentLabel(stateId, command);

  if (intent === "memory") {
    addMemory(command);
    elements.contextInput.value = [command, clean(elements.contextInput.value)].filter(Boolean).join("\n");
    const response = memoryResponse(command);
    elements.intentSummary.textContent = `Pet responds: ${response}`;
    showBubble(response);
    markStep("respond");
    renderMemoryCapsules();
    updateText();
    elements.homePrompt.value = "";
    return;
  }

  elements.commandInput.value = command;
  elements.intentSummary.textContent = `AI understood: ${intent}`;
  trainCue();
  elements.homePrompt.value = "";
}

function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    elements.voiceStatus.textContent = "Voice input not supported in this browser.";
    elements.voiceMemoryButton.disabled = true;
    elements.homeVoiceButton.disabled = true;
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.onstart = () => {
    elements.voiceStatus.textContent = "Listening...";
  };

  recognition.onerror = () => {
    elements.voiceStatus.textContent = "Voice stopped. Try typing if needed.";
  };

  recognition.onend = () => {
    if (elements.voiceStatus.textContent === "Listening...") {
      elements.voiceStatus.textContent = "Voice ready.";
    }
  };

  recognition.onresult = (event) => {
    const transcript = clean(event.results?.[0]?.[0]?.transcript || "");
    if (!transcript) return;

    if (recognitionTarget === "home") {
      elements.homePrompt.value = transcript;
      processPetPrompt();
    } else {
      elements.contextInput.value = [clean(elements.contextInput.value), transcript].filter(Boolean).join("\n");
      summarizeContext();
    }

    elements.voiceStatus.textContent = "Voice added.";
  };
}

function startVoice(target) {
  if (!recognition) {
    elements.voiceStatus.textContent = "Voice input is not available here.";
    return;
  }

  recognitionTarget = target;
  recognition.start();
}

function insertMemorySuggestion(kind) {
  const prompt = suggestionPrompts[kind];
  if (!prompt) return;

  elements.contextInput.value = [clean(elements.contextInput.value), prompt].filter(Boolean).join("\n");
  elements.contextInput.focus();
  elements.memorySummary.textContent = `Suggested: ${kind}`;
  markStep("memory");
}

function generatePreview(options = {}) {
  markStep("first-look");
  traits = buildTraits(uploadedPhotoNames.length);
  hasGeneratedFirstLook = true;
  elements.firstLookStatus.textContent = options.automatic ? "First look generated from your photo." : "First look generated.";
  setState("review", {
    message: options.automatic
      ? `First look generated. Add stories or speak memories to make this feel more like ${clean(elements.petName.value) || activePet.name}.`
      : activePet.messages.generate
  });
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

function runAmbientMoment() {
  clearTimeout(ambientTimer);
  ambientTimer = setTimeout(() => {
    if (currentState === "idle" && interactionCount < 3) {
      const options = hasGeneratedFirstLook ? ["idle", "waving", "review"] : ["idle", "waving"];
      const stateId = options[Math.floor(Math.random() * options.length)];
      const memory = currentMemories()[0];
      const message =
        stateId === "review" && memory
          ? `${activePet.name} seems to remember: ${memory.slice(0, 58)}${memory.length > 58 ? "..." : ""}`
          : activePet.messages.idle;
      setState(stateId, { message });
      returnToIdle(1200);
      setTimeout(runAmbientMoment, 1800);
      return;
    }
    runAmbientMoment();
  }, 6800);
}

elements.petPhoto.addEventListener("change", handlePhotoUpload);
elements.phonePetPhoto.addEventListener("change", handlePhotoUpload);
elements.generateButton.addEventListener("click", generatePreview);
elements.trainCommand.addEventListener("click", trainCue);
elements.commandInput.addEventListener("input", () => renderActionMeta(currentState));
elements.sendPrompt.addEventListener("click", processPetPrompt);
elements.homePrompt.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    processPetPrompt();
  }
});
elements.summarizeButton.addEventListener("click", summarizeContext);
elements.voiceMemoryButton.addEventListener("click", () => startVoice("context"));
elements.homeVoiceButton.addEventListener("click", () => startVoice("home"));
document.querySelectorAll("[data-memory-suggestion]").forEach((button) => {
  button.addEventListener("click", () => insertMemorySuggestion(button.dataset.memorySuggestion));
});
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

elements.actionTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-state-choice]");
  if (!button) return;

  setState(button.dataset.stateChoice, {
    message: `${petStates[button.dataset.stateChoice].label} preview selected.`
  });
});

setActivePet("dog");
setupSpeechRecognition();
setInterval(tickBioClock, 9000);
runAmbientMoment();
requestAnimationFrame(animateSprites);
