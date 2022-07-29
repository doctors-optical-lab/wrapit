
const { reactive } = Vue

const PlanoSunComponent = {
    name: "Plano Sunglasses",
    setup(){
        const state = reactive({ count: 0 })

        const library = pageData;
        console.log(library)
        return {
          state
        }
    }
}