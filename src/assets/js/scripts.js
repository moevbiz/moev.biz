let filters = document.querySelectorAll('.filter');
let elements = document.querySelectorAll('.el');
const frameContainer = document.querySelector('#frame-container');
const frameWrapper = document.querySelector('#frame-wrapper');
const frame = document.querySelector('#frame');
const frameLink = document.querySelector('#framelink');
const frameInfoTop = document.querySelector('#frame-info-top');
const frameInfoBtm = document.querySelector('#frame-info-bottom');
const links = document.querySelectorAll('.main-content a[data-frame-info-btm]');
const closeBtn = document.querySelector('#close-frame');

if (document.querySelector('.fitty')) {
    fitty('.fitty');
}

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
}

function chChChChanges() {
    let el = document.querySelector('#description');
    let options = el.dataset.options.split(',');
    shuffleArray(options);
    el.innerText = options[0] == '' ? options[0] : options[1];
    el.dataset.options = options.toString(', ');
}

chChChChanges();
window.setInterval(chChChChanges, '3000');

function addClickEventListener(element, clickEvent) {
    const dragTolerance = 6;
    let startX;
    let startY;

    element.addEventListener('mousedown', function (event) {
        startX = event.pageX;
        startY = event.pageY;
    });

    element.addEventListener('mouseup', function (event) {
        const diffX = Math.abs(event.pageX - startX);
        const diffY = Math.abs(event.pageY - startY);

        if (diffX < dragTolerance && diffY < dragTolerance) {
            clickEvent(event);
        }
    });
}

function openIframe(link, infoTop = '', infoBtm = '') {
    frame.parentElement.style.width = '75%';
    document.body.classList.add('frame-visible');
    document.body.style.overflow = 'hidden';
    show(frame.parentElement);
    frame.src = link;
    frameLink.href = link;
    frameInfoTop.innerHTML = infoTop;
    frameInfoBtm.innerHTML = infoBtm;
    // frameWrapper.style.width = getStoredIframeWidth();
}

function closeIframe() {
    document.body.classList.remove('frame-visible');
    document.body.style.removeProperty('overflow');
    frame.src = '';
    frameLink.href = '';
    hide(frame.parentElement);
    document.body.classList.remove('frame-loaded');
    // storeIframeWidth();
}

function resetIframeSize() {
    frame.parentElement.style.width = (window.innerWidth / 100) * 75 + 'px';
}

function getStoredIframeWidth() {
    return localStorage.getItem('frameWidth');
}

function storeIframeWidth() {
    localStorage.setItem('frameWidth', window.getComputedStyle(frameWrapper).width);
}

makeResizable('.resizable');

function toggleInput(input) {
    if (input != "All") {
        document.body.classList.add('filtered')
    } else {
        document.body.classList.remove('filtered')
    }
    filters.forEach((filter) => {
        if (filter.dataset.filterValue == input) {
            filter.classList.add('selected')
        } else {
            filter.classList.remove('selected')
        }
    })
    elements.forEach((element) => {
        if (input === "All") {
            show(element)
        } else if (element.dataset.type.split(',').includes(input)) {
            show(element)
        } else {
            hide(element)
        }
    })
}

function makeResizable(div) {
    const element = document.querySelector(div);
    const resizers = element.querySelectorAll('.resizeHandle');
    resizers.forEach(r => {
        
        r.addEventListener('mousedown', function(e) {
            e.preventDefault();
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        });
        
        function resize(e) {
            document.body.classList.add('is-being-resized');
            if (r.classList.contains('resizeHandle-w')) {
                element.style.width = (e.pageX - element.getBoundingClientRect().left) + 'px'; 
            } else {
                element.style.width = (element.getBoundingClientRect().right - e.pageX) + 'px';
            }
        }
        
        function stopResize() {
            window.removeEventListener('mousemove', resize);
            document.body.classList.remove('is-being-resized');
        }
    });
};

function show(el) {
    el.classList.add('visible')
    el.classList.remove('hidden')
}

function hide(el) {
    el.classList.add('hidden')
    el.classList.remove('visible')
}

filters.forEach((filter) => {
    filter.addEventListener('click', function(e) {
        toggleInput(filter.dataset.filterValue)
    })
})

links.forEach(link => {
    link.addEventListener('click', e => {
        // open link in new tab if command key is pressed
        if (e.metaKey) return;
        // else open link in iframe
        e.preventDefault();
        openIframe(link.href, link.dataset.frameInfoTop, link.dataset.frameInfoBtm);
    })
})

function clickOnFrameContainer(e) {
    if (e.target === frame 
        || e.target === frameLink 
        || e.target.classList.contains('c') 
        || e.target.classList.contains('resizeHandle')) return;
    if (frame.parentElement.classList.contains('visible')) {
        closeIframe(frame);
    };
}

addClickEventListener(frameContainer, clickOnFrameContainer);

frame.addEventListener('error', () => {
    console.log('frame err');
})

frame.addEventListener('load', () => {
    if (frame.parentElement.classList.contains('hidden')) return;
    document.body.classList.add('frame-loaded');
})