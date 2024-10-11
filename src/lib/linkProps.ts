// src/lib/linkProps.ts

import dynamicIconImports from "lucide-react/dynamicIconImports";

// Define the type for the links
export type LinkPropType = {
  label: string;
  value: string;
  icon: keyof typeof dynamicIconImports;
};

// Define the array of navigation links
export const LinkProp: LinkPropType[] = [
  {
    label: "Profile",
    value: "profile",
    icon: "smile",
  },
  {
    label: "Customization",
    value: "customization",
    icon: "cog", // Icon name as a string
  },
  {
    label: "Notification",
    value: "notification",
    icon: "bell", // Icon name as a string
  },
  {
    label: "Account",
    value: "account",
    icon: "key-round", // Icon name as a string
  },
  {
    label: "Billing",
    value: "billing",
    icon: "credit-card", // Icon name as a string
  },
  {
    label: "Organization",
    value: "organization",
    icon: "building", // Icon name as a string
  },
  {
    label: "Extension",
    value: "extension",
    icon: "zap", // Icon name as a string
  },
];
