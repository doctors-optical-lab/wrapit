function display(selector, toggle=true){
    let element = document.querySelector(selector);
    if(toggle) element.classList.add('display');
    else element.classList.remove('display');
}