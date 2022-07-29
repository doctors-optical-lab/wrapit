
const { reactive } = Vue

const sunglasses
const pageData


const PlanoSunComponent = {
    name: "Plano Sunglasses",
    setup(){
        const state = reactive({ count: 0 })

        const library = sunglasses;
        console.log(library, pageData);
        return {
          state
        }
    }
}