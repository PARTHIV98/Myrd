import Heading from "components/Heading";
import React from "react";
import styles from "scss/components/FlexibleComponentStyles/HeroBanner.module.scss";
import Image from "next/image";
import Link from "next/link";

interface Props {
  QueryData: any;
}

function HeroBanner({ QueryData }: Props): JSX.Element {
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const Description = MainHeading;
  const MainImage = QueryData?.image?.sourceUrl();
  const Buttons = QueryData?.buttons;

  const HeroBannerImg = ({ src, width, quality }) => {
    return `${String(MainImage)}?q=${quality || 100}`;
  };

  const Width = QueryData?.image?.mediaDetails?.width;
  const height = QueryData?.image?.mediaDetails?.height;

  return (
    <section className={styles.heroBanner}>
      <div className="banner-wrap">
        <div
          className={styles.bannerblock}
          style={{
            backgroundImage: `url(${MainImage})`,
          }}
        >
          <div className="container">
            <div className={styles.bannerinfo}>
              <div className={styles.bannerinfoinner}>
                {MainHeading ? (
                  <Heading level={HeadingTag} className={styles.bannertitle}>
                    <div
                      dangerouslySetInnerHTML={{ __html: Description ?? "" }}
                    />
                  </Heading>
                ) : (
                  ""
                )}
                {Buttons ? (
                  <div className={styles.buttonGroup}>
                    {Buttons.map((Button, index) => {
                      return (
                        <Link href={String(Button?.link?.url)} key={index}>
                          <a className="commonButton">{Button?.link?.title}</a>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
                {/* <div className={styles.buttonGroup}>
                  <Link href="#">
                    <a className="commonButton">View Portfolio</a>
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
