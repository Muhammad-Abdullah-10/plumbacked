$(document).ready(function() {

    // Not Working Section Render API
    // async function updateProducts(){
    //         try {
    //             const response = await fetch('/?sections=template--21410886778903__products_sections_WUArMg');
                 
    //             if( !response.ok){
    //                 console.log("Error Network");
    //             }
    //             // const data = await response.json();
    //             const data = await response.text(); // Agar response plain HTML hai
    //             document.querySelector('.product-update-by-collection').innerHTML = data;
    //         } catch (error) {
    //             console.log("Error" , error);
    //         }
    //     }
    // $('.filters a').on('click' , function(){
    //     var collectionHandle = $(this).data('collection-handle');
    //     var hmtlEdited = $('.product-update-by-collection');
    //     // console.log( JSON.parse(hmtlEdited) );
    //     console.log(collectionHandle);

    //     updateProducts();
        
    // })

    // Not Working Section Render API

    // Admin API AJAX ISSUE

    // $('.filters a').on('click', function() {
    //   var collectionHandle = $(this).data('collection-handle');
    //   var collectionIdGet = $(this).data('collection-id');
    //   var encodedQuery = encodeURIComponent(collectionHandle);

    //   console.log(collectionIdGet);
    //   var url = "https://taskplum.myshopify.com/admin/api/2024-07/" + collectionIdGet + "/products.json";

    //   var settings = {
    //       url: url,
    //       method: "GET",
    //       timeout: 0,
    //       headers: {
    //           "X-Shopify-Access-Token": "f3bd5a295047ba2d5ca308f7f40efffb"
    //       }
    //   };

    //   $.ajax(settings)
    //       .done(function (response) {
    //           console.log(response);
    //       })
    //       .fail(function (jqXHR, textStatus, errorThrown) {
    //           console.error("Request failed: " + textStatus + ", " + errorThrown);
    //   });

    // });

    // Admin API AJAX ISSUE
    
     $('.filters a').on('click', function() {
        var collectionHandle = $(this).data('collection-handle');
        console.log("Working");
        
        // var encodedQuery = encodeURIComponent(collectionHandle)

        // GraphQL Query
        // if()
        const query = `{
            collectionByHandle(handle: "${collectionHandle}") {
                title
                products(first: 10) {
                    edges {
                        node {
                            id
                            title
                            handle
                            featuredImage {
                                url
                            }
                            priceRange {
                                minVariantPrice {
                                    amount
                                    currencyCode
                                }
                            }
                        }
                    }
                }
            }
        }`;
        // **************
        
        // Fetch Method working

        // fetch('https://taskplum.myshopify.com/api/2024-07/graphql', {
        // method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json',
        //     'X-Shopify-Storefront-Access-Token': 'f3bd5a295047ba2d5ca308f7f40efffb',
        // },
        // body: JSON.stringify({ query }),
        // })
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => console.log('There is error in code ' , error));
        
        // Fetch Method working

        // Async Method Working Using Storefornt
        

        async function getQuery(url = 'https://taskplum.myshopify.com/api/2024-07/graphql' ) 
        {
            try {
                const response = await fetch(url , {
                method : 'POST' , 
                headers : {
                    'Content-Type' : 'application/json',
                    'X-Shopify-Storefront-Access-Token' : 'f3bd5a295047ba2d5ca308f7f40efffb', 
                },
                body : JSON.stringify({ query })
            });
            if (!response.ok) {
                throw new Error(`HTTP ERROR : ${response.statusText}`);
                
            }


            
            const results = await response.json();
            let oldhtmlProducts = $('.product-update-by-collection');
            let lengthOfProductArray= results.data.collectionByHandle.products.edges.length;
            let valueApiEdges = results.data.collectionByHandle.products;

            console.log(results); 
            
            for(let i = 0 ; i <= lengthOfProductArray ; i++){
                let product_returns = `
                <div class="product--wrapper product-update-by-collection position-relative">
                    <div class="product--wrapper-img">
                        <a href="" class="img-wrapper">
                            <img src="${valueApiEdges.edges[i].node.featuredImage.url}" alt="${valueApiEdges.edges[i].node.featuredImage.altText}" class="product-img">
                        </a>
                        <div class="shop-bar position-absolute">
                            <div class="w-50">
                                <a href="#" class="whislist-wrapper">
                                    <i class="fa fa-heart-o" aria-hidden="true"></i>
                                </a>
                                <a href="#" class="search-wrapper-p">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </a>
                            </div>
                            <div class="w-50">
                                <a href="" class="shop-now-p">
                                    <span class="wrapper-cart-p">
                                        <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                                    </span>
                                    Shop Now
                                </a>
                            </div>
                            
                        </div>
                    </div>
                    <div class="product-wrapper-data">
                            <h6 class="product-title">
                                <a href="">
                                    ${valueApiEdges.edges[i].node.handle}
                                </a>   
                            </h6>
                            <div class="pricing-wrapper">
                                <span class="category">
                                    ${results.data.collectionByHandle.title}
                                </span>
                                <span class="price">
                                    ${valueApiEdges.edges[i].node.priceRange.minVariantPrice.amount} ${valueApiEdges.edges[i].node.priceRange.minVariantPrice.currencyCode}
                                </span>
                            </div>
                        </div>
                </div>
            `;
            oldhtmlProducts.html(product_returns);
            console.log(oldhtmlProducts.html(product_returns));
            }
            
            // jQuery ka use karke HTML ko replace karein
            // oldhtmlProducts.html(product_returns);


            // console.log(results); 
            // console.log(product_returns); 
            // console.log(oldhtmlProducts);             
            return results; 

            } 
            catch (error) {
                console.log("Error " , error);
            }
            
        }
        getQuery();
        
        // Async Method Working Using Storefornt
     });
    

    });