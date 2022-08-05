const FilterModal = {
    name = "Filter Modal",
    delimiters: ["$%","%$"],
    template: `
    <div id="filter-modal">
        <h2>Filter Frames</h2>
        <p>Don’t know the model of your frame? Let us guide you step by step.</p>

        <div class="frame-material-container">
        
        </div>
        <div class="frame-shape-modal">

        </div>
    </div>
    `,
    props: {
        id: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true
        },
        placeholder: {
            type: String,
            required: false,
            default: 'Please select an option'
        }
    },
    emits: ['selected', 'filter'],
    setup(){
        return {
        }
    }
}