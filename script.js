// 設定總頁數（0 到 19 頁，共 20 頁）
const TOTAL_PAGES = 20; 
let currentPage = 0;

// 聲音開關狀態
let isMusicEnabled = true;
let isSpeechEnabled = true;

// 音訊副檔名設定
const AUDIO_EXT = '.mp3'; 

// 取得 HTML 元素
const pageImg = document.getElementById('page-image');
const pageNumText = document.getElementById('page-number');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const toggleMusicBtn = document.getElementById('toggle-music-btn');
const toggleSpeechBtn = document.getElementById('toggle-speech-btn');
const playSoundBtn = document.getElementById('play-sound-btn');

const bgMusic = document.getElementById('bg-music');
const speechAudio = document.getElementById('speech-audio');

// 初始化載入第一頁
loadPage(currentPage);

// 載入頁面內容
function loadPage(pageIndex) {
    // 1. 更新圖片
    pageImg.src = `assets/graphics/${pageIndex}.jpg`;

    // 2. 更新文字頁碼
    pageNumText.textContent = `頁數 ${pageIndex + 1} / ${TOTAL_PAGES}`;

    // 3. 更新按鈕啟用狀態
    prevBtn.disabled = (pageIndex === 0);
    nextBtn.disabled = (pageIndex === TOTAL_PAGES - 1);

    // 4. 更新音樂與旁白來源
    bgMusic.src = `assets/music/music${pageIndex}${AUDIO_EXT}`;
    speechAudio.src = `assets/speech/speech${pageIndex}${AUDIO_EXT}`;

    // 5. 播放音訊
    playAudio();
}

// 播放音樂與旁白控制邏輯
function playAudio() {
    bgMusic.volume = 0.4;
    speechAudio.volume = 1.0;

    // 依據開關狀態播放或暫停
    if (isMusicEnabled) {
        bgMusic.play().catch(err => console.log("背景音樂自動播放受阻", err));
    } else {
        bgMusic.pause();
    }

    if (isSpeechEnabled) {
        speechAudio.play().catch(err => console.log("旁白自動播放受阻", err));
    } else {
        speechAudio.pause();
    }
}

// 開關背景音樂按鈕事件
toggleMusicBtn.addEventListener('click', () => {
    isMusicEnabled = !isMusicEnabled;
    
    if (isMusicEnabled) {
        toggleMusicBtn.textContent = '🎵 背景音樂：開';
        toggleMusicBtn.classList.remove('muted');
        toggleMusicBtn.classList.add('active');
        bgMusic.play().catch(err => console.log(err));
    } else {
        toggleMusicBtn.textContent = '🎵 背景音樂：關';
        toggleMusicBtn.classList.remove('active');
        toggleMusicBtn.classList.add('muted');
        bgMusic.pause();
    }
});

// 開關語音旁白按鈕事件
toggleSpeechBtn.addEventListener('click', () => {
    isSpeechEnabled = !isSpeechEnabled;

    if (isSpeechEnabled) {
        toggleSpeechBtn.textContent = '🗣️ 語音旁白：開';
        toggleSpeechBtn.classList.remove('muted');
        toggleSpeechBtn.classList.add('active');
        speechAudio.play().catch(err => console.log(err));
    } else {
        toggleSpeechBtn.textContent = '🗣️ 語音旁白：關';
        toggleSpeechBtn.classList.remove('active');
        toggleSpeechBtn.classList.add('muted');
        speechAudio.pause();
    }
});

// 上一頁按鈕處理
prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        loadPage(currentPage);
    }
});

// 下一頁按鈕處理
nextBtn.addEventListener('click', () => {
    if (currentPage < TOTAL_PAGES - 1) {
        currentPage++;
        loadPage(currentPage);
    }
});

// 手動重新播放按鈕處理
playSoundBtn.addEventListener('click', () => {
    // 重新播放目前頁面的音訊
    if (isMusicEnabled) bgMusic.currentTime = 0;
    if (isSpeechEnabled) speechAudio.currentTime = 0;
    playAudio();
});

// 支援鍵盤左右箭頭切換
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentPage > 0) {
        currentPage--;
        loadPage(currentPage);
    } else if (e.key === 'ArrowRight' && currentPage < TOTAL_PAGES - 1) {
        currentPage++;
        loadPage(currentPage);
    }
});