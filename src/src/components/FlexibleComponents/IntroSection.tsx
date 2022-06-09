import Heading from "components/Heading";
import React from "react";
import styles from "scss/components/FlexibleComponentStyles/IntroSection.module.scss";
import Image from "next/image";

interface Props {
  QueryData: any;
}

function IntroSection({ QueryData }: Props): JSX.Element {
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const description = QueryData?.description;

  const IntroPoints = QueryData?.introPoints;
  const IntroImage = QueryData?.image?.sourceUrl();

  const AuthorImage = ({ src, width, quality }) => {
    return `${String(IntroImage)}?q=${quality || 100}`;
  };

  const Width = QueryData?.image?.mediaDetails?.width;
  const height = QueryData?.image?.mediaDetails?.height;

  const myLoader = ({ src, width, quality }) => {
    return `${IntroImage}?w=${Width}&q=${quality || 75}`;
  };
  const IntroShowHide = QueryData?.introPointsShowHide;
  const manageSpacing = QueryData?.manageSpacing;
  const bgColor = QueryData?.layoutColorOption;

  return (
    <>
      <section
        className={` ${styles.IntroSection}  ${
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
          <div
            className={`${styles.intro_content} d-flex justify-space two-col`}
          >
            <div className={`${styles.left_col} content-col col`}>
              <div className="TextCenter">
                <Heading
                  level={HeadingTag}
                  className={`commonHeading ${styles.HeadingWithBorder}`}
                >
                  {MainHeading}
                </Heading>
              </div>

              {description ? (
                <div
                  className={`${styles.introtext}`}
                  dangerouslySetInnerHTML={{ __html: description ?? "" }}
                />
              ) : (
                ""
              )}
            </div>
            {Width ? (
              <div className={`${styles.right_col} image-col col`}>
                <Image
                  loader={AuthorImage}
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
        {IntroShowHide == "Show" ? (
          <div className="container">
            {IntroPoints ? (
              <div className={`${styles.iconboxes} d-flex justify-space row`}>
                {IntroPoints.map((item, index) => {
                  return (
                    <div className={`${styles.iconwithtext} col`} key={index}>
                      <i className={item.icon}></i>
                      {item.heading}
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </section>
    </>
  );
}

export default IntroSection;
