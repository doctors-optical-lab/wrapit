
const { reactive } = Vue

const SunglassesCollectionComponent = {
    name: "Sunglasses Collection Component",
    setup(){
        const data = reactive({ 
          //filter sunglasses by brand using pageData.metafields.brand
          "collection-object": collectionObject
        })

        return {
          data
        }
    }
}