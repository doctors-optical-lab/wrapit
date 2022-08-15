const SunglassesProductComponent = {
    name: 'Sunglasses Product Component',
    delimiters: ["$%","%$"],
    setup(){
        const product = reactive(productObject)
        const colors = computed(() => {
            let output = {};

            product.options['Lens Color'].forEach(color => {
                let sampleVariant = product.variants.find(variant => variant.options.contains(color));
                output[color] = {
                    "Frame Image": sampleVariant.metafields['Frame Image'],
                    "Human Image": sampleVariant.metafields['Human Image'],
                    "Mirror Color Type": sampleVariant.metafields['Mirror Color Type'],
                    "Orb Image": sampleVariant.metafields['Orb Image']
                }
            })

            return 'hello'
            return output

            // Example output
        })

        return {
            product, colors
        }
    }
}