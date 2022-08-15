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
            'Option 1': product.variants[0].options[0],
            'Option 2': product.variants[0].options[1],
            'Option 3': product.variants[0].options[2]
        })
        return {
            product, colors
        }
    }
}