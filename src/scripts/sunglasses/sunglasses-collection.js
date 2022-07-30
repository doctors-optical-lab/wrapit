
const { reactive } = Vue

const SunglassesCollectionComponent = {
    name: "Sunglasses Collection Component",
    setup(){
        const data = reactive({ 
          //filter sunglasses by brand using pageData.metafields.brand
          brandLibrary: sunglasses.filter(frame => frame.brand.id == pageData.metafields.brand)
        })

        return {
          data
        }
    }
}