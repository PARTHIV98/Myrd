import Heading from "components/Heading";
import React from "react";
import styles from "scss/components/FlexibleComponentStyles/WeOfferSection.module.scss";
import Image from "next/image";

interface Props {
  QueryData: any;
}

function WeOfferSection({ QueryData }: Props): JSX.Element {
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const description = QueryData?.description;
  const Offers = QueryData?.offers;

  return (
    <>
      <section className="weoffersection">
        <div className="container-fluid">
          {Offers ? (
            <div className={`${styles.offerslist} d-flex justify-space row`}>
              {Offers.map((item, index) => {
                const imgs = String(item.image.sourceUrl());
                const IconList = ({ src, width, quality }) => {
                  return `${String(item.image.sourceUrl())}?q=${
                    quality || 100
                  }`;
                };

                const Width = item?.image?.mediaDetails?.width;
                const height = item?.image?.mediaDetails?.height;
                return (
                  <div className={`${styles.offerbox} col`} key={index}>
                    {Width ? (
                      <Image
                        loader={({ src }) => imgs}
                        src="loader.png"
                        alt={item.image.title()}
                        layout="responsive"
                        width={Width}
                        height={height}
                      />
                    ) : (
                      ""
                    )}
                    <div className={`${styles.offercontent}`}>
                      <>
                        <Heading level="h4" className={`${styles.h4}`}>
                          {item.heading}
                        </Heading>

                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.content ?? "",
                          }}
                        />
                      </>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
}

export default WeOfferSection;
