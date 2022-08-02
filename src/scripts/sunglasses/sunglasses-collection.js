const SunglassesCollectionComponent = {
    name: "Sunglasses Collection Component",
    delimiters: ["$%","%$"],
    setup(){
        const collection = reactive(collectionObject);

        function validateSelection(){
			console.log('validate selection')
		}
		function getDropdownValues(){
			console.log('get dropdown values')
		}

        return {
          collection, validateSelection, getDropdownValues
        }
    }
}