
const { reactive } = Vue

const SunglassesCollectionComponent = {
    name: "Sunglasses Collection Component",
    delimiters: ["$%","%$"],
    setup(){
        const collection = reactive(collectionObject)

        return {
          collection
        }
    }
}