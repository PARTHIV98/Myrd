import Heading from "components/Heading";
import React from "react";
import styles from "scss/components/FlexibleComponentStyles/ExpertiseSection.module.scss";
import Image from "next/image";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
interface Props {
  QueryData: any;
}

import Link from "next/link";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
};
function ExpertiseSection({ QueryData }: Props): JSX.Element {
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const manageSpacing = QueryData?.manageSpacing;
  const bgColor = QueryData?.layoutColorOption;
  const description = QueryData?.description;
  const expertises = QueryData?.expertiseList;
  const showCTA = QueryData?.displayCta;
  const ctaIcon = QueryData?.ctaIcon?.sourceUrl();
  const ctaHeading = QueryData?.ctaHeading;
  const ctaDescription = QueryData?.ctaDescription;
  const ctaPhone = QueryData?.ctaPhoneNumber;
  const ctaHeadingTag = QueryData?.ctaHeadingTag;
  const ctaButton = QueryData?.ctaButton;
  const CTAImage = ({ src, width, quality }) => {
    return `${String(ctaIcon)}?q=${quality || 100}`;
  };

  const Width = QueryData?.ctaIcon?.mediaDetails?.width;
  const height = QueryData?.ctaIcon?.mediaDetails?.height;
  return (
    <>
      <section
        className={`${styles.expertisesection} expertiseSection commonPadding ${
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
          {MainHeading ? (
            <Heading level={HeadingTag} className="default-title text-left">
              <div
                dangerouslySetInnerHTML={{
                  __html: MainHeading ?? "",
                }}
              />
            </Heading>
          ) : (
            ""
          )}

          <div className={`${styles.expertiseblock} row`}>
            {expertises ? (
              <div className={`${styles.expertiselist} col`}>
                <div className="row d-flex">
                  {expertises.map((item, index) => {
                    return (
                      <div
                        className={`${styles.expertiseitem} col`}
                        key={index}
                      >
                        <div className={`${styles.expertiseitemwrap}`}>
                          <i className={item.icon}></i>
                          {item.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
            {showCTA == "Yes" ? (
              <div className={`${styles.calltoactionblock} col`}>
                <div className={`${styles.calltoaction} text-center`}>
                  {ctaIcon ? (
                  <Image
                    loader={CTAImage}
                    src="loader.png"
                    alt={QueryData.ctaIcon.title()}
                    layout="fixed"
                    width={Width}
                    height={height}
                  />):""}
                  {ctaHeading ? (
                    <Heading level={ctaHeadingTag} className={styles.h2}>
                      {ctaHeading}
                    </Heading>
                  ) : (
                    ""
                  )}
                  {ctaDescription ? (
                    <div
                      className={`${styles.introtext}`}
                      dangerouslySetInnerHTML={{
                        __html: ctaDescription ?? "",
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {ctaPhone ? (
                    <Heading level="h4" className={styles.h4}>
                      {ctaPhone}
                    </Heading>
                  ) : (
                    ""
                  )}
                  {ctaButton ? (
                    <Link href={String(ctaButton.url)}>
                      <a className="commonButton">{ctaButton.title}</a>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
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

export default ExpertiseSection;
