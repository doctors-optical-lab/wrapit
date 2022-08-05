const SunglassesCollectionComponent = {
    name: "Sunglasses Collection Component",
    delimiters: ["$%","%$"],
    setup(){
        const collection = reactive(collectionObject);

        function selectFrame(event){
			window.location.href += createFilter(collection.filters['Catalog Title']['parameter-name'], event)
		}
		function createFilter(parameter, value){
			return `?${parameter}=${value.replace(' ', '+')}`
		}
        return {
          collection, selectFrame, createFilter
        }
    }
}