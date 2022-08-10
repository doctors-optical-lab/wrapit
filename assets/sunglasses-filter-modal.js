const FilterModal = {
    name: "Filter Modal",
    delimiters: ["$%","%$"],
    template: `
    <div v-if="active" @click.stop="$emit('close')" id="filter-modal">
        <div class="container">
            <button class="close-modal" @click.stop="$emit('close')"><i class="fa-solid fa-xmark"></i></button>
            <div class="title-container">
                <h2>Filter Frames</h2>
                <p>Don’t know the model of your frame? Let us guide you step by step.</p>
            </div>
            <div class="filter-container frame-material-container">
                <h3>Step 1: Select your frame material</h3>
                <ul class="selections">
                    <li 
                    v-for="material in filters['Frame Material'].values"
                    @click.stop="activeFilters.material = material" 
                    class="selection" 
                    :class="{'active': activeFilters.material == material}"
                    >$%material%$</li>
                </ul>
            </div>
            <div class="filter-container frame-shape-container">
                <h3>Step 2: Select your frame shape</h3>
                <ul class="selections">
                    <li  
                    v-for="shape in filters['Frame Shape'].values"
                    @click.stop ="activeFilters.shape = shape" 
                    class="selection"
                    :class="{'active': activeFilters.shape == shape}"
                    >$%shape%$</li>
                </ul>
            </div>
            
            <button 
            class="submit button-1" 
            :class="{'active': activeFilters.material && activeFilters.shape}"
            @click="$emit('close'); $emit('filter', activeFilters);"
            >Filter Frames</button>
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