
const { reactive } = Vue

const PlanoSunComponent = {
    name: "Plano Sunglasses",
    setup(){
        const data = reactive({ 
          //filter sunglasses by brand using pageData.metafields.brand
          brandLibrary: sunglasses.filter(frame => frame.brand.id == pageData.metafields.brand)
        })

        //populate brandLibrary


        return {
          data
        }
    }
}