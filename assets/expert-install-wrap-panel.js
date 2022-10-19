const WrapPanel = {
    name: "Wrap Panel",
    delimiters: ["$%","%$"],
    template: `
    <section class="panel wrap-type-container">
        <div class="section-header">
            <i onclick="display('#expert-installation', false)" class="fa-solid fa-arrow-left"></i>
            <h3>Step 1 of 3: Identify your Frame Wrap</h3>
            <button class="tutorial-link">How to identify my frame</button>
        </div>
        <div class="selections">
            <button 
                v-for="wrap in product.options['Frame Wrap']"
                @click="$emit('change-wrap', wrap)" 
                :class="{
                    'active': userStates.option3 == wrap
                }"
            ><div class="content">$%wrap%$</div></button>
        </div>
        <button class="cta button-1" @click="$emit('change-panel', 'lens-panel')">Next Step<i class="fa-solid fa-angle-right"></i></button>
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
    emits: ['change-panel', 'change-wrap']
}