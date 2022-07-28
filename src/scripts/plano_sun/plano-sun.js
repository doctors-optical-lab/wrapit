import { reactive } from 'vue'

const PlanoSunComponent = {
    setup(){
        const state = reactive({ count: 0 })
        // expose the state to the template
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
        console.log(sunglasses, state)
    }
}