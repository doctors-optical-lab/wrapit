const SunglassesCollectionComponent = {
    name: "Sunglasses Collection Component",
    delimiters: ["$%","%$"],
    setup(){
        const collection = reactive(collectionObject);

        function validateSelection(event){
			console.log(event)
		}

        return {
          collection, validateSelection
        }
    }
}