import React, { ReactNode } from 'react';
import { Loading } from '../';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
    title?: string;
    children: ReactNode;
    loading: Boolean;
}

const PageLayout = ({ title, loading, children }: PageLayoutProps) => {
    return (
        <div className={styles.layout}>
            {loading && <Loading />}
            <h1 className={styles.title}>{title}</h1>

            {children}
        </div>
    );
};

export default PageLayout;
