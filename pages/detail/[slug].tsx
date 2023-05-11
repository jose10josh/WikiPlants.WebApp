import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import { Grid, Typography } from '@material-ui/core';
import Link from 'next/link';
import { Layout } from '@components/Layout';
import { RichText } from '@components/RichText';
import { AuthorCard } from '@components/AuthorCard';
import { PlantEntryInline } from '@components/PlantCollection';
import { getPlantList, getPlant, getCategoryList } from '@api';
import { useRouter } from 'next/dist/client/router';

type DetailProps = {
  plants: Plant[];
  plant: Plant;
  categories: Category[];
};

export const getStaticProps: GetStaticProps<DetailProps> = async ({
  params,
}) => {
  const slug = params?.slug;

  if (typeof slug !== 'string') {
    return {
      notFound: true,
    };
  }

  try {
    const plants = await getPlantList({ limit: 5 });
    const plant = await getPlant(slug);
    const categories = await getCategoryList({ limit: 5 });

    return {
      props: {
        plants,
        plant,
        categories,
      },
      revalidate: 5 * 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

type PathType = {
  params: {
    slug: string;
  };
};
export const getStaticPaths = async () => {
  const entries = await getPlantList({ limit: 10 });
  const paths: PathType[] = entries.map((plant) => ({
    params: {
      slug: plant.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default function PlantEntryPage({
  plants,
  plant,
  categories,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={9} component="article">
          <figure>
            <img />
          </figure>
          <div className="px-12 pt-8">
            <Typography variant="h2">{plant.plantName}</Typography>
          </div>
          <div className="p-10">
            <RichText richText={plant.description} />
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={3} component="aside">
          <section>
            <Typography variant="h5" component="h3" className="mb-4">
              Recent Posts
            </Typography>
            {plants.map((plantEntry) => (
              <article className="mb-4" key={plantEntry.id}>
                <PlantEntryInline {...plantEntry} />
              </article>
            ))}
          </section>
          <section className="mt-10">
            <Typography variant="h5" component="h3" className="mb-4">
              Categories
            </Typography>
            <ul className="list">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link passHref href={`/category/${category.slug}`}>
                    <Typography component="a" variant="h6">
                      {category.title}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Grid>
      </Grid>
      <section className="my-4 border-t-2 border-b-2 border-gray-200 pt-12 pb-7">
        <AuthorCard {...plant.author} />
      </section>
    </Layout>
  );
}
