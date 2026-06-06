export default function Footer({ name }: { name: string }) {
  return (
    <footer
      className="relative border-t"
      style={{ background: "var(--sidebar-bg)", borderColor: "var(--sidebar-border)" }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />
      <div className="section-container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: "var(--sidebar-text)" }}>
            &copy; {new Date().getFullYear()} {name}. Built with Next.js
          </p>
          <p className="text-sm" style={{ color: "var(--sidebar-text)" }}>
            Thanks for visiting ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
