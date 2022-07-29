
const { reactive } = Vue

const library = sunglasses;
const page = pageData;


const PlanoSunComponent = {
    name: "Plano Sunglasses",
    setup(){
        const state = reactive({ count: 0 })

        console.log(library, page);
        return {
          state
        }
    }
}