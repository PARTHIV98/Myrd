import { client, MenuLocationEnum } from "client";
import Heading from "components/Heading";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "scss/components/FlexibleComponentStyles/ContentWithSidebar.module.scss";

interface Props {
  QueryData: any;
  menuData:any;
}


function ContentWithSidebar({ QueryData,menuData }: Props): JSX.Element {
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const manageSpacing = QueryData?.manageSpacing;
  const bgColor = QueryData?.layoutColorOption;
  const blockContent = QueryData?.blockContent;

  const  {menuItems} = menuData;
  const router = useRouter();
  const os_links = menuItems({
    where: { location: MenuLocationEnum.OUR_SERVICES },
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
                  {os_links?.map((oslink) => {
                    // console.log(oslink.url.substring(oslink.url.lastIndexOf('/') + 1),oslink.url.substring(oslink.url.lastIndexOf('/') - 1),oslink.url);
                    return(
                    <li key={`${oslink.label}1`}>
                      <Link href={oslink.url ?? ""}>
                        <a
                          href={oslink.url}
                          className={
                            oslink.url.substring(oslink.url.lastIndexOf('/') + 3) === router.asPath ? "active" : ""
                          }
                        >
                          {oslink.label}
                        </a>
                      </Link>
                    </li>
                  )
                        })}
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
