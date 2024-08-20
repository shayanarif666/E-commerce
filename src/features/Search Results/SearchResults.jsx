import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

function SearchResults({
    products,
    searchValue,
    updateSearch
}) {

    const navigate = useNavigate();

    // Navigate
    const handleSearchNavigate = (search) => {
        navigate(`/products/${search}`);
        updateSearch("");
    }

    return (
        <>
            {
                searchValue && <List
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 600,
                        '& ul': { padding: 0 },
                    }}
                    subheader={<li />}
                >
                    {products?.map((product) => (
                        <ListItem key={`item-${product.id}-${product.id}`} onClick={() => handleSearchNavigate(product.category)}>
                            <ListItemText primary={product.title} />
                        </ListItem>
                    ))}
                </List>
            }
        </>
    )
}

export default SearchResults
