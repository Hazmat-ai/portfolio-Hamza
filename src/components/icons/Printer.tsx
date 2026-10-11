import { Icon, type IconProps } from "./Icon";
export function Printer(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 8V3h10v5M7 17H4V9h16v8h-3" />
      <rect x="7" y="14" width="10" height="7" rx="1" />
      <path d="M16 11h1" />
    </Icon>
  );
}
