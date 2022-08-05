const FilterModal = {
    name = "Filter Modal",
    delimiters: ["$%","%$"],
    template: `
    <div v-if="active" id="filter-modal">
        <h2>Filter Frames</h2>
        <p>Don’t know the model of your frame? Let us guide you step by step.</p>

        <div class="frame-material-container">
        
        </div>
        <div class="frame-shape-modal">

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