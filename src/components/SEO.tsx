import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'profile' | 'article';
  noindex?: boolean;
}

export function SEO({
  title,
  description = "Nilesh Mali – Professional Graphic Designer, Creative Developer, and AI Creative Specialist based in India. Creating modern brands, high-converting social media creatives, premium custom websites, and stunning AI-powered visual designs.",
  keywords = "Nilesh Mali, Graphic Designer, Creative Developer, AI Specialist, Brand Identity, UI/UX Design, Web Developer, Portfolio, Freelance Designer, Logo Designer, Social Media Creatives, Website Designer, Abu Road Rajasthan",
  image = "https://res.cloudinary.com/dfknctbhw/image/upload/v1784198733/nm-logo_achjmg.png",
  type = "website",
  noindex = false
}: SEOProps) {
  const location = useLocation();
  
  // Safely fallback to window origin if available
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://nileshmali.com';
  const url = `${origin}${location.pathname}`;
  
  const defaultTitle = "Nilesh Mali | Graphic Designer, Creative Developer & Brand Identity Specialist";
  const finalTitle = title ? (title.includes('Nilesh Mali') ? title : `${title} | Nilesh Mali`) : defaultTitle;

  // Schema 1: Person Structured Data
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${origin}/#person`,
    "name": "Nilesh Mali",
    "url": origin,
    "image": image,
    "jobTitle": "Graphic Designer & Creative Developer",
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Abu Road",
      "addressRegion": "Rajasthan",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.linkedin.com/in/nilesh-mali-a5997b28a/",
      "https://www.behance.net/nileshmali25",
      "https://www.instagram.com/_nilesh._.mali_?",
      "https://api.whatsapp.com/send/?phone=916378954363&text=Hello+Nilesh+Mali%21"
    ],
    "knowsAbout": [
      "Graphic Design",
      "Brand Identity Design",
      "UI/UX Design",
      "Creative Web Development",
      "Front-End Engineering",
      "Social Media Marketing Graphics",
      "Video Editing & Motion Graphics",
      "AI Image & Video Generation",
      "Print Collateral & Editorial Design"
    ],
    "knowsLanguage": ["English", "Hindi"]
  };

  // Schema 2: Professional Design Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${origin}/#business`,
    "name": "Nilesh Mali - Design & Creative Studio",
    "url": origin,
    "logo": "https://res.cloudinary.com/dfknctbhw/image/upload/v1784198733/nm-logo_achjmg.png",
    "image": image,
    "description": description,
    "telephone": "+916378954363",
    "email": "work.nileshmali@gmail.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Abu Road",
      "addressRegion": "Rajasthan",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.4826",
      "longitude": "72.7836"
    },
    "areaServed": [
      { "@type": "Country", "name": "India" },
      { "@type": "AdministrativeArea", "name": "Worldwide" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Creative & Design Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Brand Identity & Logo Design",
            "description": "Custom logo design, brand books, typography systems, and visual guidelines."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "UI/UX & Web Design",
            "description": "High-fidelity interactive prototypes, landing pages, and responsive web development."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Social Media & Video Creatives",
            "description": "High-converting social media creatives, Instagram reels editing, and promotional motion graphics."
          }
        }
      ]
    }
  };

  // Schema 3: WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    "url": origin,
    "name": "Nilesh Mali Creative Portfolio",
    "description": description,
    "publisher": {
      "@id": `${origin}/#person`
    }
  };

  return (
    <Helmet>
      {/* Standard HTML Metadata */}
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Nilesh Mali" />
      <link rel="canonical" href={url} />
      
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Nilesh Mali Creative Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Google Rich Snippets Schemas JSON-LD */}
      {!noindex && (
        <>
          <script type="application/ld+json">
            {JSON.stringify(personSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(serviceSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(websiteSchema)}
          </script>
        </>
      )}
    </Helmet>
  );
}

