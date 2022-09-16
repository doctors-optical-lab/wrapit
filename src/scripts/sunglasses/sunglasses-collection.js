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
		const lensInformation = ref({});

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

		// FETCH LENS PRODUCTS (specific products are hard coded here)
		let lensProducts = {
			"High Wrap": '/products/sunglasses-replacement-lenses-for-high-wrap-frames',
			"Low Wrap": '/products/sunglasses-replacement-lenses-for-low-wrap-frames'
		}
		fetchNoLayoutPages(lensProducts).then(response => lensInformation.value = response)

		//CHANGE URL BASED ON FILTERS
		watch(activeFilters, (values) => {
			if(!values.material || !values.shape) window.location.href = '?';
			else{
				let materialURL = createFilterUrl(collection.filters['Frame Material']['parameter-name'], values.material),
					shapeURL = createFilterUrl(collection.filters['Frame Shape']['parameter-name'], values.shape);
				
				window.location.href = `?${materialURL}&${shapeURL};`
			}
		})

        return {
          collection, filterModal, activeFilters, lensInformation, selectFrame, createFilterUrl, clearFilters
        }
    }
}