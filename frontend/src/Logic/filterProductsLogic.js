export function filteredProd(products, filterProductInput){
    const filteredProducts = products.filter(item => 
        item.title.replace(/\s+/g,'').toLowerCase().includes(filterProductInput.replace(/\s+/g,'').toLowerCase())        
    );
    return filteredProducts
}
