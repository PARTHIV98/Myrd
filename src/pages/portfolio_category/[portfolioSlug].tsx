import { getNextStaticProps, is404 } from '@faustjs/next';
import { client, PortfolioCategoryIdType} from 'client';
import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from "scss/components/FlexibleComponentStyles/PortfolioSection.module.scss";
import Link from "next/link";
import Heading from "components/Heading";


export default function Page() {
 
  const router= useRouter();
  const {portfolioSlug } = router.query;
  const { usePosts, useQuery } = client;
 
  const query = useQuery();
  // console.log(query);
  const movie = query.portfolioCategory({
    id: String(portfolioSlug),
    idType: PortfolioCategoryIdType.SLUG,
  });

  const portfolioItems = movie?.portfolio()?.nodes;

  // console.log(movie?.);
 
  const generalSettings = useQuery().generalSettings;
  const portfolioCategories = useQuery().portfolioCategories()?.nodes;
 
  return (
    <>
    <Header
      title={generalSettings.title}
      description={generalSettings.description}
    />

    <Head>
      <title>
        {movie?.name} - {generalSettings.title}
      </title>
    </Head>

    <Hero title={movie?.name} />



    <main className="content content-single">
    {portfolioCategories ? (
          
          <ul className="category-link">
            <li><Link href="/portfolio/" key="show_all"><a className={router.pathname == "/portfolio" ? "active" : ""}>Show all</a></Link></li>
            {portfolioCategories.map((link,index) => (
            <li key={index}><Link href={link.link ?? ""}><a className={portfolioSlug == link.slug ? "active" : ""}>{link?.name}</a></Link></li> ))}
          </ul>
              ) : "" }
    <section
        className={`${styles.portfoliosection} portfolioSection commonPadding`}
      >
        <div className="container">
          <div className="portfolio-block">
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
        </div></div></section>
    </main>

    <Footer copyrightHolder={generalSettings.title} />
  </>
  );
}