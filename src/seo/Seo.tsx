import { Helmet } from 'react-helmet-async'

type SEOProps = {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://jaydedaf.com'
const SITE_NAME = import.meta.env.VITE_SITE_NAME ?? 'Jayded AF'
const DEFAULT_IMAGE = '/og-default.jpg'

export function Seo({
  title,
  description,
  path = '',
  image,
  type = 'website',
  noindex = false,
}: SEOProps) {
  const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
  const ogImage = image?.startsWith('http') ? image : `${SITE_URL}${image || DEFAULT_IMAGE}`
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
