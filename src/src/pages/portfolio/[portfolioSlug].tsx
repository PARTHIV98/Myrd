import { getNextStaticProps, is404 } from '@faustjs/next';
import { client, PortfolioIdType} from 'client';
import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';


export default function Page() {
 
  const router= useRouter();
  const {portfolioSlug} = router.query;
  const { usePosts, useQuery } = client;
 
  const query = useQuery();
  
  const movie = query.portfolio({
    id: String(portfolioSlug),
    idType: PortfolioIdType.SLUG,
  });


 
  const generalSettings = useQuery().generalSettings;
 
  return (
    <>
    <Header
      title={generalSettings.title}
      description={generalSettings.description}
    />

    <Head>
      <title>
        {movie?.title()} - {generalSettings.title}
      </title>
    </Head>

    <Hero title={movie?.title()} overlayColor="bg_2"/>

    <main className="content content-single">
      <h2>{movie?.title()}</h2>
    </main>

    <Footer copyrightHolder={generalSettings.title} />
  </>
  );
}