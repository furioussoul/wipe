"use client";

import React, { ReactNode } from 'react';
import { MDXProvider, Components } from '@mdx-js/react';

// 定义组件类型
const components: Components = {
    wrapper: ({ children }) => (
        <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
            {children}
        </div>
    ),
    p: (props: React.ComponentProps<'p'>) => (
        <p style={{ fontSize: '1.2em', color: 'blue' }} {...props} />
    ),
    ul: (props: React.ComponentProps<'ul'>) => (
        <ul style={{ listStyleType: 'disc', margin: '1em' }} {...props} />
    ),
};

// 定义组件属性类型
interface MDXComponentsProps {
    children: ReactNode;
}

const MDXComponents: React.FC<MDXComponentsProps> = ({ children }) => {
    return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default MDXComponents;
