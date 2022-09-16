function display(selector, toggle=true){
    let element = document.querySelector(selector);
    if(toggle) element.classList.add('display');
    else element.classList.remove('display');
}

async function fetchNoLayoutPages(pageList){
    // example
    // pageList = {
    //     'High Wrap': '/products/sunglasses-replacement-lenses-for-high-wrap-frames',
    //     'Low Wrap': '/products/sunglasses-replacement-lenses-for-low-wrap-frames'
    // }

    let pages = {...pageList};

    for(pageName of Object.keys(pages)){
        await fetch(pages[pageName])
        .then(response => response.json())
        .then(data => pages[pageName] = data)
    }

    Object.keys(pages).forEach(pageName => {
    })

    return pages
}