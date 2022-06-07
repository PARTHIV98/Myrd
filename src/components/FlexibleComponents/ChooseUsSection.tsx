import Heading from "components/Heading";
import React from "react";
import styles from "scss/components/FlexibleComponentStyles/ChooseUs.module.scss";
import Image from "next/image";

interface Props {
  QueryData: any;
}

import Link from "next/link";
import { client, MediaItemSizeEnum, MenuLocationEnum } from "client";
import { useRouter } from "next/router";

function ChooseUs({ QueryData }: Props): JSX.Element {
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const manageSpacing = QueryData?.manageSpacing;
  const bgColor = QueryData?.layoutColorOption;
  const description = QueryData?.description;
  const chooseImage = QueryData?.image?.sourceUrl();
  const choosePoints = QueryData?.chooseUsPoints;

  const bgImage = ({ src, width, quality }) => {
    return `${String(chooseImage)}?q=${quality || 100}`;
  };

  const Width = QueryData?.image?.mediaDetails?.width;
  const height = QueryData?.image?.mediaDetails?.height;
  
  return (
    <>
      <section
        className={`${styles.choosesection} commonPadding ${
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
            <div className="choose-content commonPadding pb-none two-col d-flex">
                <div className={`${styles.choosecontentcol} col left-col`}>
                    {MainHeading ? (
                    <Heading level={HeadingTag} className={`${styles.chooseTitle} secondary-title`}>
                        <div dangerouslySetInnerHTML={{ __html: MainHeading ?? "" }} />
                    </Heading>
                    ) : (
                    ""
                    )}
                    {choosePoints ? (
                        <div className={`${styles.iconboxes} d-flex justify-space`}>
                            {choosePoints.map((item, index) => {
                            return (
                                <div className={styles.chooseitem} key={index}>
                                    <div className={styles.chooseIcon}>
                                        <i className={item.icon}></i>
                                    </div>
                                    <div className={styles.chooseItemContent}>
                                    <Heading
                                    level="h3"
                                    className={`commonHeading ${styles.chooseItemTitle}`}
                                    >
                                    {item.heading}
                                    </Heading>
                                    {item.content ? (
                                        <div
                                            className={`${styles.chooseItemTxt}`}
                                            dangerouslySetInnerHTML={{ __html: item.content ?? "" }}
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                            );
                            })}
                        </div>
                        ) : (
                        ""
                        )}
                </div>
                {chooseImage ? (
                <div className={`${styles.imageCol}  col right-col`}>
                    <Image
                    loader={bgImage}
                    src="loader.png"
                    alt={QueryData.image.title()}
                    layout="responsive"
                    width={Width}
                    height={height}
                    />
                </div>
                ) : (
                ""
                )}
            </div>

        </div>
          
      </section>
    </>
  );
}

export default ChooseUs;
