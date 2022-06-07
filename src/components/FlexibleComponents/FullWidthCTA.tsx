import Heading from "components/Heading";
import React from "react";
import styles from "scss/components/FlexibleComponentStyles/FullWidthCTA.module.scss";
import Image from "next/image";
import Link from "next/link";

interface Props {
  QueryData: any;
}

function FullWidthCTA({ QueryData }: Props): JSX.Element{
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const Description = MainHeading;
  const MainImage = QueryData?.image?.sourceUrl();
  const Buttons = QueryData?.buttons;


  return (
    <section className={styles.ctasection} style={{
        backgroundImage: `url(${MainImage})`,
      }}>
      

        <div className="container">
          <div className={styles.ctainfoinner}>
            {MainHeading ? (
              <Heading level={HeadingTag} className={styles.ctatitle}>
                <div dangerouslySetInnerHTML={{ __html: Description ?? "" }} />
              </Heading>
            ) : (
              ""
            )}
            {Buttons ? (
                  <div className={styles.ctabuttonGroup}>
                    {Buttons.map((Button, index) => {
                      return (
                        <Link href={String(Button?.link?.url)} key={index}>
                          <a className={`${styles.ctabutton} commonButton commonButtonOutlined ${ Button.buttonIcon ? 'commonButtonIcon' : ''}`}>{Button.buttonIcon ? (<i className={Button.buttonIcon}></i>) : ""}{Button.link.title}</a>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
          </div>
        </div>
    
    </section>
  );
}

export default FullWidthCTA;
