import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE } from '../config';

export default function SEO({ title, description, keywords, image, type = 'website' }) {
    const siteTitle = SITE.title; // "जागृति प्रकाशन"
    const defaultDescription = "Jagriti Prakashan - Online Bookstore for Indian Literature, Culture, and History. Discover authentic books on Hindu philosophy, history, and more.";
    const defaultKeywords = "books, jagriti prakashan, indian literature, culture, history, hinduism, philosophy, online bookstore";

    // You might want a default OG image. 
    // Assuming 'assets/mainbg.jpg' is available as a fallback if you have one, 
    // or just leave it undefined if no specific image.
    // We can't easily import assets here dynamically without getAssetPath logic if it helps,
    // but let's stick to props for now.

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || siteTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            {image && <meta name="twitter:image" content={image} />}

            {/* Language */}
            <html lang="hi" />
        </Helmet>
    );
}
