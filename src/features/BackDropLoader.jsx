import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

function BackDropLoader() {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        handleOpen()
    }, [open])

    return (
        <>
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </>
    )
}

export default BackDropLoader
