'use client';

// import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function ConsentBanner() {
  const [isBannerHidden, setIsBannerHidden] = useState(false);
  const [consentMode, setConsentMode] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const value = localStorage?.getItem('consentMode');

    setConsentMode(value === null);
  }, []);

  if (consentMode) {
    return (
      <>
        {/* <Script id="manage-consent-cookie">
          {`
            <script>
              function hideBanner() {
                  document.getElementById('cookie-consent-banner').style.display = 'none';
              }


                  document.getElementById('btn-accept-all').addEventListener('click', function() {

                      hideBanner();
                  });
                  document.getElementById('btn-accept-some').addEventListener('click', function() {
                      setConsent({
                          necessary: true,
                          analytics: document.getElementById('consent-analytics').checked,
                          preferences: document.getElementById('consent-preferences').checked,
                          marketing: document.getElementById('consent-marketing').checked
                      });
                      hideBanner();
                  });
                  document.getElementById('btn-reject-all').addEventListener('click', function() {
                      setConsent({
                          necessary: false,
                          analytics: false,
                          preferences: false,
                          marketing: false
                      });
                      hideBanner();
                  });


          </script>

          `}
        </Script> */}
        <div className="p-4 fixed left-0 right-0 bottom-0 text-sm">
          <div
            id="cookie-consent-banner"
            className={`p-4 bg-white border-solid border rounded border-border flex flex-col w-full ${isBannerHidden || pathname === '/privacy-policy' ? 'hidden' : ''}`}
          >
            <div className="mb-4">
              <h3 className="font-bold mb-2">Cookie settings</h3>
              <p>
                We use cookies to deliver the best possible user experience.
              </p>
            </div>
            <div className="flex gap-2 items-center">
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
              {/* <Button
            id="btn-accept-some"
            className="cookie-consent-button btn-outline"
          >
            Accept Selection
          </Button> */}
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
                Deny
              </Button>
              <Link
                href="/privacy-policy"
                rel="noopener noreferrer"
                target="_blank"
              >
                Privacy Policy
              </Link>
              <div className="cookie-consent-options hidden">
                <label>
                  <input
                    id="consent-necessary"
                    type="checkbox"
                    value="Necessary"
                    disabled
                  />
                  Necessary
                </label>
                <label>
                  <input
                    id="consent-analytics"
                    type="checkbox"
                    value="Analytics"
                  />
                  Analytics
                </label>
                <label>
                  <input
                    id="consent-preferences"
                    type="checkbox"
                    value="Preferences"
                  />
                  Preferences
                </label>
                <label>
                  <input
                    id="consent-marketing"
                    type="checkbox"
                    value="Marketing"
                  />
                  Marketing
                </label>
              </div>
            </div>
          </div>
        </div>
      </>
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
