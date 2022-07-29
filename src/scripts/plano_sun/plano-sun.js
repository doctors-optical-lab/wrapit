
const { reactive } = Vue

const PlanoSunComponent = {
    name: "Plano Sunglasses",
    setup(){
        const state = reactive({ count: 0 })

        const library = sunglasses;
        console.log(library)
        return {
          state
        }
    }
}