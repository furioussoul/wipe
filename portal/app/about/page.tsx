'use client';
import React from 'react';
import dynamic from 'next/dynamic';

// 动态导入 MDX 文件
const AboutContent = dynamic(() => import('./about.mdx'));

const Page = () => {
    return (
        <div>
            <h1>About Us Page</h1>
            <AboutContent />
        </div>
    );
};

export default Page;
