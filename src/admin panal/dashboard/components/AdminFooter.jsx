import React from 'react';
import { Grid } from '@mui/material';
import { FaRegHeart } from "react-icons/fa";
import "./css/dashboard.css";

function AdminFooter() {
    return (

        <Grid className='admin-footer' item xs={12} sx={{ mb: 0, px: 1, borderTop: "1px solid #ccc" }}>
            <div className="footer-container d-md-flex d-block align-items-md-center justify-content-md-between">
                <p className='copyright-status'><span className='me-md-1 me-0 copy-symbol'>&copy;</span> <span>2024 Shopaholic Heaven</span></p>
            </div>
        </Grid>
    )
}

export default AdminFooter
