const SunglassesCollectionComponent = {
    name: "Sunglasses Collection Component",
    delimiters: ["$%","%$"],
    setup(){
        const collection = reactive(collectionObject);
		const filterModal = ref(false);

        function selectFrame(event){
			window.location.href = createFilterUrl(collection.filters['Catalog Title']['parameter-name'], event)
		}

		function createFilterUrl(parameter, value){
			return `?${parameter}=${value.replace(' ', '+')}`
		}

		function filterFrames(event){
			console.log(event);
		}

        return {
          collection, selectFrame, createFilterUrl, filterFrames
        }
    }
}