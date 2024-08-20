import React from 'react'
import { Flex, Spin } from 'antd';

function Loader() {
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <Flex align="center" gap="middle">
                <Spin size="large" />
            </Flex>
        </div>
    )
}

export default Loader
