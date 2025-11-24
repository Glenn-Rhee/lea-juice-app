import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { CATEGORY } from "../../../../generated/prisma";

export type Link = {
  href: string;
  text: string;
};

interface BreadcrumbShopProps {
  links: Link[];
  pageTitle: string;
}

type Categories = CATEGORY | "ALL";

export default function BreadcrumbShop(props: BreadcrumbShopProps) {
  const { links, pageTitle } = props;
  const CATEGORIES = ["FRUIT", "JUICE", "SALAD", "ALL"] as const;

  function isCategory(value: string): value is Categories {
    return CATEGORIES.includes(value as Categories);
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, i) => (
          <React.Fragment key={`${link.href}-${i}`}>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="hover:underline hover:text-gray-500"
                href={link.href}
              >
                {isCategory(link.text)
                  ? link.text[0].toUpperCase() +
                    link.text.slice(1).toLowerCase()
                  : link.text}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage className="text-gray-500 font-medium">
            {pageTitle}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
