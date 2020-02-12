import React from "react";
import Divider from '@material-ui/core/Divider';
import {MDBContainer, MDBFooter } from "mdbreact";

const FooterPagePro = () => {
    return (
        <MDBFooter color="grey" className="font-small pt-0">

            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    <Divider />
                    &copy; 2020...
                </MDBContainer>
            </div>
        </MDBFooter>
    );
}

export default FooterPagePro;