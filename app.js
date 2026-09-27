const iconRefresh = () => window.lucide?.createIcons?.();

const modeButtons = document.querySelectorAll('[data-mode]');
const generateButton = document.querySelector('#generate');
const generateLabel = document.querySelector('.generate-label');
const creditCost = document.querySelector('.credit-cost');
const resultCard = document.querySelector('#result-card');
const resultImage = document.querySelector('#result-image');
const loadingState = document.querySelector('#loading-state');
const loadingCopy = document.querySelector('#loading-copy');
const draftStatus = document.querySelector('#draft-status');
const resultState = document.querySelector('#result-state');
const resultTitle = document.querySelector('#result-title');
const ratio = document.querySelector('#ratio');
const lighting = document.querySelector('#lighting');
const download = document.querySelector('#download');
const prompt = document.querySelector('#prompt');
let currentMode = 'photo';
let activeStyle = 'Editorial';
let generated = false;

const presets = {
  Editorial: { image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=90', title: 'A little more\nlike forever.' },
  Sunset: { image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=90', title: 'Stay close\nto the light.' },
  'City night': { image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=90', title: 'The night\nis ours.' },
  Coastal: { image: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1400&q=90', title: 'Meet me\nby the sea.' }
};

function setMode(mode) {
  currentMode = mode;
  modeButtons.forEach((button) => {
    const selected = button.dataset.mode === mode;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-selected', String(selected));
  });
  generateLabel.textContent = mode === 'video' ? 'Generate video' : 'Generate photo';
  creditCost.textContent = mode === 'video' ? '3 credits' : '1 credit';
}

modeButtons.forEach((button) => button.addEventListener('click', () => setMode(button.dataset.mode)));

document.querySelectorAll('.style-chip').forEach((button) => {
  button.addEventListener('click', () => {
    activeStyle = button.dataset.style;
    document.querySelectorAll('.style-chip').forEach((chip) => chip.classList.toggle('active', chip === button));
    const preset = presets[activeStyle];
    if (!generated) {
      resultImage.src = preset.image;
      resultTitle.innerHTML = preset.title.replace('\n', '<br />');
    }
  });
});

document.querySelectorAll('[data-upload]').forEach((input) => {
  input.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const preview = document.querySelector(`[data-preview="${input.dataset.upload}"]`);
    preview.src = URL.createObjectURL(file);
    preview.onload = () => URL.revokeObjectURL(preview.src);
  });
});

function setStatus(label, type = '') {
  draftStatus.className = `draft-status ${type}`;
  draftStatus.innerHTML = `<span class="status-dot"></span> ${label}`;
}

generateButton.addEventListener('click', () => {
  if (generateButton.disabled) return;
  generateButton.disabled = true;
  generated = false;
  loadingState.classList.add('visible');
  setStatus('Creating...');
  loadingCopy.textContent = currentMode === 'video' ? 'Adding a little movement...' : 'Composing the light and mood...';
  resultState.textContent = 'Creating your preview';
  resultTitle.style.opacity = '.25';
  window.setTimeout(() => {
    const preset = presets[activeStyle];
    resultImage.src = preset.image;
    resultTitle.innerHTML = currentMode === 'video' ? 'A tiny film\nof you two.' : preset.title.replace('\n', '<br />');
    resultTitle.style.opacity = '1';
    loadingState.classList.remove('visible');
    setStatus('Ready to review', 'done');
    resultState.textContent = currentMode === 'video' ? 'Video preview ready' : 'Photo preview ready';
    document.querySelector('.result-info small').textContent = `${activeStyle} preset - ${ratio.value} - ${lighting.value.toLowerCase()}`;
    download.href = preset.image;
    download.download = `vowly-${currentMode}-${activeStyle.toLowerCase().replaceAll(' ', '-')}.jpg`;
    generated = true;
    generateButton.disabled = false;
  }, currentMode === 'video' ? 2400 : 1750);
});

document.querySelectorAll('.recent-card[data-image]').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.recent-card').forEach((item) => item.classList.remove('active'));
    card.classList.add('active');
    resultImage.src = card.dataset.image;
    setStatus('Ready to create', 'ready');
    resultState.textContent = 'Sample preview';
  });
});

document.querySelector('#reset').addEventListener('click', () => {
  setMode('photo');
  activeStyle = 'Editorial';
  generated = false;
  document.querySelectorAll('.style-chip').forEach((chip) => chip.classList.toggle('active', chip.dataset.style === activeStyle));
  resultImage.src = presets.Editorial.image;
  resultTitle.innerHTML = presets.Editorial.title.replace('\n', '<br />');
  resultState.textContent = 'Sample preview';
  document.querySelector('.result-info small').textContent = 'Made with the Editorial preset';
  setStatus('Ready to create', 'ready');
  prompt.value = '';
});

iconRefresh();
