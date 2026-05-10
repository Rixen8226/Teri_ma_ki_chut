// --- Download Action ---
const downloadBtns = document.querySelectorAll('.download-action');
const apkUrl = 'King Store.apk';

downloadBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Store original text
        const originalText = this.innerHTML;
        
        // Change text to show download started
        this.innerHTML = 'Downloading...';
        this.style.opacity = '0.8';
        this.style.pointerEvents = 'none';

        // Trigger download
        try {
            const a = document.createElement('a');
            a.href = apkUrl;
            a.download = 'King Patcher.apk'; // Suggest filename
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            setTimeout(() => {
                this.innerHTML = 'Download Started! ✓';
            }, 500);

            // Reset after 4 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
            }, 4000);
        } catch(err) {
            // If error occurs
            this.innerHTML = 'Download Failed';
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
            }, 2000);
        }
    });
});

// --- Lightbox ---
const lb = document.getElementById('lb');
const lbBg = document.getElementById('lb-bg');
const lbClose = document.getElementById('lb-close');
const lbContent = document.getElementById('lb-content');
let lbOpen = false;

function openLb(type, url) {
    if (lbOpen) return;
    lbOpen = true;
    lbContent.innerHTML = '';
    if (type === 'video') {
        const v = document.createElement('video');
        v.src = url;
        v.controls = true;
        v.autoplay = true;
        v.playsInline = true;
        v.setAttribute('playsinline', '');
        v.setAttribute('webkit-playsinline', '');
        lbContent.appendChild(v);
    } else {
        const img = document.createElement('img');
        img.src = url;
        lbContent.appendChild(img);
    }
    lb.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLb() {
    if (!lbOpen) return;
    lbOpen = false;
    const videos = lbContent.querySelectorAll('video');
    videos.forEach(v => {
        v.pause();
        v.removeAttribute('src');
        v.load();
    });
    lb.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(() => {
        lbContent.innerHTML = '';
    }, 350);
}

lbBg.addEventListener('click', function(e) { e.stopPropagation(); closeLb(); });
lbClose.addEventListener('click', function(e) { e.stopPropagation(); closeLb(); });
lbClose.addEventListener('touchend', function(e) { e.preventDefault(); e.stopPropagation(); closeLb(); });
lbContent.addEventListener('click', function(e) { e.stopPropagation(); });

document.querySelectorAll('[data-url]').forEach(el => {
    el.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (lbOpen) return;
        openLb(el.dataset.type, el.dataset.url);
    });
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if(href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// --- Ticker ---
function initTicker() {
    const track = document.getElementById('ticker-track');
    if (!track) return;

    function generateMaskedName() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const partsCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 name parts
        let nameParts = [];
        for (let i = 0; i < partsCount; i++) {
            const firstChar = letters.charAt(Math.floor(Math.random() * letters.length));
            const starsCount = Math.floor(Math.random() * 5) + 3; // 3 to 7 stars
            nameParts.push(firstChar + '*'.repeat(starsCount));
        }
        return nameParts.join(' ');
    }

    const tools = ['Ludo King Controller', '82 Lottery Tool', '91Club Tool', '55Club Tool', 'Tiranga Tool', 'Big Mumbai Tool', 'Dui Win Tool', 'IN999 Tool', 'Jalwa Game Tool', 'Jai Club Tool', 'Goa Games Tool', 'BDG Win Tool', 'OkWin Tool', 'Big Daddy Tool','Sikkim Tool', 'Tashan WIn Tool'];
    let html = '';
    for (let i = 0; i < 25; i++) {
        const name = generateMaskedName();
        const tool = tools[Math.floor(Math.random() * tools.length)];
        html += `<div class="t-item"><span class="t-amt">${name}</span> purchased <span class="t-amt">${tool}</span></div>`;
    }
    track.innerHTML = html + html;
}

initTicker();

// FAQ Toggle
document.querySelectorAll('.faq-q').forEach((q) => {
    q.addEventListener('click', function () {
        const item = this.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach((el) => el.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});
