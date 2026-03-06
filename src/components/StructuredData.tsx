import React from 'react';
import { Article, WithContext } from 'schema-dts';

type StructuredDataProps = {
    data: WithContext<Article> | any;
};

export function StructuredData({ data }: StructuredDataProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
