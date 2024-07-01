'use client';

// import Script from 'next/script';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function ConsentBanner() {
  const [isBannerHidden, setIsBannerHidden] = useState(false);
  const [consentMode, setConsentMode] = useState(false);
  const pathname = usePathname();

  const refAnalytics = useRef<HTMLInputElement>(null);
  const refPreferences = useRef<HTMLInputElement>(null);
  const refMarketing = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const value = localStorage?.getItem('consentMode');

    setConsentMode(value === null);
  }, []);

  if (consentMode) {
    return (
      <div className="p-4 fixed left-0 right-0 bottom-0 text-sm">
        <div
          id="cookie-consent-banner"
          className={`p-4 bg-white border-solid border rounded border-border flex flex-col w-full sm:w-auto ${isBannerHidden || pathname === '/privacy-policy' ? 'hidden' : ''}`}
        >
          <div className="mb-4">
            <h3 className="font-bold mb-2">Cookie settings</h3>
            <p>We use cookies to deliver the best possible user experience.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <label className="flex gap-1 cursor-pointer items-center">
              <input
                id="consent-necessary"
                type="checkbox"
                value="Necessary"
                disabled
              />
              Necessary
            </label>
            <label className="flex gap-1 cursor-pointer items-center">
              <input
                id="consent-analytics"
                type="checkbox"
                value="Analytics"
                ref={refAnalytics}
              />
              Analytics
            </label>
            <label className="flex gap-1 cursor-pointer items-center">
              <input
                id="consent-preferences"
                type="checkbox"
                value="Preferences"
                ref={refPreferences}
              />
              Preferences
            </label>
            <label className="flex gap-1 cursor-pointer items-center">
              <input
                id="consent-marketing"
                type="checkbox"
                value="Marketing"
                ref={refMarketing}
              />
              Marketing
            </label>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <Button
              id="btn-accept-all"
              className="cookie-consent-button btn-success"
              onClick={() => {
                setConsent({
                  necessary: true,
                  analytics: true,
                  preferences: true,
                  marketing: true
                });
                setIsBannerHidden(true);
              }}
            >
              Accept All
            </Button>
            <Button
              id="btn-accept-some"
              className="cookie-consent-button btn-outline"
              onClick={() => {
                if (
                  refAnalytics.current &&
                  refPreferences.current &&
                  refMarketing.current
                ) {
                  setConsent({
                    necessary: true,
                    analytics: refAnalytics.current?.checked,
                    preferences: refPreferences.current?.checked,
                    marketing: refMarketing.current?.checked
                  });

                  setIsBannerHidden(true);
                }
              }}
            >
              Accept Selection
            </Button>
            <Button
              id="btn-reject-all"
              className="cookie-consent-button btn-grayscale"
              onClick={() => {
                setConsent({
                  necessary: false,
                  analytics: false,
                  preferences: false,
                  marketing: false
                });
                setIsBannerHidden(true);
              }}
            >
              Deny All
            </Button>
            <Link
              href="/privacy-policy"
              rel="noopener noreferrer"
              target="_blank"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function setConsent(consent: {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
}) {
  const consentMode = {
    functionality_storage: consent.necessary ? 'granted' : 'denied',
    security_storage: consent.necessary ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    personalization_storage: consent.preferences ? 'granted' : 'denied'
  };

  if (typeof window !== 'undefined') {
    window.gtag('consent', 'update', consentMode);
    localStorage.setItem('consentMode', JSON.stringify(consentMode));
  }
}
