import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'linear-gradient(135deg, #312e81 0%, #4f46e5 35%, #7c3aed 65%, #0f172a 100%)',
          color: 'white',
          padding: '56px 64px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: 'rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            E
          </div>
          EvenX
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 800,
              maxWidth: 860,
            }}
          >
            Split bills and shared expenses without the spreadsheet.
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              maxWidth: 820,
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            Built for roommates, trips, couples, and group expenses on iPhone and
            Android.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 16,
            fontSize: 24,
            color: '#e2e8f0',
          }}
        >
          <div>Split bills app</div>
          <div>Shared expense tracker</div>
          <div>Roommates and trips</div>
        </div>
      </div>
    ),
    size,
  );
}
