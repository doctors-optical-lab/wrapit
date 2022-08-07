const SunglassesCollectionComponent = {
    name: "Sunglasses Collection Component",
    delimiters: ["$%","%$"],
    setup(){
        const collection = reactive(collectionObject);
		const filterModal = ref(false);

        function selectFrame(event){
			window.location.href = `?${createFilterUrl(collection.filters['Catalog Title']['parameter-name'], event)}`
		}

		function createFilterUrl(parameter, value){
			return `${parameter}=${value.replace(' ', '+')}`
		}

		function filterFrames(activeFilters){
			let materialURL = createFilterUrl(collection.filters['Frame Material']['parameter-name'], activeFilters.material),
				shapeURL = createFilterUrl(collection.filters['Frame Shape']['parameter-name'], activeFilters.shape);
			
			window.location.href = `?${materialURL}&${shapeURL};`
		}
        return {
          collection, filterModal, selectFrame, createFilterUrl, filterFrames
        }
    }
}