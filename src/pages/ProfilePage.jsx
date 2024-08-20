import React from 'react'
import { Layout, Profile } from '../features/index';
import "./css/pages.css";

function ProfilePage() {
    return (
        <section style={{ backgroundColor: "#eff0f5"}}>
            <Layout className="profile-page-padding">
                <Profile />
            </Layout>
        </section>
    )
}

export default ProfilePage
