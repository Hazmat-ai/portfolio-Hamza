import { Icon, type IconProps } from "./Icon";
export function ArrowLeft(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 12H4m6-6-6 6 6 6" />
    </Icon>
  );
}
