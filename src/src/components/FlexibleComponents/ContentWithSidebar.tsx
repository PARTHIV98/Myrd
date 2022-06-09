import { client, MenuLocationEnum } from "client";
import Heading from "components/Heading";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "scss/components/FlexibleComponentStyles/ContentWithSidebar.module.scss";

interface Props {
  QueryData: any;
}


function ContentWithSidebar({ QueryData }: Props): JSX.Element {
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const manageSpacing = QueryData?.manageSpacing;
  const bgColor = QueryData?.layoutColorOption;
  const blockContent = QueryData?.blockContent;

  const { menuItems } = client.useQuery();
  const router = useRouter();
  const os_links = menuItems({
    where: { location: MenuLocationEnum.OUR_SERVICES },
  }).nodes;
  const footer_links = menuItems({
    where: { location: MenuLocationEnum.FOOTER },
  }).nodes;
  return (
    <>
      <section
        className={`${styles.expertisesection} expertiseSection ${
          manageSpacing != "none" ? "commonPadding" : ""
        } ${
          manageSpacing == "Remove Top"
            ? "pt-none"
            : manageSpacing == "Remove Bottom"
            ? "pb-none"
            : ""
        } ${bgColor == "Dark Color" ? "bg-dark" : ""} `}
      >
        <div className="container">
          
          <div className={`${styles.strengthBlock} pt-none`}>
            <div className="row d-flex justify-space">
              <div className={`${styles.whiteBoxMain} col`}>
                  <div className={styles.contentBoxWrap}>
                    {blockContent ? (
                      <div
                        className={styles.whiteBoxContent}
                        dangerouslySetInnerHTML={{ __html: blockContent ?? "" }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
              </div>
              <div className={`${styles.sidebarCol} col`}>
                <ul className={styles.sidebarlinks}>
                  {os_links?.map((oslink) => (
                    <li key={`${oslink.label}1`}>
                      <Link href={oslink.url ?? ""}>
                        <a
                          href={oslink.url}
                          className={
                            oslink.url === router.pathname ? "active" : ""
                          }
                        >
                          {oslink.label}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContentWithSidebar;
