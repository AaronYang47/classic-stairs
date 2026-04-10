import type { ReactNode } from 'react';

interface AnimatedBackgroundProps {
  children: ReactNode;
}

export function AnimatedBackground({ children }: AnimatedBackgroundProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 bg-[#09090b]" aria-hidden />

      {/* Subtle warm highlights on black — same mood as Hero */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute -top-[20%] -left-[15%] w-[min(520px,85vw)] h-[min(520px,85vw)] rounded-full blur-[72px] opacity-50 bg-orb-a"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(196, 165, 116, 0.18) 0%, rgba(9, 9, 11, 0) 65%)',
          }}
        />
        <div
          className="absolute bottom-[5%] right-[-10%] w-[min(600px,95vw)] h-[min(600px,95vw)] rounded-full blur-[80px] opacity-40 bg-orb-b"
          style={{
            background: 'radial-gradient(circle at 60% 50%, rgba(63, 63, 70, 0.45) 0%, rgba(9, 9, 11, 0) 68%)',
          }}
        />
        <div
          className="absolute top-[35%] right-[15%] w-[min(380px,55vw)] h-[min(380px,55vw)] rounded-full blur-[56px] opacity-35 bg-mesh-animated"
          style={{
            background: 'radial-gradient(circle, rgba(139, 105, 20, 0.12) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0 bg-mesh-animated opacity-25"
          style={{
            background:
              'radial-gradient(ellipse 100% 80% at 50% -20%, rgba(39, 39, 42, 0.5) 0%, transparent 55%), radial-gradient(ellipse 80% 60% at 100% 100%, rgba(24, 24, 27, 0.6) 0%, transparent 50%)',
          }}
        />
        <div className="absolute inset-0 opacity-[0.12] mix-blend-soft-light bg-shimmer-line" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
