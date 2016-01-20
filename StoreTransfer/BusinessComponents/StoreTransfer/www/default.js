define( [
    "require",
    "apparch",
    "./pages/enterASN/enterASN.view",
    "./pages/orderDetails/orderDetails.view",
    "./pages/viewEANs/viewEANs.view",
    "./pages/complete/complete.view",  
    "./pages/common/iscroll",
    
],
function ( require, AppArch, EnterASN, OrderDetails, ViewEANs, Complete,IScroll) {
    return AppArch.BusinessComponent.extend( {
        layoutCss: [
            require.toUrl( "./css/layout.css" ), 
            require.toUrl( "./css/layout.media.css" )
            
        ],
        pages: {
        "EnterASN_View": new EnterASN(),           
           "Order_Details": new OrderDetails(),            
           "ViewEANs_View": new ViewEANs(),
           "Complete_View": new Complete()   
        },
        initialize: function () {
        	 
        }
    });
});
