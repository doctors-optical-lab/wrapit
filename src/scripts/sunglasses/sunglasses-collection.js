const SunglassesCollectionComponent = {
    name: "Sunglasses Collection Component",
    delimiters: ["$%","%$"],
    setup(){
        const collection = reactive(collectionObject);
		const filterModal = ref(false);
        const activeFilters = reactive({
            material: collection.filters['Frame Material']['active-values'][0],
            shape: collection.filters['Frame Shape']['active-values'][0]
        });

        function selectFrame(event){
			window.location.href = `?${createFilterUrl(collection.filters['Catalog Title']['parameter-name'], event)}`
		};

		function createFilterUrl(parameter, value){
			return `${parameter}=${value.replace(' ', '+')}`
		};

		function clearFilters(){
			activeFilters.material = '';
			activeFilters.shape = '';
		}
		//CHANGE URL BASED ON FILTERS
		watch(activeFilters, (values) => {
			if(!activeFilters.material || !activeFilters.shape) window.location.href = '';
			else{
				let materialURL = createFilterUrl(collection.filters['Frame Material']['parameter-name'], values.material),
					shapeURL = createFilterUrl(collection.filters['Frame Shape']['parameter-name'], values.shape);
				
				window.location.href = `?${materialURL}&${shapeURL};`
			}
		})

        return {
          collection, filterModal, activeFilters, selectFrame, createFilterUrl, clearFilters
        }
    }
}