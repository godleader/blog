// src/app/(pages)/setting/layout.tsx

"use client";

import React, { Suspense } from "react";
import { Button, Select, Selection, SelectItem } from "@nextui-org/react";
import Icon from "@/components/Icon";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { LinkProp, LinkPropType } from "@/lib/linkProps"; // LinkProp from your linkProps.ts file
import Loading from "@/components/Loading"; // Replace this with your actual Loading component

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams<{ settingParams?: string }>(); // Extract the setting parameters from the URL
  const router = useRouter(); // Use Next.js router

  const settingParams = params?.settingParams || "profile"; // Get current setting param or default to 'profile'

  // Handle changing the setting via dropdown
  const handleSettingParams = (keys: Selection) => {
    const selectedKey = Array.from(keys).shift(); // Get the first selected key

    if (typeof selectedKey === "string") {
      const path = selectedKey === "profile" ? "/setting" : `/setting/${selectedKey}`;
      router.push(path); // Navigate to the selected path
    }
  };

  return (
    <main className="grid md:grid-cols-[25%_1fr] gap-4 p-6">
      {/* Sidebar for Desktop */}
      <aside>
        <div className="flex flex-col gap-3 max-md:hidden">
          {LinkProp.map((link: LinkPropType) => (
            <Button
              key={link.value}
              as={Link}
              href={link.value === "profile" ? "/setting" : `/setting/${link.value}`}
              radius="sm"
              fullWidth
              variant={settingParams === link.value ? "flat" : "light"}
              className="justify-start"
            >
              <Icon name={link.icon} /> {link.label} {/* Render Icon Dynamically */}
            </Button>
          ))}
        </div>

        {/* Dropdown for Mobile */}
        <div className="md:hidden">
          <Select
            selectedKeys={[settingParams]} // Bind the selected key
            fullWidth
            placeholder="Setting Navigation"
            aria-label="Navigation inside setting"
            selectorIcon={<Icon name="chevrons-up-down" />}
            radius="sm"
            onSelectionChange={handleSettingParams} // Updated the handler to handle Selection
          >
            {LinkProp.map((link: LinkPropType) => (
              <SelectItem key={link.value} aria-label={link.label}>
                {link.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </aside>

      {/* Main content */}
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </main>
  );
};

export default SettingLayout;
