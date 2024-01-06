
var currentCat = 'accessories';
const alpaca = {
    ears: 'default',
    eyes: 'default',
    hair: 'default',
    leg: 'default',
    mouth: 'default',
    neck: 'default',
    nose: 'nose',
    backgrounds: 'blue50'
}


const createMenuBtn = (text, isActive) => {
    let btn = `
            <button type="button" class="menu__button ${isActive ? 'active' : ''}" 
            onclick="menuBtnOnClick(this.value)"
            value="${text}">${text}</button>`;
    return btn
}

const createPartsBtn = (text, isActive) => {
    console.log(isActive)
    let btn = `
            <button type="button" class="menu__button ${isActive ? 'active' : ''}" 
            onclick="partsBtnOnClick(this.value)"
            value="${text}">${text}</button>`;
    return btn
}

const menuBtnOnClick = (category) => {
    currentCat = category;
    renderMenuList()
}

const partsBtnOnClick = (part) => {
    alpaca[currentCat] = part;
    renderPartsList()
    renderImages()
}

const renderMenuList = () => {
    const menuCatEl = document.querySelector('.menu__categories')
    let menuList = data.map((cat) => {
        let newBtn = createMenuBtn(cat.name, currentCat == cat.name);
        return newBtn;
    }).join('')
    menuCatEl.innerHTML = menuList;
    renderPartsList()
}

const renderPartsList = () => {
    const menuPartsEl = document.querySelector('.menu__parts')
    let category = data.find(cat => cat.name == currentCat);
    let partList = category?.parts.map((part) => {
        let newBtn = createPartsBtn(part, alpaca[currentCat] == part);
        return newBtn;
    }).join('')
    menuPartsEl.innerHTML = `<h2>${currentCat}</h2>${partList}`;
}

const generateImages = () => {
    const images = []
    for (const [key, value] of Object.entries(alpaca)) {
        let image = `<img src="/src/img/${key}/${value}.png" class="${key}" alt="aplaca ${value}"></img>`
        images.push(image)
    }
    return images;
}

const renderImages = () => {
    const preview = document.querySelector('.customizer__preview > .preview')
    preview.innerHTML = ""
    let images = generateImages();
    images.forEach((img) => {
        preview.insertAdjacentHTML('beforeend', img)
    })
    insertLogo()
}

const randomizeAlpaca = () => {
    data.forEach((element) => {
        let pos = Math.floor(Math.random() * element.parts.length)
        let part = element.parts[pos]
        alpaca[element.name] = part;
    })
}

const randomAlpacaOnClick = () => {
    const randomBtn = document.querySelector('.action__button.randomize');
    randomBtn.addEventListener('click', () => { randomizeAlpaca(); renderImages() })
}

const htmlToImage = () => {
    const htmlEl = document.querySelector('.preview');
    html2canvas(htmlEl, {backgroundColor: null}).then((canvas) => {
        const imageDataURL = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = imageDataURL;
        a.download = "my-alpaca.png";
        a.click();
    })
}

const downloadImageOnClick = () => {
    const downloadBtn = document.querySelector('.action__button.download')
    downloadBtn.addEventListener('click', () => { htmlToImage() })
}

const insertLogo = () => {
    const preview = document.querySelector('.preview');
    const logo = document.createElement('span');
    logo.innerText = 'Otávio Cipriano'
    preview.append(logo)
}

renderMenuList()
renderImages()
randomAlpacaOnClick()
downloadImageOnClick()