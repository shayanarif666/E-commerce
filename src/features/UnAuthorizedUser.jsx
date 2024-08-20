import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function UnAuthorizedUser() {
    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    textAlign: 'center'
                }}
            >
                <Typography variant="h1" sx={{ fontSize: 64, color: 'orangered', mb: 2 }}>
                    401
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Un Authorized User
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    Sorry, we couldn’t find the page you’re looking for.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Link to={`/`}>
                        <button className='btn btn-main shadow'>
                            Go back home
                        </button>
                    </Link>
                    <Link to={``}>
                        <button
                            className='btn btn-secondary shadow'
                        >
                            Contact support →
                        </button>
                    </Link>
                </Box>
            </Container>
        </>
    )
}

export default UnAuthorizedUser
