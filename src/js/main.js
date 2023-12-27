
function main() {
    renderList();
    listenMenuBtn()
}


function renderList(){
    let menu = document.querySelector('.menu__categories');
    let submenu =  document.querySelector('.category');
    let activeCat = alpacaMembers.find(el => el.active === true);

    let menuBtns = alpacaMembers.map((category) => {
        let btn = `<button type="button" class="menu__button ${category.active ? 'active' : ''}">${category.category}</button>`
        return btn
    }).join('')

    let submenuBtns = activeCat.category !== 'nose' ? activeCat.members.map((member) => {
        let btn = `<button type="button" class="menu__button ${member.active ? 'active' : ''}">${member.member}</button>`
        return btn
    }).join('') : ''

    let title = `<h3>${activeCat.category}</h3>`

    menu.innerHTML = menuBtns;
    submenu.innerHTML = submenuBtns;
    submenu.insertAdjacentHTML('afterbegin', title)
    listenMenuBtn()
}

function listenMenuBtn(){
    let menuBtns = document.querySelectorAll('.menu__categories > .menu__button');
    menuBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            let activeCat = alpacaMembers.find(el => el.active === true);
            if(alpacaMembers[idx] !== activeCat ){
                activeCat.active = false;
                alpacaMembers[idx].active = true;
                renderList()
            }
        })
    })
}


main()