import Heading from "components/Heading";
import React from "react";
import styles from "scss/components/FlexibleComponentStyles/SolutionServices.module.scss";
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
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
function SolutionServices({ QueryData }: Props): JSX.Element {
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const description = QueryData?.description;
  const manageSpacing = QueryData?.manageSpacing;
  const bgColor = QueryData?.layoutColorOption;

  const services = QueryData?.services;
  return (
    <>
      <section
        className={`${
          styles.solutionservicessection
        } slidersection  commonPadding ${
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
          <div className="row d-flex">
            <div className={`col ${styles.soltuionheading}`}>
              {MainHeading ? (
                <Heading
                  level={HeadingTag}
                  className={`${styles.h2} secondary-title`}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: MainHeading ?? "",
                    }}
                  />
                </Heading>
              ) : (
                ""
              )}
              {description ? (
                <div
                  className={`${styles.fixeddesc}`}
                  dangerouslySetInnerHTML={{
                    __html: description ?? "",
                  }}
                />
              ) : (
                ""
              )}
            </div>
            {services ? (
              <div className={`${styles.solutionservice}`}>
                <Slider {...settings}>
                  {services.map((item, index) => {
                    return (
                      <div className={`${styles.servicebox}`} key={index}>
                        <i className={item.image}></i>
                        {item.heading ? (
                          <Heading level="h4" className={`${styles.h4}`}>
                            {item.heading}
                          </Heading>
                        ) : (
                          ""
                        )}
                        {item.content ? (
                          <div
                            className={`${styles.fixeddesc}`}
                            dangerouslySetInnerHTML={{
                              __html: `<p>${item.content}</p>` ?? "",
                            }}
                          />
                        ) : (
                          ""
                        )}
                        {item.link ? (
                          <Link href={String(item.link.url)}>
                            <a className={`${styles.arrowlink}`}>
                              <i className="fas fa-long-arrow-alt-right"></i>
                            </a>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </Slider>
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

export default SolutionServices;
