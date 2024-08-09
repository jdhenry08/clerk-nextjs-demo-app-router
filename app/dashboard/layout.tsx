import { UserDetails } from "../components/user-details";
import { UserButton } from "@clerk/nextjs";
import { LearnMore } from "../components/learn-more";
import { Footer } from "../components/footer";
import { ClerkLogo } from "../components/clerk-logo";
import { NextLogo } from "../components/next-logo";

import { DASHBOARD_CARDS } from "../consts/cards";

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <main className="max-w-[75rem] w-full mx-auto">
        <div className="grid grid-cols-[1fr_20.5rem] gap-10 pb-10">
          <div>
            <header className="flex items-center justify-between w-full h-16 gap-4">
              <div className="flex gap-4">
                <ClerkLogo />
                <div aria-hidden className="w-px h-6 bg-[#C7C7C8]" />
                <NextLogo />
              </div>
              <div className="flex items-center gap-2">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "size-6",
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Link href="/" label="Label" labelIcon={<NextLogo />} />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            </header>
            <UserDetails />
          </div>

          {children}
        </div>
      </main>
      <LearnMore cards={DASHBOARD_CARDS} />
      <Footer />
    </>
  );
}
