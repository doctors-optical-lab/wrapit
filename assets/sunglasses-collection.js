const SunglassesCollectionComponent = {
    name: "Sunglasses Collection Component",
    delimiters: ["$%","%$"],
    setup(){
        const collection = reactive(collectionObject);
		const filterModal = ref(false);
        const activeFilters = reactive({
            material: '',
            shape: ''
        })

        function selectFrame(event){
			window.location.href = `?${createFilterUrl(collection.filters['Catalog Title']['parameter-name'], event)}`
		}

		function createFilterUrl(parameter, value){
			return `${parameter}=${value.replace(' ', '+')}`
		}

		//CHANGE URL BASED ON FILTERS
		watch(activeFilters, (values) => {
			let materialURL = createFilterUrl(collection.filters['Frame Material']['parameter-name'], values.material),
				shapeURL = createFilterUrl(collection.filters['Frame Shape']['parameter-name'], values.shape);
			
			window.location.href = `?${materialURL}&${shapeURL};`
		})

        return {
          collection, filterModal, activeFilters, selectFrame, createFilterUrl
        }
    }
}