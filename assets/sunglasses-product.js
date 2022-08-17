const SunglassesProductComponent = {
    name: 'Sunglasses Product Component',
    delimiters: ["$%","%$"],
    setup(){
        const product = reactive(productObject);
        const colors = computed(() => {
            let output = {};
            product.options['Lens Color'].forEach(color => {
                const sampleVariant = product.variants.find(variant => variant.options.includes(color));
                if(color in output) return;
                output[color] = {
                    "Lens Image": sampleVariant.image,
                    "Frame Image": sampleVariant.metafields['Frame Image'],
                    "Human Image": sampleVariant.metafields['Human Image'],
                    "Mirror Color Type": sampleVariant.metafields['Mirror Color Type'],
                    "Orb Image": sampleVariant.metafields['Orb Image']
                }
            })

            return output
            // Sample output
            // 'colors':{
            //     'Black':{
            //         'Frame Image':"https://cdn.shopify.com/s/files/1/0561/6166/5091/products/revant-lens-side-angle-ray-ban-wayfarer-ease-rb4340-50mm_767x_fb914b20-fe54-41e9-b520-dfdc4e34a2b5.webp?v=1660524516",
            //         'Human Image':"https://cdn.shopify.com/s/files/1/0561/6166/5091/products/revant-lens-lifestyle-gray-green-1_767x_6f02b5b2-d30d-4201-8f8b-8b6a335d0354.webp?v=1660524517",
            //         'Mirror Color Type':"Basic",
            //         'Orb Image':"https://cdn.shopify.com/s/files/1/0561/6166/5091/products/revant-lens-color-swatch-stealth-black-order-01_cc910741-0905-4185-ad8d-6c6cf812b985.webp?v=1660524514"
            //     },
            //     'Brown':{
            //         'Frame Image':"https://cdn.shopify.com/s/files/1/0561/6166/5091/products/revant-lens-side-angle-ray-ban-wayfarer-ease-rb4340-50mm_767x_fb914b20-fe54-41e9-b520-dfdc4e34a2b5.webp?v=1660524516",
            //         'Human Image':"https://cdn.shopify.com/s/files/1/0561/6166/5091/products/revant-lens-lifestyle-dark-brown-1_767x_286d12dd-6de4-42c1-b2b3-4624bb467ce6.webp?v=1660524518",
            //         'Mirror Color Type':"Mirrored",
            //         'Orb Image':"https://cdn.shopify.com/s/files/1/0561/6166/5091/products/revant-lens-color-swatch-stealth-black-order-01_cc910741-0905-4185-ad8d-6c6cf812b985.webp?v=1660524514"
            //     }
            // }
        })

        //GET the CURRENT ACTIVE VARIANT
        const selectedVariant = product.variants.find(variant => variant.id == product.selected_variant);
        const activeOptions = reactive({
            'Option1': selectedVariant.options[0],
            'Option2': selectedVariant.options[1],
            'Option3': selectedVariant.options[2]
        })

        //ACTIVE IMAGE
        const activeImage = ref(selectedVariant.image);

        //CHANGE PAGE URL BASED ON ACTIVE OPTION SELECTIONS
        watch(activeOptions, (values) => {
            let activeVariant = product.variants.find(variant => 
                variant.options[0] == values['Option1'] &&
                variant.options[1] == values['Option2'] &&
                variant.options[2] == values['Option3'])

            window.location.href = `?variant=${activeVariant.id}`
        })

        //ADD TO CART
        function addToCart(){
            let data = {
                'items': [
                    {
                     'id': Number(selectedVariant.id),
                     'quantity': 1
                    }
                ]
            }
            fetch(`${window.Shopify.routes.root}cart/add.js`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(data)
            }).then(response => {
                if(response.status == 200 && response.ok == true) window.location.href = '/cart'
            }).catch((error) => {
              console.error('Error:', error);
            });
        }

        return {
            product, colors, activeOptions, activeImage, addToCart
        }
    }
}

//render options  and images on the page. on selection click, change activeOptions
// check if activeOptions watcher works, meaning page url changes depending on the selected variant