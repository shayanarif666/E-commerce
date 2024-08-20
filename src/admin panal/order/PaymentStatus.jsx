import React from 'react'

function PaymentStatus({ status }) {
    const statusStyles = {
        PENDING: { color: "#fead26", backgroundColor: "#fff3bf" },
        RECIEVED: { color: "#26b34b", backgroundColor: "#ccffe5" }
    };

    return (
        <span style={{ ...statusStyles[status], padding: ".4rem", borderRadius: "20px", fontSize: ".8rem", fontWeight: 600 }}>
            {status}
        </span>
    );
}

export default PaymentStatus
