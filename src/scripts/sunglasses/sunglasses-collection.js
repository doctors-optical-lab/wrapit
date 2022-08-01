
const { reactive, ref } = Vue

const SunglassesCollectionComponent = {
    name: "Sunglasses Collection Component",
    delimiters: ["$%","%$"],
    setup(){
        const collection = reactive(collectionObject);
        const search = ref('');
        const filters = reactive({
          frameModel = ''
        });

        return {
          collection, search, filters
        }
    }
}