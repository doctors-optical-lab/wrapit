const LensPanel = {
    name: "Lens Panel",
    delimiters: ["$%","%$"],
    template: `
    <section class="panel lens-selections-container">
        <div class="section-header">
            <i @click="$emit('change-panel', 'wrap-panel')" class="fa-solid fa-arrow-left"></i>
            <h3>Step 2 of 3: Select your Lens Color</h3>
        </div>
        <div class="section-images">
            <div class="featured-image-container">
                <img loading="lazy" class="featured-image" :src="featuredImage">
            </div>
            <div class="image-selections">
                <button class="human-image" 
                    @click="featuredImage = lensColors[userStates.option1]['Human Image']"
                    :class="{'active': featuredImage == lensColors[userStates.option1]['Human Image']}"
                >
                    <img loading="lazy"  :src="lensColors[userStates.option1]['Human Image']">
                </button>
                <button class="lens-image" 
                    @click="featuredImage = lensColors[userStates.option1]['Lens Image']"
                    :class="{'active': featuredImage == lensColors[userStates.option1]['Lens Image']}"
                >
                    <img loading="lazy"  :src="lensColors[userStates.option1]['Lens Image']">
                </button>
            </div>
        </div>
        <div class="color-selections">
            <h3>Your lens color: $%userStates.option1%$</h3>
            <div class="color-group basic">
                <h4>Basic Colors</h4>
                <ul>
                    <template v-for="(colorValues, colorName) in lensColors">
                        <li v-if="colorValues['Mirror Color Type'] == 'Basic'"
                            :class="{'active': userStates.option1 == colorName}">
                            <button :class="colorName" @click="$emit('change-color', colorName)">
                                <img loading="lazy" :src="colorValues['Orb Image']">
                            </button>
                        </li>
                    </template>
                </ul>
            </div>
            <div class="color-group mirrored">
                <h4>Mirrored Colors <span>+$5</span></h4>
                <ul>
                    <template v-for="(colorValues, colorName) in lensColors">
                        <li v-if="colorValues['Mirror Color Type'] == 'Mirrored'"
                            :class="{'active': userStates.option1 == colorName}">
                            <button :class="colorName"  @click="$emit('change-color', colorName)">
                                <img loading="lazy" :src="colorValues['Orb Image']">
                            </button>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
        <div class="lens-type-selections">
            <h3>Step 3 of 3: Select your Lens Type</h3>
            <div class="selections">
                <button 
                    v-for="lensType in product.options['Lens Type']"
                    @click="$emit('change-lens-type', lensType)" 
                    :class="[
                        {
                            'active': userStates.option2 == lensType,
                            'inactive': !lensColors[userStates.option1]['Available Option2'].includes(lensType)
                        }, 
                        lensType
                    ]"
                >$%lensType%$</button>
            </div>
        </div>
        <div class="section-footer">
            <div class="subtotal-information">
                <ul class="list-items">
                    <li><span class="item">Expert Lens Installation</span><span class="price">$20</span></li>
                    <li v-if="lensColors[userStates.option1]['Mirror Color Type'] == 'Mirrored'"><span class="item">Mirrored Color</span><span class="price">$5</span></li>
                    <li v-if="userStates.option2 == 'Polarized +$20'"><span class="item">Polarized Lens</span><span class="price">$20</span></li>
                    <li v-if="userStates.option3 == 'High Wrap +$20'"><span class="item">High Wrap Frame</span><span class="price">$20</span></li>
                </ul>
                <p class="subtotal"><span class="label">Total</span><span class="value">$%selectedVariant.price%$</span></p>
            </div>
            <button @click="addToCart()" class="add-to-cart button-1">Add to Cart<i class="fa-solid fa-angle-right"></i></button>
        </div>
    </section>
    `,
    props: {
        product: {
            type: Object,
            required: true
        },
        userStates: {
            type: Object,
            required: true
        },
        selectedVariant:{
            type: Object,
            required: true
        }
    },

    emits: ['change-panel', 'change-color', 'change-lens-type'],

    setup(props){
        const lensColors = computed(() => {
            let output = {};

            props.product.options['Lens Color'].forEach(color => {
                const colorVariants = props.product.variants.filter(variant => variant.options.includes(color));
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

        //REFs DEPENDENT ON COMPUTED
        const featuredImage = ref(lensColors.value[props.selectedVariant.options[0]]['Human Image']);

        //WATCH
        watch(
            () => props.userStates.option1,
            (color) => featuredImage.value = lensColors.value[color]['Human Image']
        )

        //METHODS
        function addToCart(){
            let data = {
                'items': [
                    {
                        'id': Number(props.selectedVariant.id),
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
                else console.error(response, JSON.stringify(data));
            })
        }

        return {
            lensColors, featuredImage, addToCart
        }
    }
}