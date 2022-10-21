import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div>
            <div className="layout">
                <Head>
                    <title>JS Mastery Store</title>
                </Head>
                <header>
                    <Navbar />
                </header>
            </div>
        </div>
    );
};

export default Layout;
