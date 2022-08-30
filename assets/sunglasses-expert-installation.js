async function initialize(){
    let dataCollection = {};

    await fetch('https://wrapit-inc.myshopify.com/collections/expert-lens-replacement')
    .then(response => response.json())
    .then(data => dataCollection = data)
    
    const ExpertInstallationComponent = {
        name: 'Expert Installation Component',
        delimiters: ["$%","%$"],
        setup(){
            const collection = dataCollection
            return {
                collection
            }
        }
    }

    const ExpertInstallationApp = createApp(ExpertInstallationComponent);
    ExpertInstallationApp.mount('#expert-installation')
}