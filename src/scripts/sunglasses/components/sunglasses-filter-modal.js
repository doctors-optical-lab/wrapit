const FilterModal = {
    name: "Filter Modal",
    delimiters: ["$%","%$"],
    template: `
    <div v-if="active" id="filter-modal">
        <h2>Filter Frames</h2>
        <button class="close-modal" @click="active=false">X</button>
        <p>Don’t know the model of your frame? Let us guide you step by step.</p>

        <div class="frame-material-container">
            <h3>Step 1: Select your frame material</h3>
            <ul class="selections">
                <li class="selection" v-for="material in filters['Frame Material'].values>$%material%$</li>
            </ul>
        </div>
        <div class="frame-shape-modal">
            <h3>Step 1: Select your frame shape</h3>
            <ul class="selections">
                <li class="selection" v-for="shape in filters['Frame Shape'].values>$%shape%$</li>
            </ul>
        </div>
    </div>
    `,
    props: {
        active: {
            type: Boolean,
            required: true
        },
        filters: {
            type: Object,
            required: true
        }
    },
    emits: ['filter'],
    setup(){
        return {
        }
    }
}