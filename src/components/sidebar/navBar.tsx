// NOTE: If interactivity (dropdowns, mobile menu) does not work,
// you will likely need to add "use client"; as the VERY FIRST line of this file.

"use client"; 
import Link from "next/link";
import{Disclosure,DisclosureButton,DisclosurePanel,Menu,MenuButton,MenuItem,MenuItems,} from "@headlessui/react";
import { Bars3Icon,XMarkIcon, MagnifyingGlassIcon, } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { LogIn, UserPlus} from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0";


const navigation = [
  { name: "Dashboard", link: "/", current: true },
  { name: "Marketplace", link: "/marketPlace", current: false },
  { name: "Trading", link: "/trade", current: false },
  { name: "Gaming", link: "/game", current: false },
  { name: "About", link: "/about", current: false },
  { name: "Contact", link: "/contact", current: false },
  { name: "Profile", link: "/userProfile", current: false },
  { name: "Settings", link: "/setting", current: false },
  { name: "Sign out", link: "/auth/logout", current: false },
];

// Slicing for main navigation links shown on desktop
const newNavigation = navigation.slice(0, 6);

// Slicing for navigation items in the settings/profile dropdown
const settingsNavigation = navigation.slice(6, 9);


function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  
  const pathname = usePathname();
  const { user, error, isLoading } = useUser();
  

  return (
    <Disclosure
      as="nav"
      className="bg-gray-800  border-b border-gray-700 shadow-sm"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              {/* Using standard img tag for now as per current code. Consider next/image for optimization. */}
              <img
                alt="Your Company"
                src={"/images/Pokemon.png"}
                className="h-8 w-auto rounded-full"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {newNavigation.map((item, index: number) => (
                  <Link
                    key={index}
                    href={item.link}
                    className={classNames(
                      item.link === pathname
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={item.link ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-4 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Search box */}
            <div className="hidden sm:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="block w-[200px] bg-gray-700 text-gray-200 placeholder-gray-400 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md pl-10 pr-3 py-2 text-sm"
                  placeholder="Search"
                />
              </div>
            </div>
           
         
            {isLoading ? (
              <div>Loading...</div>
            ) : !user ? (
              <>
                <div className="items-center gap-4">
                  <Link
                    href="/auth/login"
                    className="flex items-center font-bold rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white px-6 py-2 "
                  >
                    <LogIn size={20} />
                    Login
                  </Link>
                </div>
                <div className="items-center gap-4">
                  <Link
                    href="/userProfile"
                    className="flex items-center font-bold rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white px-6 py-2 "
                  >
                    <UserPlus size={20} />
                    Register
                  </Link>
                </div>
              </>
            ) : (
              // Profile dropdown
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt={user?.name}
                      src={user?.picture}
                      className="size-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  {settingsNavigation.map((item, index: number) => (
                    <MenuItem key={index}>
                      <Link
                        href={item.link}
                        className={classNames(
                          item.link === pathname
                            ? "bg-gray-300 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        {item.name}
                      </Link>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {/* Using the full navigation array for mobile, as per original code */}
          {navigation.map((item, index: number) => (
            <Link key={index} href={item.link}>
              <DisclosureButton
                as="a"
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.link === pathname
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            </Link>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
