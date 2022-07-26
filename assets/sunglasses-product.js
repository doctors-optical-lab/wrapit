const SunglassesProductComponent = {
    name: 'Sunglasses Product Component',
    delimiters: ["$%","%$"],
    setup(){
        const frame = productObject;
        const lensProduct = ref({});
        const userStates = reactive({
            selectedVariant: {},
            selectedOptions: [],
            selectedImage: ''
        })

		// INITIALIZATION: Fetch lens product, then populate userStates
		let lensProducts = {
			"High Wrap": '/products/sunglasses-replacement-lenses-for-high-wrap-frames',
			"Low Wrap": '/products/sunglasses-replacement-lenses-for-low-wrap-frames'
		}
		fetchNoLayoutPages(lensProducts).then(response => {
            lensProduct.value = response[frame.metafields['Frame Wrap']]
            populateUserStates();
        })

        function populateUserStates(){
            userStates.selectedVariant = lensProduct.value.variants.find(variant => {
                return variant.id == lensProduct.value.selected_variant
            });

            userStates.selectedOptions = [
                userStates.selectedVariant.options[0],
                userStates.selectedVariant.options[1],
                userStates.selectedVariant.options[2]
            ]

            userStates.selectedImage = userStates.selectedVariant.metafields['Human Image']
        }

        //COMPUTED
        const lensColors = computed(() => {
            let output = {};

            if(Object.keys(lensProduct.value).length < 1) return output;

            lensProduct.value.options['Lens Color'].forEach(color => {
                const colorVariants = lensProduct.value.variants.filter(variant => variant.options.includes(color));
                const sampleVariant = colorVariants[0];
                
                if(color in output) return;
                output[color] = {
                    "Lens Image": sampleVariant.image,
                    "Frame Image": sampleVariant.metafields['Frame Image'],
                    "Human Image": sampleVariant.metafields['Human Image'],
                    "Mirror Color Type": sampleVariant.metafields['Mirror Color Type'],
                    "Orb Image": sampleVariant.metafields['Orb Image'],
                    "Available Option2": filterUnique(colorVariants.map(variant => variant.options[1])),
                    "Available Option3": filterUnique(colorVariants.map(variant => variant.options[2]))
                }
            })

            return output

            function filterUnique(array){
                let output = []

                for(item of array){
                    if(!output.includes(item)) output.push(item)
                }
                return output;
            }
        })

        //WATCH
        // When userStates.selectedOptions change, automatically change userStates.selectedVariant
        watch(
            () => userStates.selectedOptions,
            (options) => {
                let newSelectedVariant = lensProduct.value.variants.find(variant => {
                    return variant.options.join() == options.join();
                })

                // edge case: Polarized is selected but then user chooses a color that does not support polarized
                if (!newSelectedVariant) {
                    newSelectedVariant = lensProduct.value.variants.find(variant => {
                        return variant.options[0] == options[0];
                    })
                    userStates.selectedOptions[1] = newSelectedVariant.options[1];
                    userStates.selectedOptions[2] = newSelectedVariant.options[2];
                }

                userStates.selectedVariant = newSelectedVariant;
                userStates.selectedImage = userStates.selectedVariant.metafields['Human Image'];

            },
            { deep: true }
        )

        //METHODS
        function addToCart(){
            let data = {
                'items': [
                    {
                        'id': Number(userStates.selectedVariant.id),
                        'quantity': 1
                    },
                    {
                        'id': Number(frame.selected_variant),
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
                if(response.status == 200 && response.ok == true) window.location.href = '/cart';
            }).catch((error) => {
              console.error('Error:', error);
            });
        }

        return {
            frame, lensProduct, userStates, lensColors, addToCart
            // activeOptions, activeImage, 
        }
    }
}
