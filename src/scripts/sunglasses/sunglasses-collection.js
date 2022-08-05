const SunglassesCollectionComponent = {
    name: "Sunglasses Collection Component",
    delimiters: ["$%","%$"],
    setup(){
        const collection = reactive(collectionObject);

        function validateSelection(event){
			console.log(event)
		}
		function createFilter(property, value){
			return `?filter.p.m.custom.catalog_title=Erika+RB4171`
		}
        return {
          collection, validateSelection
        }
    }
}