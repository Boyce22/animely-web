export function getSidebarActiveRoot(pathname: string) {
  return pathname === "/catalog" ? "explore" :
    pathname === "/profile" ? "my_lists" :
    pathname === "/explore" ? "discussions" :
    pathname.startsWith("/posts") ? "posts" :
    (pathname === "/feed" || pathname === "/") ? "feed" :
    ""
}

export function isSidebarItemActive(key: string, href: string, pathname: string, section: string) {
  if (key === "feed") return pathname === "/" || pathname === "/feed"
  if (key === "posts") return pathname === "/posts" || pathname.startsWith("/posts/")
  if (key === "explore") return pathname === "/catalog"
  if (key === "my_lists") return pathname === "/profile"
  if (key === "discussions") return pathname === "/explore"
  if (key === "discussions_feed") return pathname === "/explore" && section === "discussions"
  if (key === "community") return pathname === "/explore" && section === "community"
  if (key === "rankings") return pathname === "/explore" && section === "ranking"
  if (key === "changelog") return pathname === "/changelog"
  const [path] = href.split("?")
  return pathname === path
}
