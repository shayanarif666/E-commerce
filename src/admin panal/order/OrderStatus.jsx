import React from 'react'

function OrderStatus({ status }) {
    const statusStyles = {
        PENDING: { color: "#5b56c8", backgroundColor: "#dde2ff" },
        CANCELLED: { color: "#f30c53", backgroundColor: "#ffd9df" },
        CONFIRMED: { color: "#349563", backgroundColor: "#ccffe5" },
        "PICKED BY COURIER": { color: "#49ab14", backgroundColor: "#ddffd5", fontSize: ".7rem" },
        "ON THE WAY": { color: "#f8a22b", backgroundColor: "#fff3bf" },
        DELIVERED: { color: "#1bcbf7", backgroundColor: "#d3f4ff" }
    };

    return (
        <span style={{ ...statusStyles[status], borderRadius: "20px", padding: "0.5rem", fontWeight: 600 }}>
            {status}
        </span>
    );
}

export default OrderStatus
