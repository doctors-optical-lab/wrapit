async function initializeExpertInstallation(){
    let productData = {};

    await fetch('https://wrapit-inc.myshopify.com/products/expert-lens-replacement')
    .then(response => response.json())
    .then(data => productData = data)
    
    const ExpertInstallationComponent = {
        name: 'Expert Installation Component',
        delimiters: ["$%","%$"],
        setup(){
            //INIT
            const product = productData;

            //REACTIVE
            const userStates = reactive({
                option1: product.variants[0].options[0],
                option2: product.variants[0].options[1],
                option3: product.variants[0].options[2]
            });
            const currentPanel = ref('wrap-panel');

            //COMPUTED
            const selectedVariant = computed(() => {
                let newSelectedVariant = product.variants.find(variant => {
                    return variant.options[0] == userStates.option1 &&
                    variant.options[1] == userStates.option2 &&
                    variant.options[2] == userStates.option3
                })

                // edge case: Polarized is selected but then user chooses a color that does not support polarized
                if (!newSelectedVariant) {
                    newSelectedVariant = product.variants.find(variant => {
                        return variant.options[0] == userStates.option1;
                    })
                    userStates.option1 = newSelectedVariant.options[0];
                    userStates.option2 = newSelectedVariant.options[1];
                    userStates.option3 = newSelectedVariant.options[2];
                }

                return newSelectedVariant;
            })

            return {
                product, userStates, currentPanel, selectedVariant
            }
        }
    }

    const ExpertInstallationApp = createApp(ExpertInstallationComponent);
    ExpertInstallationApp.component('wrap-panel', WrapPanel);
    ExpertInstallationApp.component('lens-panel', LensPanel);
    ExpertInstallationApp.mount('#expert-installation')
}