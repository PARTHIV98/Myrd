import Heading from "components/Heading";
import React from "react";
import styles from "scss/components/FlexibleComponentStyles/AboutInfo.module.scss";
import Image from "next/image";

interface Props {
  QueryData: any;
}

import Link from "next/link";
import { client, MenuLocationEnum } from "client";
import { useRouter } from "next/router";

function AboutInfo({ QueryData }: Props): JSX.Element {
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const manageSpacing = QueryData?.manageSpacing;
  const bgColor = QueryData?.layoutColorOption;
  const description = QueryData?.description;
  const blockContent = QueryData?.blockContent;
  const blockTitle = QueryData?.blockTitle;
  const blockTitleTag = QueryData?.blockTitleTag;
  const blockBackgroundImage = QueryData?.blockBackgroundImage?.sourceUrl();

  const bgImage = ({ src, width, quality }) => {
    return `${String(blockBackgroundImage)}?q=${quality || 100}`;
  };

  const Width = QueryData?.ctaIcon?.mediaDetails?.width;
  const height = QueryData?.ctaIcon?.mediaDetails?.height;
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
          <div className="about-content commonPadding pt-none">
            {description ? (
              <div dangerouslySetInnerHTML={{ __html: description ?? "" }} />
            ) : (
              ""
            )}
          </div>
          <div className={`${styles.strengthBlock} pt-none`}>
            <div className="row d-flex justify-space">
              <div className={`${styles.whiteBoxMain} col`}>
                <div
                  className={`${styles.whiteBox} white-box`}
                  style={{
                    backgroundImage: `url(${blockBackgroundImage})`,
                  }}
                >
                  <div className={styles.whiteBoxWrap}>
                    {blockTitle ? (
                      <Heading
                        level={blockTitleTag}
                        className={`${styles.blocktitle} secondary-title`}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: blockTitle ?? "" }}
                        />
                      </Heading>
                    ) : (
                      ""
                    )}

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

export default AboutInfo;
