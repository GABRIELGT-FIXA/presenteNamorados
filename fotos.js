const motivos = [
    "Seu sorriso ilumina meu dia 😊",
    "Você me faz feliz até nos dias difíceis 💫",
    "Você me entende como ninguém 💬",
    "Seu abraço é como uma casa aconchegante 🤗",
    "A vida com você é muito mais linda ❤️"
];

const cartinha = "Desde o dia que te conheci, minha vida ganhou mais leveza, mais paz e muito amor. Você é a minha benção todos os dias.";

const finalMensagem = "Feliz Dia dos Namorados! 💘 Te amo mais do que todas as palavras podem dizer.";

const totalFotos = 20;
let fase = 1;
let motivoIndex = 0;
let fotoAtual = 1;

const textoEl = document.getElementById('texto');
const botao = document.getElementById('botaoProximo');
const fotoEl = document.getElementById('foto');

botao.addEventListener('click', () => {
    if (fase === 1) {
        // mostrar motivos, um a um
        if (motivoIndex < motivos.length) {
            textoEl.textContent = motivos[motivoIndex];
            motivoIndex++;
        } else {
            fase = 2;
            textoEl.textContent = "";
            fotoEl.src = `fotos/foto ${fotoAtual}.jpeg`;
            fotoEl.style.display = 'block';
            botao.textContent = 'Próxima Foto ➡️';
        }
    } else if (fase === 2) {
        // trocar fotos
        fotoAtual++;
        if (fotoAtual > totalFotos) {
            fase = 3;
            fotoEl.style.display = 'none';
            textoEl.textContent = cartinha;
            botao.textContent = 'Mensagem Final ➡️';
        } else {
            fotoEl.src = `fotos/foto ${fotoAtual}.jpeg`;
        }
    } else if (fase === 3) {
        // mostrar mensagem final
        textoEl.textContent = finalMensagem;
        botao.style.display = 'none';
    }
});

function setupMusicPlayer() {
    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    if (!musicControls || !musicToggle || !bgMusic || !musicSource) return;

    const defaultConfig = {
        music: {
            enabled: true,
            musicUrl: "musica.mp3",
            autoplay: false,
            volume: 0.5,
            startText: "🎵 Play Music",
            stopText: "⏸️ Pause Music"
        }
    };

    const config = window.VALENTINE_CONFIG || defaultConfig;

    if (!config.music.enabled) {
        musicControls.style.display = 'none';
        return;
    }

    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume;
    bgMusic.load();

    if (config.music.autoplay) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.log("Autoplay prevented");
                musicToggle.textContent = config.music.startText;
            });
        }
    }

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
}

window.addEventListener("DOMContentLoaded", setupMusicPlayer);
