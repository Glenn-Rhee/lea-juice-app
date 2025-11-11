import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export type Link = {
  href: string;
  text: string;
};

interface BreadcrumbShopProps {
  links: Link[];
  pageTitle: string;
}

export default function BreadcrumbShop(props: BreadcrumbShopProps) {
  const { links, pageTitle } = props;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, i) => (
          <React.Fragment key={`${link.href}-${i}`}>
            <BreadcrumbItem>
              <BreadcrumbLink href={link.href}>{link.text}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
