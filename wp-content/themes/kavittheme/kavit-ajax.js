jQuery('.woocommerce-LoopProduct-link').on("click", function(e) {
    e.preventDefault();
    var slug = jQuery(this).attr('href');
    return callProdAjx(slug);
});

function callProdAjx(slug) {

    // return false;
    //will do later once css set.
    //
    var sw = slug.split('/');
    var last = sw[sw.length - 2];
    //console.log(slug);
    //  console.log(sw);
    //  console.log(last);
    jQuery.ajax({
        type: "post",
        dataType: "json",
        url: kavit_ajax_object.ajax_url,
        // data: {'test':'test2'},
        data: {
            action: 'kavit_ajax_call_product',
            product_slug: last
        },
        success: function(response) { //not working...
            // console.log(msg);

            //var result_html = msg;//get from ajax response


            // // var result_json = json_decode(msg);
            // var myJSON = JSON.stringify(msg);
            // var result_json = JSON.stringify(msg.p_name);
            // Grab username from the object
            console.log(response);
            // console.log(myJSON);
            $(".product_name").text(response.product_name);
            $(".detail").html(response.html);
            $('#listingDetailsSlider').carousel();
            ///////////////
            //model;html //
            ///////////////
            $('#myModal1').modal('show');
        }
    });
}