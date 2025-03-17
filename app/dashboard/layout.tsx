"use client";

import Image from "next/image";
import * as Popover from "@radix-ui/react-popover";

import { UserDetails } from "../components/user-details";
import { useUser, UserButton } from "@clerk/nextjs";
import { LearnMore } from "../components/learn-more";
import { Footer } from "../components/footer";
import { ClerkLogo } from "../components/clerk-logo";
import { NextLogo } from "../components/next-logo";

import { DASHBOARD_CARDS } from "../consts/cards";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, user } = useUser();

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
                <span className="text-emerald-700 bg-emerald-100 p-1 rounded-md text-sm/none">
                  {"This one works ->"}
                </span>
                <UserButton showName>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="Help"
                      labelIcon={<DotIcon />}
                      open="help"
                    />
                  </UserButton.MenuItems>

                  <UserButton.UserProfilePage
                    label="Help"
                    labelIcon={<DotIcon />}
                    url="help"
                  >
                    <div>
                      <h1>Help Page</h1>
                      <p>This is the custom help page</p>
                    </div>
                  </UserButton.UserProfilePage>
                </UserButton>
                <Popover.Root>
                  <Popover.Trigger className="flex items-center gap-2">
                    <span className="text-sm/none font-medium">
                      {user?.fullName ?? "Loading..."}
                    </span>
                    {isSignedIn ? (
                      <Image
                        src={user.imageUrl}
                        alt={user.fullName ?? ""}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="rounded-full size-8 bg-slate-700 animate-pulse" />
                    )}
                  </Popover.Trigger>

                  <Popover.Portal>
                    <Popover.Content className="z-50 mx-6 my-2">
                      <UserButton __experimental_asProvider>
                        <UserButton.__experimental_Outlet
                          __experimental_asStandalone
                        />
                        <UserButton.MenuItems>
                          <UserButton.Action
                            label="Help"
                            labelIcon={<DotIcon />}
                            open="help"
                          />
                        </UserButton.MenuItems>

                        <UserButton.UserProfilePage
                          label="Help"
                          labelIcon={<DotIcon />}
                          url="help"
                        >
                          <div>
                            <h1>Help Page</h1>
                            <p>This is the custom help page</p>
                          </div>
                        </UserButton.UserProfilePage>
                      </UserButton>
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
                <span className="text-rose-700 bg-rose-100 p-1 text-sm/none rounded-md">
                  {"<- This one doesn't"}
                </span>
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

function DotIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
}
