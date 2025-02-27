export function filteredProd(products, filterProductInput){
    products?.filter(item => 
        item.title.replace(/\s+/g,'').toLowerCase().includes(filterProductInput.replace(/\s+/g,'').toLowerCase())        
    );
    return products
}