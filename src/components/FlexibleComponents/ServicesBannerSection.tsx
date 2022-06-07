import Heading from "components/Heading";
import React from "react";
import styles from "scss/components/FlexibleComponentStyles/ServicesBanner.module.scss";
import Image from "next/image";
import Link from "next/link";
import { client, Page as PageType } from "client";
interface Props {
  QueryData: any;
}

function ServicesBanner({ QueryData }: Props): JSX.Element {
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const Description = QueryData?.description;
  const MainImage = QueryData?.image?.sourceUrl();
  const Buttons = QueryData?.serviceBannerButton;

  const ServiceBannerImg = ({ src, width, quality }) => {
    return `${String(MainImage)}?q=${quality || 100}`;
  };
  const Width = QueryData?.image?.mediaDetails?.width;
  const height = QueryData?.image?.mediaDetails?.height;
  
  const { usePage } = client;
  const featuredImage = usePage().featuredImage?.node?.mediaItemUrl;
  const bgGrad = QueryData?.gradient;

  return (
    <section className={`${styles.servicesBanner} ${featuredImage ? "bgImage" : ""} page-${usePage().pageId}`} style={{background: `url(${featuredImage ? featuredImage : ""})`}}>
      <div
        className={`${styles.bannerWrap} ${featuredImage ? "d-flex justify-center align-center" : ""}`}
      >
        <div className="overlay_gd1" style={{"--my-grad": bgGrad ? bgGrad : "to right, #6a11cb 0%, #2575fc 100%"} as React.CSSProperties}></div>

        <div className="container">
          <div className={`${styles.bannerinfoinner} d-flex two-col align-center ${featuredImage ? "justify-center" : ""}`}>
              <div className={`left-col col ${featuredImage ? "w-100 text-center" : ""}`}>
              {MainHeading ? (
              <Heading level={HeadingTag} className={styles.bannertitle}>
                {MainHeading}
              </Heading>
            ) : (
              ""
            )}
            {Description ? (
                <div
                className={styles.serviceBannerContent}
                dangerouslySetInnerHTML={{ __html: Description ?? "" }}
                />
            ) : (
                ""
            )}
            {Buttons ? (
                  <div className={styles.buttonGroup}>
                    
                        <Link href={String(Buttons.url)}>
                          <a className="commonButton commonButtonOutlined">{Buttons.title}</a>
                        </Link>
                    
                  </div>
                ) : (
                  ""
                )}
              </div>
              {MainImage ? (
                <div className={`${styles.imageCol}  col right-col`}>
                    <Image
                    loader={ServiceBannerImg}
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
      </div>
    </section>
  );
}

export default ServicesBanner;
