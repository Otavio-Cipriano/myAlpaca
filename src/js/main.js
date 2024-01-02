
var currentCat = 'accessories';
const alpaca = {}


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
    menuPartsEl.innerHTML = `<h3>${currentCat}</h3>${partList}`;
}

const generateImages = () => {
    const images = []
    // Object.values(alpaca).map((part) => {
    //     let image = `<img src="/src/img/${Object.entries(alpaca).find(el =)}/${part}.png" alt="aplaca ${part}"></img>`
    //     return image;
    // })
    for (const [key, value] of Object.entries(alpaca)) {
        let image = `<img src="/src/img/${key}/${value}.png" class="${key}" alt="aplaca ${value}"></img>`
        images.push(image)
    }
    return images;
}

const renderImages = () => {
    const preview = document.querySelector('.customizer__preview')
    preview.innerHTML = ""
    let images = generateImages();
    images.forEach((img) => {
        preview.insertAdjacentHTML('beforeend', img)
    })
}

renderMenuList()