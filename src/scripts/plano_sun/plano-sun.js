
const PlanoSunComponent = {
    name: "Plano Sunglasses",
    setup(){
        const state = reactive({ count: 0 })
        return {
          state
        }
    },
    data() {
        return {
            message: 'Hello Vue!',
            message2: 'hello hello hellos'
        }
    },
    mounted(){
        console.log(sunglasses, state.count)
    }
}