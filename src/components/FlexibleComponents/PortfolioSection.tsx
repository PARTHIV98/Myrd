import Heading from "components/Heading";
import React from "react";
import styles from "scss/components/FlexibleComponentStyles/PortfolioSection.module.scss";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
interface Props {
  QueryData: any;
}

import Link from "next/link";


function PortfolioSection({ QueryData }: Props): JSX.Element {
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const portfolioList = QueryData?.portfolioList;
 
  // console.log(portfolioList);
  return (
    <>
      <section
        className={`${styles.portfoliosection} portfolioSection commonPadding`}
      >
        <div className="container">
          <div className="portfolio-block">
          {MainHeading ? (
            <Heading
              level={HeadingTag}
              className={`${styles.h2} default-title text-left`}
            >
              <div dangerouslySetInnerHTML={{ __html: MainHeading ?? "" }} />
            </Heading>
          ) : (
            ""
          )}
            <div className={`${styles.portfolioList}`}>
              <div className="row d-flex">
              {portfolioList.map((item, index) => {
                // console.log(item);
                var pComponentsName = item.__typename;
                var pComponentsData = item.$on[pComponentsName];
                const pHeading = pComponentsData?.title();
                const pImage = pComponentsData?.featuredImage?.node?.sourceUrl();

                return ( <div className={`${styles.portfolioItem} col`} key={index}>
                <div
                  className={`${styles.portfolioItemWrap}`}
                  style={{
                    backgroundImage:
                      `url(${pImage})`
                  }} key={index}> 
                  <div className={`${styles.portfolioContent}`}>
                    
                    <Heading level="h4" className={`${styles.h4}`}>
                    {pHeading}
                    </Heading>
                    
                     <div className={`${styles.portfolioCategory}`}>
                    {pComponentsData?.portfolioCategories()?.nodes?.map((cat,i) => {
                      return (
                        <Link href={String(cat?.link)} key={i}>
                        <a className={`${styles.categorylink}`}>
                          {cat?.name}
                        </a>
                      </Link>
                      );
                    })
                  }
                      
                    </div> 

                    <Link href={String(pImage)}>
                      <a className={`${styles.portfolioLink}`}>
                        <i className="fas fa-long-arrow-alt-right"></i>
                      </a>
                    </Link>
                  </div>
                </div> 
              </div>);
              })} 
                         
                     
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}



export default PortfolioSection;
