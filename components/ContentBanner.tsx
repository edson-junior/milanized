'use client';

// import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function ContentBanner() {
  const [isBannerHidden, setIsBannerHidden] = useState(false);
  const [consentMode, setConsentMode] = useState(false);

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
        <div
          id="cookie-consent-banner"
          className={`cookie-consent-banner bg-white p-4 border-solid border rounded ml-2 mb-2 border-black absolute bottom-0 top-auto max-w-[800px] flex flex-col shadow-lg ${isBannerHidden ? 'hidden' : ''}`}
        >
          <div className="mb-2">
            <h3 className="font-bold">Cookie settings</h3>
            <p>
              We use cookies to provide you with the best possible experience.
              They also allow us to analyze user behavior in order to constantly
              improve the website for you.
            </p>
          </div>
          <div className="flex gap-2">
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
              Reject All
            </Button>
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

  window.gtag('consent', 'update', consentMode);
  localStorage.setItem('consentMode', JSON.stringify(consentMode));
}
