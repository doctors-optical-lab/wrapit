/* USAGE

<Dropdown
    :options="[{ id: 1, name: 'Option 1'}, { id: 2, name: 'Option 2'}]"
    @selected="validateSelection"
    @filter="getDropdownValues"
    placeholder="Please select an option">
</Dropdown> 

*/
const { reactive, ref, computed, watch } = Vue

const SearchableDropDown = {
    name: "Searchable Dropdown",
    delimiters: ["$%","%$"],
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
    template: `
    <div class="dropdown" v-if="options">

        <input class="dropdown-input"
        @focus="showOptions()"
        @blur="exit()"
        @keyup="monitorEnterKey"
        v-model="searchFilter"
        :placeholder="placeholder" />

        <div class="dropdown-content"
        v-show="optionsShown">
            <div
                class="dropdown-item"
                @mousedown="selectOption(option)"
                v-for="(option, index) in filteredOptions"
                :key="index">
                {{ option.name || option.id || '-' }}
            </div>
        </div>
    </div>
    `,
    setup(){
        //DATA
        const data = reactive({
            selected: {},
            optionsShown: false,
            searchFilter: ''
        })

        //EMITS
        const emit = defineEmits(['selected', 'filter'])

        //METHODS
        function selectOption(option) {
            data.selected = option;
            data.optionsShown = false;
            data.searchFilter = data.selected.name;
            emit('selected', data.selected);
        }

        function showOptions(){
            data.searchFilter = '';
            data.optionsShown = true;
        }

        function exit() {
            if (!data.selected.id) {
              data.selected = {};
              data.searchFilter = '';
            } else {
              data.searchFilter = data.selected.name;
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
            const regOption = new RegExp(data.searchFilter, 'ig');
            for (const option of props.options) {
              if (data.searchFilter.length < 1 || option.name.match(regOption)){
                filtered.push(option);
              }
            }
            return filtered;
        })

        //WATCH
        watch(searchFilter, (searchFilterValue) => {
            if (filteredOptions.value.length === 0) {
              data.selected = {};
            } else {
              data.selected = filteredOptions.value[0];
            }
            emit('filter', searchFilterValue);
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



