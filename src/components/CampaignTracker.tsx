'use client'

import { useEffect } from 'react'
import { captureCampaignData, getStoredCampaign } from '@/lib/utm'
import posthog from 'posthog-js'

const CTA_COOKIE = 'pmstreak_last_cta'

function setCtaCookie(data: Record<string, unknown>) {
  document.cookie = `${CTA_COOKIE}=${encodeURIComponent(JSON.stringify(data))}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`
}

export default function CampaignTracker() {
  useEffect(() => {
    captureCampaignData()
    
    const stored = getStoredCampaign()
    if (stored) {
      posthog.register(stored)
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href') ?? ''
      const isFunnelLink =
        href.startsWith('/signup') ||
        href.startsWith('/login') ||
        href.startsWith('/pricing') ||
        href.startsWith('/api/auth/google') ||
        href.startsWith('/api/checkout')

      if (!isFunnelLink) return

      const ctaData = {
        href,
        text: anchor.textContent?.trim().slice(0, 120),
        source_path: window.location.pathname,
        source_url: window.location.href,
        clicked_at: new Date().toISOString(),
      }

      setCtaCookie(ctaData)
      posthog.capture('funnel_cta_clicked', ctaData)
      window.gtag?.('event', 'funnel_cta_clicked', ctaData)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
