'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DENIED_KEY = 'pwa-deny';
const DISMISSED_KEY = 'pwa-dismissed';
const CACHE_CLEAR_KEY = 'pwa-last-cache-clear';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Register the service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch((err) => console.error('SW registration failed:', err));
    }

    // Clear old caches daily
    const today = new Date().toDateString();
    if (localStorage.getItem(CACHE_CLEAR_KEY) !== today) {
      if ('caches' in window) {
        caches.keys().then((names) => {
          for (const name of names) {
            caches.delete(name);
          }
        });
      }
      localStorage.setItem(CACHE_CLEAR_KEY, today);
    }

    // Do not show if already in standalone (installed) mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in window.navigator &&
        (window.navigator as { standalone?: boolean }).standalone === true);

    if (isStandalone) return;

    // Do not show if user previously denied permanently or dismissed today
    if (localStorage.getItem(DENIED_KEY) === 'true') return;
    if (localStorage.getItem(DISMISSED_KEY) === today) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      localStorage.setItem(DENIED_KEY, 'true');
    }
    setDeferredPrompt(null);
    setVisible(false);
  };

  const handleDismiss = () => {
    const today = new Date().toDateString();
    localStorage.setItem(DISMISSED_KEY, today);
    setVisible(false);
  };

  const handleDeny = () => {
    localStorage.setItem(DENIED_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Install Spice Garden"
      className="pwa-prompt-container"
    >
      <style>{`
        @keyframes pwaSlideUp {
          from { opacity: 0; transform: translateY(100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        
        .pwa-prompt-container {
          position: fixed;
          z-index: 9999;
          background: linear-gradient(135deg, #1a1a1a 0%, #111 100%);
          color: #fff;
          font-family: var(--font-geist-sans, system-ui, sans-serif);
          padding: 20px;
          box-shadow: 0 -4px 24px rgba(0,0,0,0.5);
          animation: pwaSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          
          /* Mobile styles: Full width bottom sheet */
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          border-radius: 20px 20px 0 0;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        
        @media (min-width: 768px) {
          .pwa-prompt-container {
            /* Desktop styles: Fixed card at bottom right */
            bottom: 24px;
            right: 24px;
            left: auto;
            width: 320px;
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 24px 48px rgba(0,0,0,0.5);
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <Image
          src="/logo/apple-icon-180x180.png"
          alt="Spice Garden logo"
          width={44}
          height={44}
          style={{ borderRadius: '10px', flexShrink: 0, objectFit: 'cover' }}
        />
        <div>
          <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, lineHeight: 1.2 }}>
            Install Spice Garden
          </p>
          <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
            spicegarden.in
          </p>
        </div>
      </div>

      {/* Message */}
      <p style={{
        margin: '0 0 18px',
        fontSize: '13px',
        lineHeight: 1.5,
        color: 'rgba(255,255,255,0.7)',
      }}>
        Add Spice Garden to your home screen for a faster, offline-ready experience.
      </p>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleInstall}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #e8721c 0%, #c9540e 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'transparent',
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
            }}
          >
            Maybe Later
          </button>
        </div>
        <button
          onClick={handleDeny}
          style={{
            padding: '8px 0',
            borderRadius: '10px',
            border: 'none',
            background: 'transparent',
            color: 'rgba(255,255,255,0.5)',
            fontWeight: 500,
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'color 0.15s',
            textDecoration: 'underline',
            textDecorationColor: 'rgba(255,255,255,0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
            e.currentTarget.style.textDecorationColor = 'rgba(255,255,255,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
            e.currentTarget.style.textDecorationColor = 'rgba(255,255,255,0.2)';
          }}
        >
          Don't show again
        </button>
      </div>
    </div>
  );
}
