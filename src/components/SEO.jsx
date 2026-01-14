import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE } from '../config';

export default function SEO({
    title,
    description,
    keywords,
    image,
    type = 'website',
    appendSiteTitle = true,
    structuredData,
    canonical
}) {
    const siteTitle = SITE.title;
    const defaultDescription = "Jagriti Prakashan - publisher of authentic Indian literature, culture, education and history. Discover authentic books on Hindu philosophy, social studies, and more.";
    const defaultKeywords = "books, jagriti prakashan, jagriti publication, indian literature, culture, history, hinduism, philosophy, online bookstore";

    const composedTitle = title
        ? appendSiteTitle
            ? `${title} | ${siteTitle}`
            : title
        : siteTitle;

    // You might want a default OG image. 
    // Assuming 'assets/mainbg.jpg' is available as a fallback if you have one, 
    // or just leave it undefined if no specific image.
    // We can't easily import assets here dynamically without getAssetPath logic if it helps,
    // but let's stick to props for now.

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{composedTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:site_name" content={siteTitle} />
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || siteTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            {image && <meta name="twitter:image" content={image} />}

            {/* Language */}
            <html lang="hi" />

            {/* Structured Data (JSON-LD) */}
            {structuredData &&
                (Array.isArray(structuredData) ? structuredData : [structuredData]).map((schema, idx) => (
                    <script key={idx} type="application/ld+json">
                        {JSON.stringify(schema)}
                    </script>
                ))}
        </Helmet>
    );
}
