import { client, MenuLocationEnum } from "client";
import Heading from "components/Heading";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "scss/components/FlexibleComponentStyles/ContentWithImage.module.scss";

interface Props {
  QueryData: any;
}


function ContentWithImage({ QueryData }: Props): JSX.Element {
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const manageSpacing = QueryData?.manageSpacing;
  const bgColor = QueryData?.layoutColorOption;
  const blockContent = QueryData?.content;
  const MainImage = QueryData?.image?.sourceUrl();
  
  const ServiceBannerImg = ({ src, width, quality }) => {
    return `${String(MainImage)}?q=${quality || 100}`;
  };
  const Width = QueryData?.image?.mediaDetails?.width;
  const height = QueryData?.image?.mediaDetails?.height;

  const bg = QueryData?.backgroundOptions.backgroundType;
  const bgcolor = QueryData?.backgroundOptions.color;
  const bgGrad = QueryData?.backgroundOptions.gradient;
  const bgImage =  QueryData?.backgroundOptions.backgroundImage;
  
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
        } ${bgColor == "Dark Color" ? "bg-dark" : ""} `} style={{background: `${bg=="Image" ? `url(${bg.backgroundImage.sourceUrl()})` : bg=="Color" ? `${bgcolor}` : bg == "Gradient" ? `linear-gradient(${bgGrad})` : ""}`}}
      >
        <div className="container">
          
          <div className={`${styles.strengthBlock} pt-none`}>
            <div className="row d-flex justify-space">
              <div className={`${styles.whiteBoxMain} col ${!MainImage ? "w-100" : ""}`}>
                  <div className={styles.contentBoxWrap}>
                  {MainHeading ? (
                    <Heading level={HeadingTag} className={`${HeadingTag == "h3" ? "secondary-title" : "default-title" } text-left`}>
                    <div
                        dangerouslySetInnerHTML={{
                        __html: MainHeading ?? "",
                        }}
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
              {MainImage ? (
              <div className={`${styles.imageCol} col`}>
              <Image
                    loader={ServiceBannerImg}
                    src="loader.png"
                    alt={QueryData.image.title()}
                    layout="responsive"
                    width={Width}
                    height={height}
                    />
              </div>
              ):""}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContentWithImage;
