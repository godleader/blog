import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
export default function NewsPage({ posts }) {
  return (
    <div>
      <h1>Daily News Updates</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}

// Fetch the latest news posts from the database
export async function getStaticProps() {
  const posts = await prisma.post.findMany({
    where: {
      title: {
        contains: "Daily News Update",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: {
      posts,
    },
    revalidate: 86400, // Revalidate every 24 hours
  };
}
