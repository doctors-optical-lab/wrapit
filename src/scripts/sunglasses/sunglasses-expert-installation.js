fetch('https://wrapit-inc.myshopify.com/collections/expert-lens-replacement')
.then(response => response.json())
.then(data => console.log(data))