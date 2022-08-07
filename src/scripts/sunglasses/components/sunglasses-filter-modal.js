const FilterModal = {
    name: "Filter Modal",
    delimiters: ["$%","%$"],
    template: `
    <div v-if="active" id="filter-modal">
        <h2>Filter Frames</h2>
        <button class="close-modal" @click="$emit('close')">X</button>
        <p>Don’t know the model of your frame? Let us guide you step by step.</p>
        <div class="frame-material-container">
            <h3>Step 1: Select your frame material</h3>
            <ul class="selections">
                <li 
                v-for="material in filters['Frame Material'].values"
                @click="activeFilters.material = material" 
                class="selection" 
                :class="{'active': activeFilters.material == material}"
                >$%material%$</li>
            </ul>
        </div>
        <div class="frame-shape-modal">
            <h3>Step 2: Select your frame shape</h3>
            <ul class="selections">
                <li  
                v-for="shape in filters['Frame Shape'].values"
                @click ="activeFilters.shape = shape" 
                class="selection"
                :class="{'active': activeFilters.shape == shape}"
                >$%shape%$</li>
            </ul>
        </div>
        
        <button class="submit" @click="$emit('filter', activeFilters)">Submit</button>
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
    emits: ['filter', 'close'],
    setup(){
        const activeFilters = reactive({
            material: '',
            shape: ''
        })

        return {
            activeFilters
        }
    }
}