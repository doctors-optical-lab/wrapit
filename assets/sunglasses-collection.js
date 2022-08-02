const SunglassesCollectionComponent = {
    name: "Sunglasses Collection Component",
    delimiters: ["$%","%$"],
    setup(){
        const collection = reactive(collectionObject);

        function validateSelection(){
			console.log('validate selection')
		}

        return {
          collection, validateSelection
        }
    }
}