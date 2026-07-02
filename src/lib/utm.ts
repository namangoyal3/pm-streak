import posthog from 'posthog-js'

const ACQUISITION_COOKIE = 'pmstreak_attribution'

export type CampaignSource = string
export type CampaignMedium = string
export type CampaignContent = string

interface UTMParams {
  utm_source?: CampaignSource
  utm_medium?: CampaignMedium
  utm_campaign?: string
  utm_content?: CampaignContent
  utm_term?: string
}

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90

function setAttributionCookie(data: Record<string, unknown>) {
  if (typeof document === 'undefined') return
  document.cookie = `${ACQUISITION_COOKIE}=${encodeURIComponent(JSON.stringify(data))}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`
}

function getAttributionCookie(): Record<string, unknown> | null {
  if (typeof document === 'undefined') return null
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${ACQUISITION_COOKIE}=`))
  if (!cookie) return null
  try {
    return JSON.parse(decodeURIComponent(cookie.split('=').slice(1).join('=')))
  } catch {
    return null
  }
}

export function getUTMParamsFromURL(): UTMParams | null {
  if (typeof window === 'undefined') return null
  
  const urlParams = new URLSearchParams(window.location.search)
  const utm_source = urlParams.get('utm_source')
  const utm_medium = urlParams.get('utm_medium')
  const utm_campaign = urlParams.get('utm_campaign')
  const utm_content = urlParams.get('utm_content')
  const utm_term = urlParams.get('utm_term')
  
  if (!utm_source && !utm_medium && !utm_campaign) return null
  
  return { 
    utm_source: utm_source || undefined, 
    utm_medium: utm_medium || undefined, 
    utm_campaign: utm_campaign || undefined, 
    utm_content: utm_content || undefined, 
    utm_term: utm_term || undefined 
  }
}

export function captureCampaignData() {
  const params = getUTMParamsFromURL()
  const existingAttribution = getAttributionCookie()
  const landingData = {
    landing_path: window.location.pathname,
    landing_url: window.location.href,
    referrer: document.referrer || undefined,
    captured_at: new Date().toISOString(),
  }

  if (!existingAttribution) {
    setAttributionCookie(landingData)
  }

  if (!params || !params.utm_source) return
  
  const campaignData = {
    ...landingData,
    campaign_source: params.utm_source,
    campaign_medium: params.utm_medium,
    campaign_name: params.utm_campaign,
    campaign_content: params.utm_content,
    campaign_term: params.utm_term,
    source: params.utm_source,
    medium: params.utm_medium,
    campaign: params.utm_campaign,
    content: params.utm_content,
    term: params.utm_term,
    campaign_timestamp: new Date().toISOString(),
  }
  
  posthog.capture('campaign_landed', campaignData)
  
  sessionStorage.setItem('pmstreak_campaign', JSON.stringify(campaignData))
  setAttributionCookie(campaignData)
}

export function getStoredCampaign() {
  if (typeof window === 'undefined') return null
  const stored = sessionStorage.getItem('pmstreak_campaign')
  return stored ? JSON.parse(stored) : null
}

export function addUTMParams(baseUrl: string, params: UTMParams): string {
  const url = new URL(baseUrl)
  if (params.utm_source) url.searchParams.set('utm_source', params.utm_source)
  if (params.utm_medium) url.searchParams.set('utm_medium', params.utm_medium)
  if (params.utm_campaign) url.searchParams.set('utm_campaign', params.utm_campaign)
  if (params.utm_content) url.searchParams.set('utm_content', params.utm_content)
  if (params.utm_term) url.searchParams.set('utm_term', params.utm_term)
  return url.toString()
}

export const CAMPAIGNS = {
  launch: {
    utm_source: 'listmonk',
    utm_medium: 'email',
    utm_campaign: 'pmstreak_launch_2024',
    utm_content: 'launch',
  },
  reEngagement: {
    utm_source: 'listmonk',
    utm_medium: 'email',
    utm_campaign: 'pmstreak_reengagement',
    utm_content: 're-engagement',
  },
  promo: {
    utm_source: 'listmonk',
    utm_medium: 'email',
    utm_campaign: 'pmstreak_promo',
    utm_content: 'promo',
  },
  newsletter: {
    utm_source: 'listmonk',
    utm_medium: 'newsletter',
    utm_campaign: 'pmstreak_newsletter',
    utm_content: 'newsletter',
  },
} as const
