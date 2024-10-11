// src/components/Icon.tsx

import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

// Define the type for the icon name
interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

// Dynamic Icon component
const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);
  return <LucideIcon {...props} />;
};

export default Icon;
