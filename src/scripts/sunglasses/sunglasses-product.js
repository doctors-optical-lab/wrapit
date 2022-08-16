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
                    "Frame Image": sampleVariant.metafields['Frame Image'],
                    "Human Image": sampleVariant.metafields['Human Image'],
                    "Mirror Color Type": sampleVariant.metafields['Mirror Color Type'],
                    "Orb Image": sampleVariant.metafields['Orb Image']
                }
            })

            return output

            // Example output
        })

        //GET the CURRENT ACTIVE VARIANT
        const activeOptions = reactive({
            'Option1': product.variants[0].options[0],
            'Option2': product.variants[0].options[1],
            'Option3': product.variants[0].options[2]
        })

        //CHANGE PAGE URL BASED ON ACTIVE OPTION SELECTIONS
        watch(activeOptions, (values) => {
            let activeVariant = product.variants.find(variant => {
                variant.options[0] = activeOptions['Option1'],
                variant.options[1] = activeOptions['Option2'],
                variant.options[2] = activeOptions['Option3']
            })

            window.location.href = `?variant=${activeVariant.id}`
        })
        return {
            product, colors, activeOptions
        }
    }
}

//render options  and images on the page. on selection click, change activeOptions
// check if activeOptions watcher works, meaning page url changes depending on the selected variant