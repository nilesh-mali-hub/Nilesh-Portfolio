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
  keywords = "Nilesh Mali, Graphic Designer, Creative Developer, AI Specialist, Brand Identity, UI/UX Design, Web Developer, Portfolio, Freelance Designer, Logo Designer, Social Media Creatives, Website Designer",
  image = "https://res.cloudinary.com/dfknctbhw/image/upload/v1784198733/nm-logo_achjmg.png",
  type = "website",
  noindex = false
}: SEOProps) {
  const location = useLocation();
  
  // Safely fallback to window origin if available
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://nileshmali.com';
  const url = `${origin}${location.pathname}`;
  
  const defaultTitle = "Creative Portfolio | Nilesh Mali";
  const finalTitle = title ? `${title} | Nilesh Mali` : defaultTitle;

  // Schema.org structured data for SEO Google keyword matching
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nilesh Mali",
    "url": origin,
    "image": "https://res.cloudinary.com/dfknctbhw/image/upload/v1784198733/nm-logo_achjmg.png",
    "jobTitle": "Graphic Designer & Creative Developer",
    "description": description,
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
      "AI Image Editing and Creation",
      "Typography and Layout"
    ],
    "knowsLanguage": ["English", "Hindi"],
    "nationality": {
      "@type": "Country",
      "name": "India"
    }
  };

  return (
    <Helmet>
      {/* General Standard Metadata */}
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Nilesh Mali Portfolio" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Google Rich Snippets Schema JSON-LD */}
      {!noindex && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
}

