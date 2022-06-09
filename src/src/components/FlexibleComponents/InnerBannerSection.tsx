import Heading from "components/Heading";
import React from "react";
import styles from "scss/components/FlexibleComponentStyles/InnerBanner.module.scss";
import Image from "next/image";
import Link from "next/link";

interface Props {
  QueryData: any;
}

function InnerBanner({ QueryData }: Props): JSX.Element {
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const Description = MainHeading;
  const MainImage = QueryData?.image?.sourceUrl();
  const Buttons = QueryData?.buttons;

  const InnerBannerImg = ({ src, width, quality }) => {
    return `${String(MainImage)}?q=${quality || 100}`;
  };

  const Width = QueryData?.image?.mediaDetails?.width;
  const height = QueryData?.image?.mediaDetails?.height;
  const overlayGrad = QueryData?.overlayColor;
  return (
    <section className={styles.innerBanner}>
      <div
        className={styles.bannerWrap}
        style={{
          backgroundImage: `url(${MainImage})`,
        }}
      >
        <div className={styles.overlay} style={{"--overlay-grad": overlayGrad ? overlayGrad : "to right, #6a11cb 0%, #2575fc 100%"} as React.CSSProperties}></div>

        <div className="container">
          <div className={styles.bannerinfoinner}>
            {MainHeading ? (
              <Heading level={HeadingTag} className={styles.bannertitle}>
                <div dangerouslySetInnerHTML={{ __html: Description ?? "" }} />
              </Heading>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InnerBanner;
