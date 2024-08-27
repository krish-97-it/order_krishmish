import React from "react";
import { Link } from "react-router-dom";


const OffersInfo = ({getHomeCuisineName}) => {
    return(
        <div className="accordion mt-3 mb-3" id="accordionFlushExample">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Upto 30% Off on Combos.
                    </button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                        <p style={{flex:3, textAlign:"start"}}>Check and Order Combos to get upto 30% Off.<code> Terms & Condition</code> aplied. Order amount must be greater than 400.</p>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                       Complementery 10% Off on all Food. 
                    </button>
                </h2>
                <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body" style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", flexWrap:"no-wrap", flexDirection:"column"}}>
                        <p style={{flex:3, textAlign:"start"}}>Order any dish and get complementry 10% Off <code></code></p>
                        <Link to="/cuisine" className="btn btn-primary" style={{}}>Order Now</Link>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        Flat 150 Off on your first Order
                    </button>
                </h2>
                <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body" style={{display:"flex", justifyContent:"space-between", alignItems:"baseline",flexWrap:"no-wrap", flexDirection:"column"}}>
                        <p style={{flex:3, textAlign:"start"}}>Avail Flat 150 discount on any item<code>. Terms & Condition</code> applied. Total Order Amount should be greater than 300</p>
                        <Link to="/cuisine" className="btn btn-primary" style={{}}>Order Now</Link>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseThree">
                        Flat 10% Off on Fish Item
                    </button>
                </h2>
                <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body" style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", flexWrap:"no-wrap", flexDirection:"column"}}>
                        <p style={{flex:3, textAlign:"start"}}>Avail Flat 10% Off discount on Fish item<code>{"(For all Cuisine)"}</code></p>
                        <Link to="/cuisine" className="btn btn-primary" style={{}} onClick={()=>getHomeCuisineName("fish")} value="fish">Order Now</Link>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseThree">
                        Buy Hunger Pass and get free delivery
                    </button>
                </h2>
                <div id="flush-collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                        <p style={{flex:3, textAlign:"start"}}>Buy Hunger Pass worth Rs. 100 and get Free Delivery on any product. <code>Terms & Condition </code> applied. Offers will be valid on max six Orders and distance should be with in 5Kms.</p>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseThree">
                        Get a Free Non Veg Starter
                    </button>
                </h2>
                <div id="flush-collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body" style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", flexWrap:"no-wrap", flexDirection:"column"}}>
                        <p style={{flex:3, textAlign:"start"}}>Get a Free Non Veg Starter on buying Food worth Rs 800 and above. <code>Terms & Condition</code> applied. Add one starter extra if your order amount is greater than 800.</p>
                        <Link to="/cuisine" className="btn btn-primary" style={{}}>Order Now</Link>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseThree">
                        Upto 20% off on snacks
                    </button>
                </h2>
                <div id="flush-collapseSeven" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body" style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", flexWrap:"no-wrap", flexDirection:"column"}}>
                        <p style={{flex:3, textAlign:"start"}}>Upto 20% Off on all items under snacks. <code>Terms & Condition</code> applied. Minimum Order Value 150</p>
                        <Link to="/cuisine" className="btn btn-primary" style={{}} onClick={()=>getHomeCuisineName("snack")} value="snack">Order Now</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OffersInfo;