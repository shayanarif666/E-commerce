import React from 'react';
import { Account, Layout } from "../features/index";
import "./css/pages.css";

function AccountPage() {
    return (
        <section style={{ backgroundColor: "#eff0f5" }}>
            <Layout className="page-padding">
                <Account />
            </Layout>
        </section>
    )
}

export default AccountPage
