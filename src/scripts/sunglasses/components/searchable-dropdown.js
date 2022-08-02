/* USAGE

<SearchableDropDown
    :options="[{ id: 1, name: 'Option 1'}, { id: 2, name: 'Option 2'}]"
    @selected="validateSelection(event)"
    placeholder="Please select an option">
</SearchableDropDown> 

*/
const SearchableDropDown = {
    name: "Searchable Dropdown",
    delimiters: ["$%","%$"],
    template: `
    <div class="dropdown" v-if="options">

        <input class="dropdown-input"
        @focus="showOptions()"
        @blur="exit()"
        @keyup="monitorEnterKey"
        v-model="data.searchFilter"
        :placeholder="placeholder" />

        <div class="dropdown-content"
        v-show="data.optionsShown">
            <div
                class="dropdown-item"
                @click="selectOption(option)"
                v-for="(option, index) in filteredOptions"
                :key="index">
                $% option || '-' %$
            </div>
        </div>
    </div>
    `,
    props: {
        options: {
            type: Array,
            required: true,
            default: []
        },
        placeholder: {
            type: String,
            required: false,
            default: 'Please select an option'
        }
    },
    emits: ['selected', 'filter'],
    setup(props, { emit }){
        //DATA
        const data = reactive({
            selected: '',
            optionsShown: false,
            searchFilter: ''
        })

        //METHODS
        function selectOption(option) {
            console.log(option)
            data.selected = option;
            // data.optionsShown = false;
            data.searchFilter = option;
            emit('selected', option);
        }

        function showOptions(){
            data.searchFilter = '';
            data.optionsShown = true;
            console.log('showoptions');
        }

        function exit() {
            if (!data.selected.id) {
                data.selected = {};
                data.searchFilter = '';
            } else {
                data.searchFilter = data.selected;
            }
            emit('selected', data.selected);

            data.optionsShown = false;
        }

        function monitorEnterKey(event) {
            if (event.key === "Enter" && filteredOptions.value[0])
            selectOption(filteredOptions.value[0]);
        }

        //COMPUTED
        const filteredOptions = computed(() => {
            const filtered = [];
            for (const option of props.options) {
                if (option.toLowerCase().includes(data.searchFilter.toLowerCase())){
                    filtered.push(option);
                }
            }
            return filtered;
        })

        //WATCH
        watch(data, (values) => {
            console.log(filteredOptions)
            if (filteredOptions.value.length === 0) {
              data.selected = {};
            } else {
              data.selected = filteredOptions.value[0];
            }
        })

        return {
            data,
            filteredOptions,
            selectOption,
            showOptions,
            exit,
            monitorEnterKey,
        }
    }
}



