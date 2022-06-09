import Heading from "components/Heading";
import React, { useState } from "react";
import styles from "scss/components/FlexibleComponentStyles/PortfolioSection.module.scss";
import Image from "next/image";
import { client, PortfolioCategoryIdType} from 'client';

interface Props {
  QueryData: any;
}

import Link from "next/link";


function RelatedProjects({ QueryData }: Props): JSX.Element {
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const manageSpacing = QueryData?.manageSpacing;
  const bgColor = QueryData?.layoutColorOption;
  const projectList = QueryData?.projects;
  const { usePosts, useQuery } = client;
 
  const query = useQuery();

  
  const pID = projectList.map((item) => {        
   return item.termTaxonomyId;
  }).join(",");

  const project = query.portfolioCategory({
    id: String(pID),
    idType: PortfolioCategoryIdType.DATABASE_ID,
  });
  const portfolioItems = project?.portfolio()?.nodes;


const [projects,setProjects] = useState({});
  
  return (
    <>
      <section
        className={`${styles.choosesection} commonPadding ${
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
          <div className="portfolio-block">
          {MainHeading ? (
            <Heading
              level={HeadingTag}
              className={`${styles.h2} default-title text-left`}
            >
              <div dangerouslySetInnerHTML={{ __html: MainHeading ?? "Related Projects" }} />
            </Heading>
          ) : (
            ""
          )}
            <div className={`${styles.portfolioList}`}>
              <div className="row d-flex">
          
              {portfolioItems.map((item, index) => {
                // console.log(item);
      
                const prtitmHeading = item?.title();
                const prtitmImage = item?.featuredImage?.node?.sourceUrl();

                return ( <div className={`${styles.portfolioItem} col`} key={index}>
                <div
                  className={`${styles.portfolioItemWrap}`}
                  style={{
                    backgroundImage:
                      `url(${prtitmImage})`
                  }} key={index}> 
                  <div className={`${styles.portfolioContent}`}>
                    
                    <Heading level="h4" className={`${styles.h4}`}>
                    {prtitmHeading}
                    </Heading>
                    
                     <div className={`${styles.portfolioCategory}`}>
                    {item?.portfolioCategories()?.nodes?.map((cat,i) => {
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

                    <Link href={String(prtitmImage)}>
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

export default RelatedProjects;
