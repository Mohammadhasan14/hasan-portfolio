import type { NavKey } from "./nav-items";

// Inline sizing (not Tailwind size classes) so the triangle's border-width
// trick scales correctly instead of fighting a caller-supplied w-/h- class.
export default function NavIcon({ navKey, size = 13 }: { navKey: NavKey; size?: number }) {
  const border = { borderWidth: 1.6, borderColor: "currentColor", borderStyle: "solid" } as const;

  switch (navKey) {
    case "overview":
      return <div style={{ width: size, height: size, ...border }} />;
    case "projects":
      return <div style={{ width: size, height: size, transform: "rotate(45deg)", ...border }} />;
    case "experience":
      return <div style={{ width: size, height: size, borderRadius: "50%", ...border }} />;
    case "skills":
      return (
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: `${size * 0.55}px solid transparent`,
            borderRight: `${size * 0.55}px solid transparent`,
            borderBottom: `${size}px solid currentColor`,
          }}
        />
      );
    default:
      return <div style={{ width: size, height: size, borderRadius: 2, ...border }} />;
  }
}
