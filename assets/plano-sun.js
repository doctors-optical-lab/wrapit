const{reactive:reactive}=Vue,PlanoSunComponent={name:"Plano Sunglasses",setup:()=>({data:reactive({brandLibrary:sunglasses.filter((a=>a.brand.id==pageData.metafields.brand))})})};